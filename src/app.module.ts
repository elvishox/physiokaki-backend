import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';  // ← IMPORTANTE

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // ... config DB
    }),
    AuthModule,  // ← AQUÍ DEBE ESTAR
  ],
})
export class AppModule {}