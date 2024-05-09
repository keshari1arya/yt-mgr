import { AutoMap } from '@automapper/classes';
import { Creator } from 'src/creator/entities/creator.entity';
import { Editor } from 'src/editor/entities/editor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Feedback } from './feedback.entity';
import { Media } from 'src/media/entities/media.entity';

// Project entity
@Entity()
export class Project {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  title: string;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @Column()
  status: string;

  @AutoMap()
  @ManyToOne(() => Creator, (c) => c.projects)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_project_creator_id',
  })
  creator: Creator;

  // Editor relationship
  @AutoMap()
  @ManyToOne(() => Editor, (editor) => editor.projects)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_project_editor_id',
  })
  editor: Editor;

  // Media relationship
  @AutoMap()
  @OneToMany(() => Media, (media) => media.project)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_project_media_id',
  })
  medias: Media[];

  // Feedback relationship
  @AutoMap()
  @OneToMany(() => Feedback, (feedback) => feedback.project)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_project_feedback_id',
  })
  feedbacks: Feedback[];
}
