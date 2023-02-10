import { Habit } from 'src/habits/entities/habit.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tracker {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Habit, (habit) => habit.habitId)
  @JoinColumn({ name: 'habitId', referencedColumnName: 'habitId' })
  habit: Habit;

  @CreateDateColumn()
  createdAt: Date;
}
