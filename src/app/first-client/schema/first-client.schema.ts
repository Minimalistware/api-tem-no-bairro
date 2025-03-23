import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import {
  accessFailedCountOptions,
  emailOptions,
  passwordHashOptions,
  userNameOptions,
} from './first-client.schema.options';
import { Transform } from 'class-transformer';

@Schema()
export class FirstClient {
  @Transform((value) => JSON.stringify(value))
  id: string;

  @Prop(emailOptions)
  email: string;

  @Prop(userNameOptions)
  userName: string;

  @Prop(passwordHashOptions)
  passwordHash: string;

  @Prop()
  emailConfirmed: boolean;

  @Prop()
  phoneNumber: string;

  @Prop()
  phoneNumberConfirmed: string;

  @Prop(accessFailedCountOptions)
  accessFailedCount: number;

  @Prop()
  permitions: Array<string>;
}

export type FirstClientDocument = HydratedDocument<FirstClient>;
export const FirstClientSchema = SchemaFactory.createForClass(FirstClient);
