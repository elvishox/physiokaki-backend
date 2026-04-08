import { NestFactory } from '@nestjs/core';
import { Controller, Post, Body, Get, Module } from '@nestjs/common';

// Controlador de Auth
@Controller('auth')
export class AuthController {
  @Post('register')
  register(@Body() body: any) {
    console.log('Registro recibido:', body);
    return {
      success: true,
      message: 'Usuario registrado correctamente',
      user: {
        id: Date.now(),
        email: body.email,
        name: body.name || 'Usuario'
      }
    };
  }

  @Post('login')
  login(@Body() body: any) {
    return {
      success: true,
      message: 'Login exitoso',
      token: 'fake-jwt-token-' + Date.now(),
      user: {
        email: body.email
      }
    };
  }
}

// Controlador de prueba
@Controller()
export class AppController {
  @Get()
  root() {
    return { status: 'ok', message: 'Physiokaki API funcionando' };
  }
}

// Módulo principal
@Module({
  controllers: [AuthController, AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS manual
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.status(200).send();
    }
    next();
  });
  
  await app.listen(process.env.PORT ?? 10000);
  console.log(`✅ Backend funcionando en puerto ${process.env.PORT ?? 10000}`);
  console.log(`📝 Ruta de registro: POST /auth/register`);
}
bootstrap();