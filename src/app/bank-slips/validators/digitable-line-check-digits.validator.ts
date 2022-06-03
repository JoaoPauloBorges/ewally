import { Utils } from '@app/shared/utils.service';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { InfoRetriver } from '../info-retriever.interface';

@Injectable()
export class DigitableLineCheckDigitsValidator implements PipeTransform {
  validateBillDigitableLine(digitableLine: string) {
    const field1 = digitableLine.slice(0, 12);
    const field2 = digitableLine.slice(12, 24);
    const field3 = digitableLine.slice(24, 36);
    const field4 = digitableLine.slice(36, 48);

    const fields = [field1, field2, field3, field4];

    fields.forEach((field) => {
      const checkDigit = field.slice(-1);
      const fieldArr = [...field.slice(0, -1)];
      Utils.validateCheckDigitMod11(fieldArr, checkDigit, true);
    });
  }

  validateBankSlipDigitableLine(digitableLine: string): string {
    const field1 = digitableLine.slice(0, 10);
    const field2 = digitableLine.slice(10, 21);
    const field3 = digitableLine.slice(21, 32);

    const fields = [field1, field2, field3];

    fields.forEach((field) => {
      const checkDigit = field.slice(-1);
      const fieldArr = [...field.slice(0, -1)];
      Utils.validateCheckDigitMod10(fieldArr, checkDigit);
    });

    return digitableLine;
  }

  transform(value: string, metadata: ArgumentMetadata) {
    if (InfoRetriver.isBillType(value)) {
      this.validateBillDigitableLine(value);
    } else {
      return this.validateBankSlipDigitableLine(value);
    }
    return value;
  }
}
