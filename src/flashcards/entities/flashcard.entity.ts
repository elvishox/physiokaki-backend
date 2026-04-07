import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { StudyModule } from '../../modules/entities/module.entity';

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column('text')
  answer: string;

  @Column()
  moduleId: number;

  @ManyToOne(() => StudyModule)
  module: StudyModule;
}