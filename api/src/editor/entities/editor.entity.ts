import { AutoMap } from '@automapper/classes';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
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
  @JoinColumn({
    foreignKeyConstraintName: 'FK_editor_user_id',
  })
  user: User;

  // Expertise relationship
  @AutoMap()
  @ManyToMany(() => Expertise)
  @JoinTable({
    name: 'editor_expertise',
    joinColumn: {
      name: 'editor_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'expertise_id',
      referencedColumnName: 'id',
    },
  })
  expertises: Expertise[];

  // Project relationship
  @AutoMap()
  @OneToMany(() => Project, (project) => project.editor)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_project_editor_id',
  })
  projects: Project[];

  // Review relationship
  @AutoMap()
  @OneToMany(() => Review, (review) => review.editor)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_review_editor_id',
  })
  reviews: Review[];
}
