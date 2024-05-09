import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserReadDto } from './dto/user-read-dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/shared/enums/user-role.enum';
import { AllowAnonymous } from 'src/decorator/allowAnonymous.decorator';
import { LoginUserDto } from './dto/login-user.dto';

@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserReadDto,
  })
  @Post()
  create(@Body() user: UserCreateDto): Promise<UserReadDto> {
    return this.userService.create(user);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns all users.',
    type: [UserReadDto],
  })
  @Get()
  findAll(): Promise<UserReadDto[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user with the specified ID.',
    type: UserReadDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserReadDto> {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserReadDto,
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UserUpdateDto,
  ): Promise<UserReadDto> {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.userService.remove(+id);
  }

  @AllowAnonymous()
  @ApiOperation({ summary: 'Request for OTP' })
  @ApiResponse({
    status: 200,
    description: 'The OTP has been successfully sent.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The user with the mobile was not found.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Issue with sending the OTP.',
  })
  @Post('request-otp/:mobile')
  requestOtp(@Param('mobile') mobile: string): Promise<void> {
    return this.userService.requestOtp(mobile);
  }

  @AllowAnonymous()
  @ApiOperation({ summary: 'Verify otp to get token' })
  @ApiResponse({
    status: 200,
    description: 'The OTP has been successfully verified.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The user with the mobile was not found.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Issue with verifying the OTP.',
  })
  @Post('verify-otp')
  verifyOtp(@Body() dto: VerifyOtpDto): Promise<string> {
    return this.userService.verifyOtp(dto);
  }

  @AllowAnonymous()
  @ApiOperation({ summary: 'Login user.' })
  @ApiOkResponse({
    description: 'User logged in successfully.',
    type: String,
  })
  @Post('login')
  login(@Body() user: LoginUserDto): Promise<string> {
    return this.userService.login(user);
  }
}
