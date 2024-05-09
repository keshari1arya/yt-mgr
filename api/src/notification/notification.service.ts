import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationContentType } from 'src/shared/enums/notification-content.enum';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { EmailBaseDto } from './dto/emailBase.dto';
import { NotificationHelper } from './helper/notification.helper';
import { NotificationType } from 'src/shared/enums/notifiction.enum';
import { SmsBaseDto } from './dto/smsBase.dto';
import * as SendGrid from '@sendgrid/mail';
import * as AWS from 'aws-sdk';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {
    SendGrid.setApiKey(process.env.SEND_GRID_KEY);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  async sendEmail(
    contentType: NotificationContentType,
    emailModel: EmailBaseDto,
  ) {
    const notification = await this.notificationRepository.findOne({
      where: {
        contentType,
        type: NotificationType.EMAIL,
      },
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    if (emailModel?.toEmails?.length === 0) {
      throw new Error('Emails not found');
    }

    // add email to email
    if (emailModel?.ccEmails?.length > 0) {
      // add email to cc
    }

    if (emailModel?.bccEmails?.length > 0) {
      // add email to bcc
    }

    if (emailModel?.attachments?.length > 0) {
      // add attachments
    }

    // add subject
    const subject = NotificationHelper.replacePlaceholders(
      emailModel,
      notification.subject,
    );

    // add message
    const message = NotificationHelper.replacePlaceholders(
      emailModel,
      notification.message,
    );
    // send email

    const msg: any = {
      to: emailModel.toEmails[0],
      from: process.env.SENDER_EMAIL,
      subject: notification.subject,
      html: notification.message,
    };

    const result = await SendGrid.send(msg);
  }

  async sendSms(contentType: NotificationContentType, dto: SmsBaseDto) {
    const notification = await this.notificationRepository.findOne({
      where: {
        contentType,
        type: NotificationType.SMS,
      },
    });

    AWS.config.update({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      region: process.env.REGION,
    });

    const sns = new AWS.SNS();

    // Send SMS
    const SMSParams: any = {
      Message: 'Test',
      PhoneNumber: `${'+91'}${'9530153968'}`,
      MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
          DataType: 'String',
          StringValue: 'Hello',
        },
      },
    };

    const response = await sns.publish(SMSParams).promise();

    if (!notification) {
      throw new InternalServerErrorException('Notification not found');
    }

    if (!dto.toPhone) {
      throw new BadRequestException('Phone not found');
    }

    const message = NotificationHelper.replacePlaceholders(
      dto,
      notification.message,
    );
  }
}
