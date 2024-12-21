import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { DbModule } from './db/db.module';
import { Ticket } from './entities/ticket.entity';
import { Booking } from './entities/booking.entity';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config], // split your configuration files into separate files
    }),
    DbModule,
    TypeOrmModule.forFeature([Ticket, Booking]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
