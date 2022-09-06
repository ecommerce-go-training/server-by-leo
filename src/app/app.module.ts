import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from '@/config';
import { AppController } from './app.controller';

import { UserModule } from '@/api/user/user.module';
import { AuthModule } from '@/api/auth/auth.module';
import { TokenModule } from '@/api/token/token.module';
import { DatabaseModule } from '@/database/database.module';

const EnvSchema = {
  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  PORT: Joi.number(),
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  NODE_ENV: Joi.string(),
};

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object().keys(EnvSchema),
      load: [configuration],
    }),
    TokenModule,
    AuthModule,
    UserModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
