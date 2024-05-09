import { AutoMap } from '@automapper/classes';

export class EmailBaseDto {
  @AutoMap()
  toEmails: string[];

  @AutoMap()
  ccEmails: string[];

  @AutoMap()
  bccEmails: string[];

  @AutoMap()
  attachments: string[];
}
