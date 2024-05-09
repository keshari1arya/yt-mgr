import { AutoMap } from '@automapper/classes';
import { NotificationContentType } from 'src/shared/enums/notification-content.enum';
import { NotificationType } from 'src/shared/enums/notifiction.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  message: string;

  @Column({ type: 'enum', enum: NotificationType })
  @AutoMap()
  type: string;

  @Column({ type: 'enum', enum: NotificationContentType })
  @AutoMap()
  contentType: string;

  @Column()
  @AutoMap()
  subject: string;
}
