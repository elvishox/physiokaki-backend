import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // FORZAR CORS MANUALMENTE - Middleware global
  app.use((req, res, next) => {
    // Headers CORS para TODAS las respuestas
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Manejar preflight OPTIONS
    if (req.method === 'OPTIONS') {
      return res.status(200).send();
    }
    next();
  });
  
  await app.listen(process.env.PORT ?? 10000);
  console.log(`🚀 Backend CORS manual activado en puerto ${process.env.PORT ?? 10000}`);
}
bootstrap();