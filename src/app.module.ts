import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
// ... otros imports

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',  // ← IMPORTANTE: especificar 'postgres'
      url: process.env.DATABASE_URL,
      synchronize: true,  // solo para desarrollo
      ssl: {
        rejectUnauthorized: false,  // necesario para Render
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AuthModule,
    // ... otros módulos
  ],
})
export class AppModule {}