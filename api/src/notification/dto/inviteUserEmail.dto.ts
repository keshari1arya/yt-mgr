import { EmailBaseDto } from './emailBase.dto';

export class InviteUserEmailDto extends EmailBaseDto {
  constructor(name: string, url: string) {
    super();
    this.name = name;
    this.url = url;
  }

  name: string;
  url: string;
}
