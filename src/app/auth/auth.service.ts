import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { FirstClientService } from 'src/app/first-client/first-client.service';
import { FirstClient } from 'src/app/first-client/schema/first-client.schema';

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
    const firstClient = await this.FirstClientService.findOne(email);

    if (!firstClient) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, firstClient.passwordHash);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: firstClient.id,
      email: firstClient.email,
      name: firstClient.userName,
      permitions: firstClient.permitions,
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
    const FirstClientExists = await this.FirstClientService.findSome(email);

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
