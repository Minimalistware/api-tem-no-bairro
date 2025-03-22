import { PartialType } from '@nestjs/swagger';
import { CreateFirstClientDto } from './create-first-client.dto';

export class UpdateFirstClientDto extends PartialType(CreateFirstClientDto) {}
