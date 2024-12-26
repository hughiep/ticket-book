import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Event } from 'src/entities/event.entity';

@Injectable()
export class EventSearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  // async indexEvent(event: Event) {
  //   return this.elasticsearchService.index({
  //     index: 'events',
  //     document: {
  //       id: event.id,
  //       name: event.name,
  //       description: event.description,
  //       date: event.date,
  //       venue: event.venue,
  //     },
  //   });
  // }

  async search(text: string) {
    const { hits } = await this.elasticsearchService.search({
      index: 'events',
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['name^3', 'description', 'venue'],
            fuzziness: 'AUTO',
          },
        },
      },
    });
    return hits.hits.map((hit) => hit._source);
  }
}
