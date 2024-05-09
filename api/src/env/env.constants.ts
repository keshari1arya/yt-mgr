import { plainToInstance } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  NODE_ENV: string;

  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_EXPIRATION_TIME: string;

  @IsString()
  @IsNotEmpty()
  PASSWORD_RESET_EXPIRATION_TIME: string;

  @IsNumber()
  @IsNotEmpty()
  PASSWORD_SALT_ROUNDS: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  DATABASE_PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_USER: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_SCHEMA: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_NAME: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_BUCKET: string;

  @IsString()
  @IsNotEmpty()
  ACCESS_KEY_ID: string;

  @IsString()
  @IsNotEmpty()
  SECRET_ACCESS_KEY: string;

  @IsBoolean()
  @IsNotEmpty()
  SHOW_SWAGGER_DOCUMENT: boolean;

  @IsNumber()
  @IsNotEmpty()
  DEFAULT_OTP: number;

  @IsString()
  @IsOptional()
  ADMIN_EMAIL: string;

  @IsString()
  @IsOptional()
  ADMIN_PHONE: string;

  @IsString()
  @IsOptional()
  ADMIN_PASSWORD: string;
}

export function validateEnv(
  env: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, env, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
