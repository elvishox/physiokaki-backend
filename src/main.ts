import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Forzar CORS manual total
  const server = app.getHttpAdapter().getInstance();
  server.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite TODO
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    
    // 2. Responder OK inmediatamente a la petición de control (Pre-flight)
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // 3. El puerto de Render
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();