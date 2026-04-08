import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() body: any) {
    return {
      success: true,
      message: 'Usuario registrado correctamente',
      user: {
        id: Date.now(),
        email: body.email,
        name: body.name
      }
    };
  }
}