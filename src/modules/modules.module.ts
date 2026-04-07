import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { StudyModule } from './entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudyModule])],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}