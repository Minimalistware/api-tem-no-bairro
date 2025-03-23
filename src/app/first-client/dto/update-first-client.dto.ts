import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, Matches } from 'class-validator';

import {
  PHONE_NUMBER_PATTERN,
  USER_NAME_PATTERN,
} from '../schema/first-client.schema.options';

export class UpdateFirstClientDto {
  @ApiProperty()
  @IsMongoId()
  id: string;

  @ApiProperty()
  @Matches(USER_NAME_PATTERN)
  userName: string;

  @ApiProperty()
  @Matches(PHONE_NUMBER_PATTERN)
  phoneNumber: string;
}
