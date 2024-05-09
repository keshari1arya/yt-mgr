import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserReadDto } from '../dto/user-read-dto';
import { UserReadWithAuthDataDto } from '../dto/read-user-with-auth-data.dto';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationContentType } from 'src/shared/enums/notification-content.enum';
import { SendOtpDto } from 'src/notification/dto/sendOtp.dto';
import { AuthService } from './auth.service';
import { token } from 'aws-sdk/clients/sns';
import { VerifyOtpDto } from '../dto/verifyOtp.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectMapper() private readonly mapper: Mapper,
    private notificationService: NotificationService,
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  async create(userCreateDto: UserCreateDto): Promise<UserReadDto> {
    const user = this.mapper.map(userCreateDto, User, UserCreateDto);
    const createdUser = await this.userRepository.save(user);
    return this.mapper.map(createdUser, User, UserReadDto);
  }

  async findAll(): Promise<UserReadDto[]> {
    const users = await this.userRepository.find();
    return this.mapper.mapArray(users, User, UserReadDto);
  }

  async findOne(id: number): Promise<UserReadDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return this.mapper.map(user, User, UserReadDto);
  }

  async findByEmail(email: string): Promise<UserReadDto> {
    const a = await this.userRepository.findOneBy({
      email: email,
    });

    return this.mapper.map(a, User, UserReadDto);
  }

  async findWithAuthDataByEmail(
    email: string,
  ): Promise<UserReadWithAuthDataDto> {
    return await this.userRepository
      .findOne({
        where: { email: email },
      })
      .then((user) => this.mapper.map(user, User, UserReadWithAuthDataDto));
  }

  async update(id: number, userUpdateDto: UserUpdateDto): Promise<UserReadDto> {
    await this.userRepository.update(id, userUpdateDto);
    return this.findOne(id);
  }

  async updatePassword(email: string, password: string): Promise<void> {
    return this.userRepository
      .update({ email: email }, { password, resetPasswordToken: '' })
      .then();
  }

  async updateResetPasswordToken(
    email: string,
    resetPasswordToken: string,
  ): Promise<void> {
    return await this.userRepository
      .update({ email: email }, { resetPasswordToken })
      .then();
  }

  async remove(id: number): Promise<{ message: string }> {
    return this.userRepository.delete(id).then((user) => {
      if (!user.affected) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return { message: `User with id ${id} has been deleted` };
    });
  }

  async requestOtp(mobile: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { phone: mobile },
    });

    if (!user) {
      throw new NotFoundException(
        `Participant with mobile ${mobile} not found`,
      );
    }

    // user.otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = this.configService.get<number>('DEFAULT_OTP');
    await this.userRepository.save(user);
    const dto = new SendOtpDto();
    dto.toPhone = mobile;
    dto.otp = user.otp;
    dto.appName = 'YT-MGR';

    await this.notificationService.sendSms(
      NotificationContentType.GENERATE_OTP,
      dto,
    );
  }

  async verifyOtp(dto: VerifyOtpDto): Promise<token> {
    const user = await this.userRepository.findOne({
      where: { phone: dto.mobile, otp: dto.otp },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid OTP');
    }

    user.otp = null;
    await this.userRepository.save(user);
    const userReadDto = this.mapper.map(user, User, UserReadWithAuthDataDto);
    const token = await this.authService.createToken(userReadDto);
    return token;
  }

  async login(dto: LoginUserDto): Promise<token> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    const userReadWithAuthDataDto = this.mapper.map(
      user,
      User,
      UserReadWithAuthDataDto,
    );
    return this.authService.getToken(userReadWithAuthDataDto, dto.password);
  }
}
