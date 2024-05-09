import { AutoMap } from '@automapper/classes';
import { Project } from 'src/project/entities/project.entity';
import { Review } from 'src/project/entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  OneToMany,
} from 'typeorm';

// Youtuber entity
@Entity()
export class Creator {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  // User relationship
  @AutoMap()
  @OneToOne(() => User, (user) => user.creator)
  user: User;

  @AutoMap()
  @Column()
  userId: number;

  @AutoMap()
  @Column('simple-array')
  channelIds: string[];

  // Project relationship
  @AutoMap()
  @OneToMany(() => Project, (project) => project.creator)
  projects: Project[];

  // Review relationship
  @AutoMap()
  @OneToMany(() => Review, (review) => review.creator)
  reviews: Review[];
}
