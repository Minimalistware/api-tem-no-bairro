import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { MongooseModule } from '@nestjs/mongoose';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

import { Connection } from 'mongoose';

import { AuthModule } from './auth/auth.module';
import { FirstClientModule } from './first-client/first-client.module';

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
        connection.on('connected', () => console.log('🟢 connected'));
        connection.on('error', () => console.log('🔴 error'));
        return connection;
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
