import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { ModulesModule } from './modules/modules.module';
import { ProgressModule } from './progress/progress.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Flashcard } from './flashcards/entities/flashcard.entity';
import { StudyModule } from './modules/entities/module.entity';
import { UserProgress } from './progress/entities/user-progress.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Si existe DATABASE_URL (en Render), usa Postgres. Si no, usa SQLite.
      type: process.env.DATABASE_URL ? 'postgres' : 'sqlite',
      url: process.env.DATABASE_URL, 
      database: process.env.DATABASE_URL ? undefined : 'database.sqlite',
      entities: [User, Flashcard, StudyModule, UserProgress],
      synchronize: true, // Esto creará las tablas automáticamente en tu nueva DB de Render
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // Necesario para Render
    }),
    AuthModule,
    FlashcardsModule,
    ModulesModule,
    ProgressModule,
    UsersModule,
  ],
})
export class AppModule {}