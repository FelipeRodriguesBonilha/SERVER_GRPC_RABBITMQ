// src/ticket/ticket.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { ReturnUser } from 'src/user/__dtos__/return-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TicketService implements OnModuleInit {
  private channel: amqp.Channel;
  private readonly QUEUE = 'users_queue';

  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    const conn = await amqp.connect(process.env.RABBIT_URI);

    this.channel = await conn.createChannel();
    
    await this.channel.assertQueue(this.QUEUE, { durable: true });
  }

  async placeUserInQueue(userId: string) {
    const payload = Buffer.from(JSON.stringify({ userId }));

    this.channel.sendToQueue(this.QUEUE, payload, { persistent: true });

    return { message: `Usuário ${userId} adicionado à fila de ingressos!` };
  }

  async getUsersInQueue() {
    const collectedUsers: ReturnUser[] = [];

    let message: amqp.ConsumeMessage | false;

    while ((message = await this.channel.get(this.QUEUE, { noAck: false }))) {
      const { userId } = JSON.parse(message.content.toString());

      const user = this.userService.findOne(userId);

      collectedUsers.push(user);

      this.channel.ack(message);
    }

    return collectedUsers;
  }
}
