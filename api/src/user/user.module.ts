import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { AuthService } from './services/auth.service';
import { UserProfile } from './user.profile';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), NotificationModule],
  controllers: [UserController],
  providers: [UserService, AuthService, UserProfile, JwtService],
  exports: [UserService],
})
export class UserModule {}
