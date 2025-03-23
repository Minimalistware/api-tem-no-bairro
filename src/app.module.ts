import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { MongooseModule } from '@nestjs/mongoose';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

import { Connection } from 'mongoose';

import { AuthModule } from './app/auth/auth.module';
import { FirstClientModule } from './app/first-client/first-client.module';
import { SeederModule } from './helpers/helper.module';

@Module({
  imports: [
    FirstClientModule,
    AuthModule,
    CacheModule.register({ ttl: 10000 }),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI || '', {
      onConnectionCreate: (connection: Connection) => {
        const logger = new Logger(MongooseModule.name);
        connection.on('connected', () =>
          logger.log('🟢 connected to the database'),
        );
        connection.on('error', () =>
          logger.log('🔴 while connecting to the database'),
        );
        return connection;
      },
    }),
    SeederModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
