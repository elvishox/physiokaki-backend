import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserProgress } from '../progress/entities/user-progress.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'estudiante' })
  role: string;

  @OneToMany(() => UserProgress, progress => progress.user)
  progress: UserProgress[];
}