import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dtos/booking.dto';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('/tickets')
  getTickets() {
    return this.bookingService.getTickets();
  }

  @Post('/create')
  reserveTicket(@Body() ticketOrder: CreateBookingDto) {
    console.log({ ticketOrder });
    return this.bookingService.createBooking(ticketOrder);
  }

  @Post('/confirm')
  confirmTicket(): string {
    return this.bookingService.confirmBooking();
  }
}
