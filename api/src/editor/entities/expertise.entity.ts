import { AutoMap } from '@automapper/classes';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Editor } from './editor.entity';

// Expertise entity

@Entity()
export class Expertise {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  name: string;

  // Editor relationship
  @AutoMap()
  @ManyToMany(() => Editor, (editor) => editor.expertises)
  editors: Editor[];
}
