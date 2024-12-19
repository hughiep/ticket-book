---
Description: Ticket booking system HLD (ticketmaster.com, bookmyshow.com, ticketbox, etc.)
Created: 2024-12-18 16:14
Last updated: 2024-12-18 16:14
---

# High Level Design

## User should be able to view events

When user navigate to /events/{eventId}, the system should return the event details. This should include a seat map, available tickets, and other event details.

Components

- Client: The client is the user interface that sends a request to the server.
- Server: The server is the backend that processes the request and returns the event details.
- Database: The database stores the event details.

## User should be able to search for events

Components

- Search Service: The search service is responsible for searching events based on user input.

User requests events by sending a request to the search service. The search service queries the database and returns the search results.

## User should be able to book tickets

Components

- Booking Service: The booking service is responsible for booking tickets for the user.
- Payment Service: The payment service is responsible for processing the payment.
- Ticket & Booking tables persited in DB: The ticket and booking tables store the ticket and booking details.

Using a database that supports ACID transactions, the booking service creates a booking record and updates the ticket availability. This also ensures that only one user can book a ticket at a time. We'll go with a relational database like PostgreSQL.

*There will be a API Gateway that will route the requests to the appropriate service.*
*Load balancer will distribute the incoming requests to the appropriate server.*
