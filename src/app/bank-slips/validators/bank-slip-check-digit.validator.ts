import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { EMessages } from './errorMessages.enum';

function* genGetMultiplier(times = 43): Generator<number, any, void> {
  let b = 2;
  while (times >= 0) {
    yield b;
    times--;
    b++;
    if (b === 10) {
      b = 2;
    }
  }
}

@Injectable()
export class BankSlipCheckDigitValidator implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (value[0] === '8') return value;

    console.log('[Info] checking BankSlip digit check');

    const getMultiplier = genGetMultiplier(43);

    try {
      const barCodWithoutCheckDigit = [...value.slice(0, 4), ...value.slice(5)];

      const sum = barCodWithoutCheckDigit.reverse().reduce((acc, curr) => {
        const multiplier = getMultiplier.next().value;
        return acc + Number(curr) * multiplier;
      }, 0);

      let checkDigit = 11 - (sum % 11);
      if (checkDigit === 0 || checkDigit === 10 || checkDigit === 11) {
        checkDigit = 1;
      }

      if (checkDigit !== Number(value[4])) {
        throw new BadRequestException(EMessages.CHECKDIGIT_ERROR);
      }

      return value;
    } finally {
      getMultiplier.return(0);
    }
  }
}
