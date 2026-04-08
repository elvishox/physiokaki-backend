import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // RUTA DE PRUEBA (funciona siempre)
  app.getHttpAdapter().get('/test', (req, res) => {
    res.json({ 
      message: 'Backend funcionando correctamente', 
      timestamp: new Date(),
      status: 'ok'
    });
  });
  
  // Configurar CORS
  app.enableCors({ 
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT ?? 3000}`);
  console.log(`✅ Ruta de prueba: /test`);
}
bootstrap();