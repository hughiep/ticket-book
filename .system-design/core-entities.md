---
Description: Ticket booking system core entities (ticketmaster.com, bookmyshow.com, ticketbox, etc.)
Created: 2024-12-18 10:09
Last updated: 2024-12-18 10:09
---

# Core Entities

## User

A user can search for events, view event details, and book tickets.

## Event

An event has a name, description, date, time, venue, and tickets.

## Venue

A venue has a name, address and a specific seat map, providing information about the seating arrangement.

## Performer

A performer has a name, description, and a list of events they are performing in.

## Ticket

A ticket has a unique identifier, price, and status (e.g., booked, available).

## Booking

Records the detail of a user'ticket booking, including the user, event, tickets, price, booking status and payment details.
