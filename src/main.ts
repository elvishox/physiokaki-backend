import { NestFactory } from '@nestjs/core';
import { Controller, Post, Body, Get, Module } from '@nestjs/common';

@Controller('auth')
class AuthController {
  @Post('register')
  register(@Body() body: any) {
    console.log('📝 Registro:', body.email);
    return {
      success: true,
      message: 'Usuario registrado',
      user: { id: Date.now(), email: body.email, name: body.name }
    };
  }
}

@Controller()
class RootController {
  @Get()
  root() {
    return { status: 'ok', message: 'Physiokaki API' };
  }
}

@Module({
  controllers: [AuthController, RootController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS para todos
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).send();
    next();
  });
  
  await app.listen(process.env.PORT ?? 10000);
  console.log('✅ Backend listo en puerto', process.env.PORT ?? 10000);
}
bootstrap();