import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { FirstClient, FirstClientSchema } from './schema/first-client.schema';

import { FirstClientService } from './first-client.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FirstClient.name, schema: FirstClientSchema },
    ]),
  ],
  exports: [FirstClientService],
  providers: [FirstClientService],
})
export class FirstClientModule {}
