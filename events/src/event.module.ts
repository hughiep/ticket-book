import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { EventController } from './event.controller';
import { EventService } from './event.service';
import { DbModule } from './db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventSearchService } from './modules/search.service';

@Module({
  imports: [
    DbModule,
    TypeOrmModule.forFeature([Event]),
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
    }),
  ],
  controllers: [EventController],
  providers: [EventService, EventSearchService],
})
export class EventModule {}
