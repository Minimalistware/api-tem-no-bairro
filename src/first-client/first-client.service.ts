import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { FirstClient } from './schema/first-client.schema';

@Injectable()
export class FirstClientService {
  constructor(
    @InjectModel(FirstClient.name) private FirstClientModel: Model<FirstClient>,
  ) {}

  async findOne(email: string): Promise<FirstClient> {
    const result = await this.FirstClientModel.findOne({ email });

    if (result === null) {
      throw new NotFoundException(`FirstClient ${email} not found`);
    }

    return result;
  }

  async findSome(email: string): Promise<{ _id: Types.ObjectId } | null> {
    const result = await this.FirstClientModel.exists({ email });
    return result;
  }

  async create(FirstClient: FirstClient): Promise<FirstClient> {
    return this.FirstClientModel.create(FirstClient);
  }
}
