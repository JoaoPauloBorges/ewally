import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { EMessages } from './errorMessages.enum';

@Injectable()
export class NumericLineValidator implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const hasNonNumericValue = (value as string).search(/[^0-9]/) !== -1;
    if (!!hasNonNumericValue) {
      throw new BadRequestException(EMessages.NON_NUMERIC_VALUE);
    }

    const length = [...value].length;
    if (length !== 47 && length !== 48) {
      if (length > 48) {
        throw new BadRequestException(EMessages.LINE_LONGER_THAN_EXPECTED);
      }

      if (length < 47) {
        throw new BadRequestException(EMessages.LINE_SHORTER_THAN_EXPECTED);
      }
    }
    return value;
  }
}
