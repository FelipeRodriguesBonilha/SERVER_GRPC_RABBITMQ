import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  controllers: [TicketController],
  providers: [TicketService],
  imports: [UserModule]
})
export class TicketModule {}
