import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  NotAcceptableException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class DtoValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    if (typeof value !== 'object' || value === null) {
      throw new NotAcceptableException(
        'O valor fornecido não é um objeto válido.',
      );
    }

    const object = plainToInstance(metatype, value);    
    const errors = await validate(object);

    if (errors.length > 0) {
      const constraintsString = errors
        .map((error) => error.constraints)
        .flatMap((error: any) => Object.values(error))
        .join('; ');

      throw new BadRequestException(constraintsString);
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
