---
Description: Ticket booking system API (ticketmaster.com, bookmyshow.com, ticketbox, etc.)
Created: 2024-12-18 10:09
Last updated: 2024-12-18 10:09
---

# API

## View the event

```http
GET /events/{eventId}
```

## Search for events

```http
GET /events?q={query}&start_date={start_date}&end_date={end_date}&page={page}&limit={limit}
```

## Book tickets

```http
POST /bookings/:eventId
```

### Request body

```json
{
  "ticketIds": ["ticketId1", "ticketId2"],
}
```

## Payment

```http
POST /payments
```

### Payment request body

```json
{
  "bookingId": "bookingId",
  "paymentMethod": "credit_card",
  "paymentDetails": "paymentDetails",
}
```
