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
