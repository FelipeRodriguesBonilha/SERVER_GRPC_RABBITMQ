import { Controller, Get, Param, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post(':id')
  async place(@Param('id') id: string) {
    return this.ticketService.placeUserInQueue(id);
  }

  @Get()
  async fetchAll() {
    return this.ticketService.getUsersInQueue();
  }
}
