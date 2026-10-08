import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs.js';

async function bootstrap() {

  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  await app.listen(envs.port);

  logger.log(`App running on port ${envs.port}`);
}
await bootstrap();
