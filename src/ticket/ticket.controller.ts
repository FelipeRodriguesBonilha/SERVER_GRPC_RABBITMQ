// src/ticket/ticket.controller.ts
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TicketService } from './ticket.service';
import { ReturnUser } from 'src/user/__dtos__/return-user.dto';

@Controller()
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    @GrpcMethod('TicketService', 'PlaceUserInQueue')
    async placeUserInQueue(data: { id: string }): Promise<{ message: string }> {
        return this.ticketService.placeUserInQueue(data.id);
    }

    @GrpcMethod('TicketService', 'GetUsersInQueue')
    async getUsersInQueue(): Promise<{ users: ReturnUser[] }> {
        const users = await this.ticketService.getUsersInQueue();
        return { users };
    }
}