import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { UserProgress } from './entities/user-progress.entity';
import { Flashcard } from '../flashcards/entities/flashcard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProgress, Flashcard])],
  providers: [ProgressService],
  controllers: [ProgressController],
})
export class ProgressModule {}