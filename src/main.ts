import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors'; // Import CORS middleware
import { IoAdapter } from '@nestjs/platform-socket.io';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //Enable CORS for WebSocket connections
  app.use(cors());

  //Use WebSocket adapter
  app.useWebSocketAdapter(new IoAdapter(app));


  await app.listen(3000);
}
bootstrap();
