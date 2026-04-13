import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // 🛡️ Configuración mejorada para Producción
  app.enableCors({
    origin: '*', // En producción podrías poner ['https://tu-app.vercel.app']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Render asigna dinámicamente el PORT, así que process.env.PORT es vital
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0'); // Agregar '0.0.0.0' ayuda a Render a exponer el servicio
  console.log(`Servidor activo en puerto: ${port}`);
}
bootstrap();
