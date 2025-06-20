import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5000',
      package: 'user',
      protoPath: join(__dirname, 'user/__protos__/user.proto'),
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:6000',
      package: 'ticket',
      protoPath: join(__dirname, 'ticket/__protos__/ticket.proto'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();