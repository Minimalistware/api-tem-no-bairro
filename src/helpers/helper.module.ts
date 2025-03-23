import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FirstClient,
  FirstClientSchema,
} from 'src/app/first-client/schema/first-client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FirstClient.name, schema: FirstClientSchema },
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
