import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './database/typeorm.config';
import { validateEnv } from './env/env.constants';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { MappingProfile } from './profile/AutomapperProfile';
import { CreatorModule } from './creator/creator.module';
import { EditorModule } from './editor/editor.module';
import { MediaModule } from './media/media.module';
import { ProjectModule } from './project/project.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION_TIME') },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        typeOrmConfig(configService),
      inject: [ConfigService],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    MulterModule.register({
      dest: '../uploads',
    }),
    UserModule,
    NotificationModule,

    EditorModule,
    ProjectModule,
    MediaModule,
    CreatorModule,
  ],
  controllers: [AppController],
  providers: [AppService, MappingProfile],
})
export class AppModule {}
