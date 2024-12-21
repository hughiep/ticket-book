// Booking Entity

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Ticket } from './ticket.entity';

export enum BookingStatus {
  RESERVED = 'reserved',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({
    type: 'int',
    array: true,
    default: [],
  })
  ticketIds: number[];

  @Column({
    type: 'enum',
    enum: ['reserved', 'confirmed', 'cancelled'],
    default: 'reserved',
  })
  status: BookingStatus;

  @OneToMany(() => Ticket, (ticket) => ticket.booking)
  tickets: Ticket[];
}
