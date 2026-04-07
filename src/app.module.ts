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
    TypeOrmModule.forRoot(
      process.env.DATABASE_URL
        ? {
            // Configuración para PRODUCCIÓN (Render + Postgres)
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [User, Flashcard, StudyModule, UserProgress],
            synchronize: true, // Se recomienda false en producción real, pero déjalo true para que cree las tablas ahora
            ssl: { rejectUnauthorized: false },
          }
        : {
            // Configuración para LOCAL (Tu PC + SQLite)
            type: 'sqlite',
            database: 'database.sqlite',
            entities: [User, Flashcard, StudyModule, UserProgress],
            synchronize: true,
          },
    ),
    AuthModule,
    FlashcardsModule,
    ModulesModule,
    ProgressModule,
    UsersModule,
  ],
})
export class AppModule {}