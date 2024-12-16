---
Description: Ticket booking system requirements (ticketmaster.com, bookmyshow.com, ticketbox, etc.)
Created: 2024-12-16 14:20
Last updated: 2024-12-16 14:20
---

# Requirements

## Functional Requirements

1. Users should be able to search for events.
2. Users should be able to view event.
3. Users should be able to book tickets.

The scale of system is:
100M daily active users, 100K events

## Non-functional Requirements

1. The system should be highly consistent. No double booking.
2. The system should be highly available for searching events and viewing events.
3. The system should be highly scalable for booking popular events tickets. (1M at a time)
4. Low latency for searching events and viewing events.
