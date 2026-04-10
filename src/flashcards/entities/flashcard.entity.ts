import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { StudyModule } from '../../modules/entities/module.entity';
import { PDFDocument } from '../../pdf/pdf-document.entity';
import { UserCardProgress } from '../../progress/user-card-progress.entity';

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PDFDocument, (pdf) => pdf.flashcards, { onDelete: 'CASCADE' })
  sourcePdf: PDFDocument;

  @Column()
  question: string;

  @Column('text')
  answer: string;

  @Column()
  moduleId: number;

  @ManyToOne(() => StudyModule)
  module: StudyModule;

  @OneToMany(() => UserCardProgress, (p) => p.flashcard)
  progress: UserCardProgress[];
}
