import { EMessages } from '@app/bank-slips/validators/errorMessages.enum';
import { BadRequestException } from '@nestjs/common';
import { Utils } from './utils.service';

describe('Utils', () => {
  describe('Given a call to validateCheckDigitMod10', () => {
    describe('When the calculated checkdigit is 10 ', () => {
      it('should consider the calculated checkdigit equals to 0', () => {
        const value = '626720052200';

        const checkDigit = value.slice(-1); // 0
        const fieldArr = [...value.slice(0, -1)];

        expect(() => Utils.validateCheckDigitMod10(fieldArr, checkDigit)).not.toThrow(
          new BadRequestException(EMessages.DIGITABLELINE_CHECKDIGIT_ERROR),
        );
      });
    });
  });
});
