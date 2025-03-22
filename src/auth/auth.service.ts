import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { FirstClientService } from 'src/first-client/first-client.service';
import { FirstClient } from 'src/first-client/schema/first-client.schema';

@Injectable()
export class AuthService {
  constructor(
    private FirstClientService: FirstClientService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const FirstClient = await this.FirstClientService.findOne(email);

    if (!FirstClient) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, FirstClient.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: FirstClient.id,
      email: FirstClient.email,
      name: FirstClient.name,
      permitions: FirstClient.permitions,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    email: string,
    password: string,
    name: string,
  ): Promise<{ access_token: string }> {
    let FirstClientExists = await this.FirstClientService.findSome(email);

    if (FirstClientExists) {
      throw new ConflictException();
    }

    const saltOrRounds = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, saltOrRounds);

    await this.FirstClientService.create(
      Object.assign(new FirstClient(), {
        email,
        name,
        password: hash,
      }),
    );

    const firstClient = await this.FirstClientService.findOne(email);

    const payload = {
      sub: firstClient.id,
      email: firstClient.email,
      permitions: firstClient.permitions,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
