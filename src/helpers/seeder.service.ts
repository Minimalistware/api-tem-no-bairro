import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { FirstClient } from 'src/app/first-client/schema/first-client.schema';

@Injectable()
export class SeederService {
  private readonly logger: Logger;
  constructor(
    @InjectModel(FirstClient.name) private firstClientModel: Model<FirstClient>,
  ) {
    this.logger = new Logger(SeederService.name);
  }

  async seed(): Promise<void> {
    const canSeed = process.env.NODE_ENV !== 'production';
    const isEmpty = (await this.firstClientModel.exists({})) === null;

    if (canSeed && isEmpty) {
      const saltOrRounds = await bcrypt.genSalt();
      const firstClients = [
        {
          _id: '67e029e3887f1b1e1c8a6309',
          email: 'joao.silva@example.com',
          userName: 'joaosilva',
          passwordHash: await bcrypt.hash('hashedpassword123', saltOrRounds),
          emailConfirmed: true,
          phoneNumber: '+5591987654321',
          phoneNumberConfirmed: 'true',
          accessFailedCount: 0,
          permitions: [],
        },
        {
          _id: '67e029cda0ef2e18bdb742c5',
          email: 'maria.oliveira@example.com',
          userName: 'maria_oliveira',
          passwordHash: await bcrypt.hash('hashedpassword456', saltOrRounds),
          emailConfirmed: false,
          phoneNumber: '+5591986543210',
          phoneNumberConfirmed: 'false',
          accessFailedCount: 1,
          permitions: [],
        },
        {
          _id: '67e029c127b59bb085dfeca9',
          email: 'carlos.santos@example.com',
          userName: 'carlossantos',
          passwordHash: await bcrypt.hash('hashedpassword789', saltOrRounds),
          emailConfirmed: true,
          phoneNumber: '+5591975432109',
          phoneNumberConfirmed: 'true',
          accessFailedCount: 0,
          permitions: [],
        },
        {
          _id: '67e02c9142b3512c020a91eb',
          email: 'ana.souza@example.com',
          userName: 'anasouza',
          passwordHash: await bcrypt.hash('hashedpassword101', saltOrRounds),
          emailConfirmed: false,
          phoneNumber: '+5591964321098',
          phoneNumberConfirmed: 'false',
          accessFailedCount: 2,
          permitions: [],
        },
        {
          _id: '67e029b92c26419721427ddd',
          email: 'lucas.almeida@example.com',
          userName: 'lucas_almeida',
          passwordHash: await bcrypt.hash('hashedpassword112', saltOrRounds),
          emailConfirmed: true,
          phoneNumber: '+5591953210987',
          phoneNumberConfirmed: 'true',
          accessFailedCount: 0,
          permitions: [],
        },
      ];
      await this.firstClientModel.insertMany(firstClients);
      this.logger.log(`✔️  database seeded with ${FirstClient.name}s`);
    }
  }

  async tear(): Promise<void> {
    await this.firstClientModel.deleteMany();
    this.logger.log(`✔️  database teared down`);
  }
}
