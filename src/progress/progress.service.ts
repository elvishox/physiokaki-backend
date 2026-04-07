import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProgress } from './entities/user-progress.entity';
import { Flashcard } from '../flashcards/entities/flashcard.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(UserProgress)
    private progressRepository: Repository<UserProgress>,
    @InjectRepository(Flashcard)
    private flashcardRepository: Repository<Flashcard>,
  ) {}

  async recordAnswer(userId: number, flashcardId: number, correct: boolean) {
    let progress = await this.progressRepository.findOne({
      where: { userId, flashcardId },
    });

    if (!progress) {
      progress = this.progressRepository.create({ userId, flashcardId });
    }

    if (correct) {
      progress.correctCount++;
    } else {
      progress.incorrectCount++;
    }
    progress.lastReviewed = new Date();

    return this.progressRepository.save(progress);
  }

  async getDueFlashcards(userId: number) {
    // Obtener flashcards que necesitan repaso (prioriza las que tienen más fallos)
    const allFlashcards = await this.flashcardRepository.find();
    const progress = await this.progressRepository.find({ where: { userId } });
    
    // Calcular prioridad: más fallos = más prioridad
    const flashcardsWithPriority = allFlashcards.map(flashcard => {
      const cardProgress = progress.find(p => p.flashcardId === flashcard.id);
      const priority = cardProgress ? cardProgress.incorrectCount - cardProgress.correctCount : 5;
      return { ...flashcard, priority };
    });

    return flashcardsWithPriority.sort((a, b) => b.priority - a.priority);
  }
}