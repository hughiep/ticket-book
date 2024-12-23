import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateBookingDto } from './dtos/booking.dto';
import { Ticket, TicketStatus } from './entities/ticket.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async getTickets(): Promise<Ticket[]> {
    return await this.ticketRepository.find();
  }

  async createBooking(ticketOrder: CreateBookingDto): Promise<Booking> {
    return await this.bookingRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // Create a new booking
        const booking = new Booking();
        booking.userId = ticketOrder.userId;
        booking.ticketIds = ticketOrder.ticketIds;
        booking.status = BookingStatus.RESERVED;

        const savedBooking = await transactionalEntityManager.save(booking);

        // Update ticket status
        for (const ticketId of ticketOrder.ticketIds) {
          await transactionalEntityManager.update(Ticket, ticketId, {
            status: TicketStatus.BOOKED,
          });
        }

        return savedBooking;
      },
    );
  }

  confirmBooking(): string {
    return 'Ticket confirmed';
  }
}
