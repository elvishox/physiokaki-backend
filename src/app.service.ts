import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '¡Backend de Physiokaki conectado con éxito! 🚀';
  }
}