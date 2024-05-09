import { AutoMap } from '@automapper/classes';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from 'src/user/entities/user.entity';

// Feedback entity
@Entity()
export class Feedback {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  // Project relationship
  @AutoMap()
  @ManyToOne(() => Project, (project) => project.feedbacks)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_feedback_project_id',
  })
  project: Project;

  // User relationship
  @AutoMap()
  @ManyToOne(() => User, (user) => user.feedbacks)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_feedback_user_id',
  })
  user: User;

  @AutoMap()
  @Column()
  timestamp: Date;

  @AutoMap()
  @Column()
  content: string;
}
