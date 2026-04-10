import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Flashcard } from '../flashcards/entities/flashcard.entity';

const reviewDateType = process.env.DATABASE_URL ? 'timestamp' : 'datetime';

@Entity()
@Index(['user', 'flashcard'], { unique: true })
export class UserCardProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (u) => u.progress, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Flashcard, (f) => f.progress, { onDelete: 'CASCADE' })
  flashcard: Flashcard;

  @Column({ type: 'float', default: 2.5 })
  easeFactor: number;

  @Column({ default: 0 })
  interval: number;

  @Column({ default: 0 })
  repetitions: number;

  @Column({ type: 'float', default: 0 })
  memoryScore: number;

  @Column({ type: reviewDateType, nullable: true })
  lastReviewedAt: Date;

  @Column({ type: reviewDateType, nullable: true })
  nextReviewAt: Date;
  
  @Column({ default: 0 })
  totalReviews: number;

  @Column({ default: 0 })
  correctReviews: number;
}
