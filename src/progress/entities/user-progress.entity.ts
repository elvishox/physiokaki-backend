import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Flashcard } from '../../flashcards/entities/flashcard.entity';

const reviewColumnType = process.env.DATABASE_URL ? 'timestamp' : 'datetime';

@Entity()
export class UserProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  flashcardId: number;

  @Column({ default: 0 })
  correctCount: number;

  @Column({ default: 0 })
  incorrectCount: number;

  @Column({ type: reviewColumnType, default: () => 'CURRENT_TIMESTAMP' })
  lastReviewed: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Flashcard)
  flashcard: Flashcard;
}
