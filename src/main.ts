import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // habilitar pipe de manera global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Quita/Ignora las propiedades que no estén definidas en el dto
      forbidNonWhitelisted: true, // Le indica a la API que hubo un error por whitelist
    }),
  );
  await app.listen(3000);
}
bootstrap();
