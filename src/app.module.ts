import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true, // solo en desarrollo
      ssl: { rejectUnauthorized: false }, // necesario para Render
    }),
  ],
})
export class AppModule {}