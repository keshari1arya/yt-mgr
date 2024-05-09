import { AutoMap } from '@automapper/classes';
import { Creator } from 'src/creator/entities/creator.entity';
import { Editor } from 'src/editor/entities/editor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

// Review entity
@Entity()
export class Review {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  // Editor relationship
  @AutoMap()
  @ManyToOne(() => Editor, (editor) => editor.reviews)
  editor: Editor;

  @AutoMap()
  @ManyToOne(() => Creator, (c) => c.reviews)
  creator: Creator;

  @AutoMap()
  @Column()
  rating: number;

  @AutoMap()
  @Column()
  comment: string;
}
