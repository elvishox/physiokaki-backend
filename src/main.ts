import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Permitir CORS para el frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'https://physiokaki-frontend.vercel.app'],
    credentials: true,
  });
  
  await app.listen(process.env.PORT || 3001);
  console.log(`Backend corriendo en puerto ${process.env.PORT || 3001}`);
}
bootstrap();