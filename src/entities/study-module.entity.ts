import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Topic } from './topic.entity';

@Entity()
export class StudyModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })  // ← AÑADE ESTA LÍNEA
  content: string;  // ← AÑADE ESTA LÍNEA

  @OneToMany(() => Topic, (topic) => topic.module)
  topics: Topic[];
}