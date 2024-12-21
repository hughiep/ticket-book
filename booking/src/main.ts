import { NestFactory } from '@nestjs/core';
import { BookingModule } from './booking.module';

async function bootstrap() {
  const app = await NestFactory.create(BookingModule);

  console.log('Booking service is running on port:', process.env.PORT);
  await app.listen(process.env.PORT);
}

bootstrap();
