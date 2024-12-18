---
Description: Ticket booking system HLD (ticketmaster.com, bookmyshow.com, ticketbox, etc.)
Created: 2024-12-18 16:14
Last updated: 2024-12-18 16:14
---

# High Level Design

## User should be able to search view events

When user navigate to /events/{eventId}, the system should return the event details. This should include a seat map, available tickets, and other event details.

Components

- Client: The client is the user interface that sends a request to the server.
- Server: The server is the backend that processes the request and returns the event details.
- Database: The database stores the event details.
