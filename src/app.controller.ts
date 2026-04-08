import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'PhysioKaki API - Funcionando correctamente';
  }

  @Get('health')
  healthCheck(): string {
    return 'OK';
  }
}