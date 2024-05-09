import { Body, Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotificationContentType } from 'src/shared/enums/notification-content.enum';
import { AllowAnonymous } from 'src/decorator/allowAnonymous.decorator';
import { SendOtpDto } from './dto/sendOtp.dto';

@ApiTags('notification')
@Controller('notification')
@AllowAnonymous()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Send notification' })
  @ApiOkResponse({ description: 'Notification sent successfully' })
  @Get('send-notification')
  async sendNotification(@Body() sendOtpDto: SendOtpDto) {
    this.notificationService.sendSms(
      NotificationContentType.GENERATE_OTP,
      sendOtpDto,
    );

    return 'Notification sent successfully';
  }
}
