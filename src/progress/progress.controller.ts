import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('progress')
@UseGuards(AuthGuard('jwt'))
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Post('answer')
  async recordAnswer(@Request() req, @Body() body: { flashcardId: number; correct: boolean }) {
    return this.progressService.recordAnswer(req.user.userId, body.flashcardId, body.correct);
  }

  @Get('due')
  async getDueFlashcards(@Request() req) {
    return this.progressService.getDueFlashcards(req.user.userId);
  }
}