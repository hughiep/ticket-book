# Terms

## Concurrency in Database

Concurrency in databases refers to the ability of multiple transactions to access and modify the same data at the same time. Concurrency control mechanisms are used to ensure that transactions are processed correctly and that data integrity is maintained.

## Locking

[Locking](https://hackernoon.com/comparing-optimistic-and-pessimistic-locking-with-go-and-postgresql)

### Optimistic Locking

### Pessimistic Locking

Pessimistic locking prevents simultaneous updates to the same record by locking the record for the duration of the transaction. This ensures that only one transaction can update the record at a time.

## Deadlock

A deadlock is a situation where two or more transactions are waiting for each other to release locks. This can happen when two transactions lock resources in a different order.

## Indexes

Indexes are used to speed up queries by allowing the database to quickly locate rows in a table. Indexes are created on one or more columns in a table and are used to speed up queries that filter, sort, or group by the indexed columns.

## SQL Optimization

SQL optimization is the process of improving the performance of SQL queries by optimizing the query execution plan. This can involve creating indexes, rewriting queries, or using query hints to improve performance.
PostgreSQL provides a number of tools for optimizing SQL queries, including the EXPLAIN command, which shows the query execution plan, and the ANALYZE command, which collects statistics about the data in the database.

## ACID

ACID is a set of properties that guarantee that database transactions are processed reliably. ACID stands for Atomicity, Consistency, Isolation, and Durability.

## Cron Job

A cron job is a scheduled task that runs at a specific time or interval. Cron jobs are used to automate repetitive tasks, such as database backups, log rotation, and data synchronization.

## Distributed Lock

Distributed locks are used to synchronize access to a shared resource across multiple processes and/or machines. Distributed locks are used to prevent multiple processes from modifying the same resource at the same time.

## Distributed Cache

Distributed cache is a cache that is distributed across multiple nodes in a cluster. Distributed cache is used to store frequently accessed data in memory to improve the performance of the system.

- Save aggregated data
- Reduce load on the database
- Speed up expensive queries

## Load balancer

A load balancer is a device or software that distributes incoming network traffic across multiple servers. Algorithms used by load balancers include round-robin, least connections, and IP hash.
