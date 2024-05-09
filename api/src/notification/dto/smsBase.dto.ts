import { AutoMap } from '@automapper/classes';

export class SmsBaseDto {
  @AutoMap()
  toPhone: string;
}
