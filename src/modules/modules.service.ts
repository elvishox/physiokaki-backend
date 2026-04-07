import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyModule } from './entities/module.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(StudyModule)
    private moduleRepository: Repository<StudyModule>,
  ) {}

  async findAll() {
    return this.moduleRepository.find();
  }
}