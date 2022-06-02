import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { EMessages } from './errorMessages.enum';

function getMultiplier(idx: number) {
  return idx % 2 === 0 ? 2 : 1;
}

@Injectable()
export class BillCheckDigitValidator implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (value[0] != '8') return value;

    console.log('[Info] checking Bill digit check');

    const barCodWithoutCheckDigit = [...value.slice(0, 3), ...value.slice(4)];

    const stringOfProducts = barCodWithoutCheckDigit.reverse().reduce((acc, curr, idx) => {
      const multiplier = getMultiplier(idx);
      return acc + String(Number(curr) * multiplier);
    }, '');

    const sum = [...stringOfProducts].reduce((acc, curr) => acc + Number(curr), 0);

    const checkDigit = 10 - (sum % 10);

    if (checkDigit !== Number(value[3])) {
      throw new BadRequestException(EMessages.CHECKDIGIT_ERROR);
    }

    return value;
  }
}
