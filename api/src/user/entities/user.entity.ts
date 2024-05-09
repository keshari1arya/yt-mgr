import { AutoMap } from '@automapper/classes';
import { Creator } from 'src/creator/entities/creator.entity';
import { Editor } from 'src/editor/entities/editor.entity';
import { Feedback } from 'src/project/entities/feedback.entity';
import { UserRole } from 'src/shared/enums/user-role.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ nullable: true })
  @AutoMap()
  @Unique('UQ_EMAIL', ['email'])
  email: string;

  @Column({ nullable: true })
  @AutoMap()
  phone: string;

  @Column({ default: '' })
  @AutoMap()
  password: string;

  @Column({ default: '' })
  resetPasswordToken: string;

  @Column({ type: 'enum', enum: UserRole })
  @AutoMap()
  role: string;

  @Column({ nullable: true })
  @AutoMap()
  otp: number;

  @AutoMap()
  @OneToOne(() => Creator, (c) => c.user)
  creator: Creator;

  // Editor relationship
  @AutoMap()
  @OneToOne(() => Editor, (editor) => editor.user)
  editor: Editor;

  // Feedback relationship
  @AutoMap()
  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];
}
