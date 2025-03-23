import {
  Injectable,
  PipeTransform,
  NotAcceptableException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: any): any {
    if (!isValidObjectId(value)) {
      throw new NotAcceptableException('Invalid ObjectId');
    }
    return value;
  }
}
