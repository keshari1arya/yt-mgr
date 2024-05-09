import { AutoMap } from '@automapper/classes';
import { Creator } from 'src/creator/entities/creator.entity';
import { Editor } from 'src/editor/entities/editor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
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
  creator: Creator;

  // Editor relationship
  @AutoMap()
  @ManyToOne(() => Editor, (editor) => editor.projects)
  editor: Editor;

  // Media relationship
  @AutoMap()
  @OneToMany(() => Media, (media) => media.project)
  medias: Media[];

  // Feedback relationship
  @AutoMap()
  @OneToMany(() => Feedback, (feedback) => feedback.project)
  feedbacks: Feedback[];
}
