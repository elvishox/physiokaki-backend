import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flashcard } from './entities/flashcard.entity';

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectRepository(Flashcard)
    private flashcardRepository: Repository<Flashcard>,
  ) {}

  async findAll() {
    return this.flashcardRepository.find();
  }

  async create(question: string, answer: string, moduleId: number) {
    const flashcard = this.flashcardRepository.create({ question, answer, moduleId });
    return this.flashcardRepository.save(flashcard);
  }
}