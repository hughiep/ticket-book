// TypeORM Ticket Entity

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Booking } from './booking.entity';

export enum TicketStatus {
  AVAILABLE = 'available',
  BOOKED = 'booked',
  CANCELLED = 'cancelled',
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventId: string;

  @Column()
  seat: string;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: ['available', 'booked', 'confirmed'],
    default: 'available',
  })
  status: TicketStatus;

  @ManyToOne(() => Booking, (booking) => booking.tickets)
  booking: Booking;
}
