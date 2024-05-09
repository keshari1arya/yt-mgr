import { AutoMap } from '@automapper/classes';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Expertise } from './expertise.entity';
import { Project } from 'src/project/entities/project.entity';
import { Review } from 'src/project/entities/review.entity';

// Editor entity
@Entity()
export class Editor {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  // User relationship
  @AutoMap()
  @OneToOne(() => User, (user) => user.editor)
  user: User;

  @AutoMap()
  @Column()
  userId: number;

  // Expertise relationship
  @AutoMap()
  @ManyToMany(() => Expertise)
  @JoinTable()
  expertises: Expertise[];

  // Project relationship
  @AutoMap()
  @OneToMany(() => Project, (project) => project.editor)
  projects: Project[];

  // Review relationship
  @AutoMap()
  @OneToMany(() => Review, (review) => review.editor)
  reviews: Review[];
}
