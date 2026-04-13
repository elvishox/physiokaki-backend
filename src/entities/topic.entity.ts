import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { StudyModule } from './study-module.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => StudyModule, (module) => module.topics)
  module: StudyModule;
}