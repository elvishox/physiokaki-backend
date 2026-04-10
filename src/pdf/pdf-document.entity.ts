import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Flashcard } from '../flashcards/entities/flashcard.entity';

@Entity()
export class PDFDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  fileUrl: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  // 🔥 ESTA ES LA CLAVE (faltaba)
  @OneToMany(() => Flashcard, (f) => f.sourcePdf)
  flashcards: Flashcard[];
}