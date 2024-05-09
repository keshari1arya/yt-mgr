import { AutoMap } from '@automapper/classes';
import { Project } from 'src/project/entities/project.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

// Media entity
@Entity()
export class Media {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  // Project relationship
  @AutoMap()
  @ManyToOne(() => Project, (project) => project.medias)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_media_project_id',
  })
  project: Project;

  @AutoMap()
  @Column()
  type: string;

  @AutoMap()
  @Column()
  fileName: string;

  @AutoMap()
  @Column()
  fileSize: number;

  @AutoMap()
  @Column()
  uploadDate: Date;

  @AutoMap()
  @Column()
  uploadBy: string;

  @AutoMap()
  @Column()
  url: string;
}
