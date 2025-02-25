import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true, // ✅ Necesario si usas cookies
    methods: 'GET,POST', // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization', // Headers permitidos
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
