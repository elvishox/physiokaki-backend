import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudyModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  content: string;
}