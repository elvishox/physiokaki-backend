import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller'; // 👈 1. IMPORTAR EL CONTROLADOR
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
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [User, Flashcard, StudyModule, UserProgress],
            synchronize: true,
            ssl: { rejectUnauthorized: false },
          }
        : {
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
  controllers: [AppController], // 👈 2. REGISTRAR EL CONTROLADOR AQUÍ
  providers: [],                // 👈 3. (OPCIONAL) PUEDES DEJARLO ASÍ O AGREGAR APPSERVICE
})
export class AppModule {}