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
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Flashcard, StudyModule, UserProgress],
      synchronize: true, // Solo para desarrollo
    }),
    AuthModule,
    FlashcardsModule,
    ModulesModule,
    ProgressModule,
    UsersModule,
  ],
})
export class AppModule {}