import { Controller, Get, UseGuards } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('modules')
@UseGuards(AuthGuard('jwt'))
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  @Get()
  async findAll() {
    return this.modulesService.findAll();
  }
}