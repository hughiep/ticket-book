---
Description: Ticket booking system HLD (ticketmaster.com, bookmyshow.com, ticketbox, etc.)
Created: 2024-12-19 14:02
Last updated: 2024-12-19 14:02
---

# Deep Dive

## Improve the booking experience

There is a problem where users have already filled out the booking form and are ready to pay, but the tickets are no longer available. This is a common problem in ticket booking systems, especially when multiple users are trying to book the same ticket at the same time. We need to improve the booking experience by ensuring that the tickets are available when the user is ready to pay.

### Architecture solution

We can use a **reservation system** to reserve the tickets for a user when they start the booking process. This will prevent other users from booking the same tickets while the user is filling out the booking form. The reservation system will hold the tickets for a certain amount of time (e.g., 15 minutes) to give the user enough time to complete the booking process.

- Ticket is locked when user starts the booking process.
- Ticket is released if user doesn't complete the booking within a certain amount of time.
- Ticket is booked when user completes the booking process.

### Components solution

#### Pessemistic locking

We can use **pessemistic locking** to lock the ticket when the user starts the booking process. This will prevent other users from booking the same ticket while the user is filling out the booking form. We can use a database that supports pessemistic locking, such as PostgreSQL.

Disadvantages of pessemistic locking:

- Performance overhead: Pessemistic locking can cause performance overhead because it locks the ticket for the entire duration of the booking process. Long booking processes can lead to contention and slow down the system.
- Deadlocks: Pessemistic locking can lead to deadlocks if multiple users try to book the same ticket at the same time.
- Handle timeouts: We need to handle timeouts to release the ticket if the user doesn't complete the booking within a certain amount of time. This can be complex to implement and maintain and risks leaving the ticket locked indefinitely.
- Handling edge cases such as network failures, server crashes, etc. can be complex as these could leave locks in an inconsistent state.

> Database locking should be used for **short-duration** operations to avoid contention and deadlocks.

#### Ticket status & expiration

We can use a **ticket status** and **expiration** mechanism to reserve the tickets for a user when they start the booking process. This will prevent other users from booking the same tickets while the user is filling out the booking form. The ticket status can be set to `RESERVED` when the user starts the booking process and the ticket will expire if the user doesn't complete the booking within a certain amount of time.

Cron job can be used to release the expired tickets and set the ticket status back to `AVAILABLE`.

Disadvantages of ticket status & expiration:

- Delayed availability: The ticket will not be available to other users until the reservation expires. This can lead to a poor user experience if the user doesn't complete the booking within a certain amount
- Reliability: Cron jobs can fail or be delayed, leading to tickets being locked indefinitely. We need to handle edge cases such as network failures, server crashes, etc. to ensure that the tickets are released in a timely manner.

#### Implicit Status with Ticket Status & expiration

We can use an **implicit status** and **expiration** mechanism to reserve the tickets for a user when they start the booking process. This will prevent other users from booking the same tickets while the user is filling out the booking form. The ticket status can be set to `RESERVED` when the user starts the booking process and the ticket will expire if the user doesn't complete the booking within a certain amount of time.

Challenge:

- Read operation to check the status of the ticket and expiration time, which be slightly slower, although it can be improved by using indexes.
- Database is less legible since some reservations are acutally expired.

#### Distributed locks

We can use **distributed locks** to synchronize access to the ticket across multiple processes and/or machines. This will prevent other users from booking the same ticket while the user is filling out the booking form. Distributed locks can be implemented using a distributed lock manager like ZooKeeper or etcd.

When a user starts the booking process, they acquire a lock on the ticket. If the user doesn't complete the booking within a certain amount of time, the lock is released and the ticket is made available to other users.

Set TTL (Time to Live) for the lock to release the lock automatically if the user doesn't complete the booking within a certain amount of time.

Challenges:

- Handling failures: Distributed locks can be complex to implement and maintain, especially in a distributed system. We need to handle edge cases such as network failures, server crashes, etc. to ensure that the locks are released in a timely manner.

## Support handling of large number of concurrent users (10M for popular events)

### Caching

Cache the data with high read load, such as event details, seat maps, and low update frequency. This will reduce the load on the database and improve the performance of the system.

Challenges:

- Cache invalidation: We need to handle cache invalidation to ensure that the data is up-to-date. We can use a cache eviction policy like LRU (Least Recently Used) to remove stale data from the cache.
- Cache consistency: We need to ensure that the data in the cache is consistent with the data in the database. We can use a cache update policy like write-through or write-behind to keep the data in the cache up-to-date.

### Load balancing

Use a load balancer to distribute the incoming requests to the appropriate server. This will ensure that the system can handle a large number of concurrent users and provide high availability and scalability.

### Scaling

Scale the system horizontally by adding more servers to handle the load. This will ensure that the system can handle a large number of concurrent users and provide high availability and scalability.

Challenges:

- Managing large number of servers: We need to manage a large number of servers to handle the load. We can use a container orchestration tool like Kubernetes to automate the deployment, scaling, and management of the servers.

## Ensure user experience during peak traffic (10x increase in traffic)

### SSE

Use Server-Sent Events (SSE) to push real-time updates to the client. This will ensure that the user has a seamless experience during peak traffic and can see the latest updates without refreshing the page.

Challenges:

- Connection handling: We need to handle a large number of connections to the server. We can use a connection pool to manage the connections and ensure that the server can handle the load.
- For large events, seat maps can be filled so quickly that the user may only see the event as sold out. We can use a queue to manage the updates and ensure that the user can see the latest updates in real-time.

### Virtual waiting room

Use a virtual waiting room to manage the user traffic during peak traffic. This will ensure that the user has a seamless experience and can book the tickets without any issues.

Components:

- Queue: The queue manages the user traffic and ensures that the users are served in a fair manner.
- Websocket: The websocket is used to push real-time updates to the client and notify the user when it's their turn to book the tickets.

