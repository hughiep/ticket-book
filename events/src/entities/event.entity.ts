import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Venue } from './venue.entity';
import { Performer } from './performer.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @ManyToOne(() => Venue, (venue) => venue.events)
  @JoinColumn({ name: 'venueId' })
  venue: Venue;

  @Column()
  venueId: number;

  @Column('int', { array: true })
  performerIds: number[];

  @ManyToMany(() => Performer, (performer) => performer.events)
  performers: Performer[];
}
