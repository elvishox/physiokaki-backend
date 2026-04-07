import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('flashcards')
@UseGuards(AuthGuard('jwt'))
export class FlashcardsController {
  constructor(private flashcardsService: FlashcardsService) {}

  @Get()
  async findAll() {
    return this.flashcardsService.findAll();
  }

  @Post()
  async create(@Body() body: { question: string; answer: string; moduleId: number }) {
    return this.flashcardsService.create(body.question, body.answer, body.moduleId);
  }
}