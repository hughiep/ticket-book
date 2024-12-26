import { Controller, Get, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { EventSearchService } from './modules/search.service';

@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly eventSearchService: EventSearchService,
  ) {}

  @Get('search')
  async searchEvents(@Query('query') query: string) {
    return this.eventSearchService.search(query);
  }

  @Get(':id')
  getEvent(id: number) {
    return this.eventService.getEventById(id);
  }
}
