import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración CORS que SÍ funciona
  app.enableCors({
    origin: [
      'https://physiokaki-frontend.vercel.app',
      'https://physiokaki-frontend-98iwzw0z4-elvishoxs-projects.vercel.app',
      /\.vercel\.app$/,  // acepta cualquier subdominio de vercel.app
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization'],
  });
  
  // Manejo explícito de OPTIONS (preflight)
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Credentials', 'true');
      return res.status(200).send();
    }
    next();
  });
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Servidor CORS configurado en puerto ${process.env.PORT ?? 3000}`);
}
bootstrap();