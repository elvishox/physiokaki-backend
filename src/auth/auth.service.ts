import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    // 1. Verificamos si el usuario ya existe
    const existingUser = await this.userRepository.findOne({ where: { email } });
    
    if (existingUser) {
      // Usamos ConflictException (409) que es el estándar para duplicados
      throw new ConflictException('Este e-mail já está registado');
    }

    // 2. Si no existe, encriptamos y guardamos
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    
    await this.userRepository.save(user);
    
    // 3. Generamos el token de acceso
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    
    return { 
      token, 
      user: { id: user.id, email: user.email } 
    };
  }

  async login(email: string, password: string) {
    // 1. Buscamos el usuario
    const user = await this.userRepository.findOne({ where: { email } });
    
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    
    // 2. Comparamos la contraseña encriptada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    
    // 3. Generamos token
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    
    return { 
      token, 
      user: { id: user.id, email: user.email } 
    };
  }
}