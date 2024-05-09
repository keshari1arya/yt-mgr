import { AutoMap } from '@automapper/classes';
import { SmsBaseDto } from './smsBase.dto';

export class SendOtpDto extends SmsBaseDto {
  @AutoMap()
  otp: number;

  @AutoMap()
  appName: string;
}
