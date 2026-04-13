import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Entity()
export class ChatSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, u => u.id)

  @Column({ type: 'simple-json', nullable: true }) // <--- CAMBIADO DE jsonb A simple-json
  messages: Array<{role: string; content: string}>;

  @UpdateDateColumn()
  updatedAt: Date;
}