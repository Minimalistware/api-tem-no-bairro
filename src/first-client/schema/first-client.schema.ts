import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class FirstClient {
  @Prop()
  id: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  permitions: Array<string>;

  @Prop()
  password: string;
}

export type FirstClientDocument = HydratedDocument<FirstClient>;
export const FirstClientSchema = SchemaFactory.createForClass(FirstClient);
