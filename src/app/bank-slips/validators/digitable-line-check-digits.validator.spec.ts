import { Utils } from '@app/shared/utils.service';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DigitableLineCheckDigitsValidator } from './digitable-line-check-digits.validator';
import { EMessages } from './errorMessages.enum';

describe('DigitableLineCheckDigitsValidator', () => {
  let validator: DigitableLineCheckDigitsValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DigitableLineCheckDigitsValidator],
    }).compile();

    validator = module.get<DigitableLineCheckDigitsValidator>(DigitableLineCheckDigitsValidator);
  });

  it('should be defined', () => {
    expect(validator).toBeDefined();
  });

  describe('Given an value intercepted', () => {
    describe('when the digitableline is correct and it is from a bank-slip type', () => {
      const digitableline = '21290001192110001210904475617405975870000002000';
      it('should call validateBankSlipDigitableLine and do not throw any error', () => {
        const spy = jest.spyOn(validator, 'validateBankSlipDigitableLine');

        validator.transform(digitableline, {} as any);
        expect(spy).toBeCalled();
        expect(() => validator.transform(digitableline, {} as any)).not.toThrow(
          new BadRequestException(EMessages.DIGITABLELINE_CHECKDIGIT_ERROR),
        );
      });
    });

    describe('when the digitableline is correct, it is from a bill type and it has a currency flag 8 or 9', () => {
      const digitablelineCurrencyFlag8 = '858200000260178601801205529544183860673925100017';
      it('should call validateBillDigitableLine, validate checkdigit with MOD11 and do not throw any error', () => {
        const spy = jest.spyOn(validator, 'validateBillDigitableLine');
        const spyUtils = jest.spyOn(Utils, 'validateCheckDigitMod11');

        validator.transform(digitablelineCurrencyFlag8, {} as any);
        expect(spy).toBeCalled();
        expect(spyUtils).toBeCalled();
        expect(() => validator.transform(digitablelineCurrencyFlag8, {} as any)).not.toThrow(
          new BadRequestException(EMessages.DIGITABLELINE_CHECKDIGIT_ERROR),
        );
      });
    });

    describe('when the digitableline is correct, it is from a bill type and it has a currency flag 6 or 7', () => {
      const digitablelineCurrencyFlag6 = '836900000032808800090462626720052200000108309113';
      it('should call validateBillDigitableLine, validate checkdigit with MOD10 and do not throw any error', () => {
        const spy = jest.spyOn(validator, 'validateBillDigitableLine');
        const spyUtils = jest.spyOn(Utils, 'validateCheckDigitMod10');

        validator.transform(digitablelineCurrencyFlag6, {} as any);
        expect(spy).toBeCalled();
        expect(spyUtils).toBeCalled();
        expect(() => validator.transform(digitablelineCurrencyFlag6, {} as any)).not.toThrow(
          new BadRequestException(EMessages.DIGITABLELINE_CHECKDIGIT_ERROR),
        );
      });
    });

    describe('when the digitableline is from a bank-slip type and has a wrong check digit', () => {
      const firstWrongCheckDigit = '21290001152110001210904475617405975870000002000';
      it('should throw an BadRequestException with the correct description', () => {
        expect(() => validator.transform(firstWrongCheckDigit, {} as any)).toThrow(
          new BadRequestException(EMessages.DIGITABLELINE_CHECKDIGIT_ERROR),
        );
      });
      const secondWrongCheckDigit = '21290001192110001210504475617405975870000002000';
      it('should throw an BadRequestException with the correct description', () => {
        expect(() => validator.transform(secondWrongCheckDigit, {} as any)).toThrow(
          new BadRequestException(EMessages.DIGITABLELINE_CHECKDIGIT_ERROR),
        );
      });
      const thirdWrongCheckDigit = '21290001192110001210904475617409975870000002000';
      it('should throw an BadRequestException with the correct description', () => {
        expect(() => validator.transform(thirdWrongCheckDigit, {} as any)).toThrow(
          new BadRequestException(EMessages.DIGITABLELINE_CHECKDIGIT_ERROR),
        );
      });
    });

    describe('when the digitableline is from a bill type and has a wrong check digit', () => {
      const firstWrongCheckDigit = '858200000261178601801205529544183860673925100017';
      it('should throw an BadRequestException with the correct description', () => {
        expect(() => validator.transform(firstWrongCheckDigit, {} as any)).toThrow(
          new BadRequestException(EMessages.DIGITABLELINE_CHECKDIGIT_ERROR),
        );
      });
      const secondWrongCheckDigit = '858200000260178601801205629544183860673925100017';
      it('should throw an BadRequestException with the correct description', () => {
        expect(() => validator.transform(secondWrongCheckDigit, {} as any)).toThrow(
          new BadRequestException(EMessages.DIGITABLELINE_CHECKDIGIT_ERROR),
        );
      });
      const thirdWrongCheckDigit = '858200000260178601801205529544183862673925100017';
      it('should throw an BadRequestException with the correct description', () => {
        expect(() => validator.transform(thirdWrongCheckDigit, {} as any)).toThrow(
          new BadRequestException(EMessages.DIGITABLELINE_CHECKDIGIT_ERROR),
        );
      });
      const fourthWrongCheckDigit = '858200000260178601801205529544183860673925100014';
      it('should throw an BadRequestException with the correct description', () => {
        expect(() => validator.transform(fourthWrongCheckDigit, {} as any)).toThrow(
          new BadRequestException(EMessages.DIGITABLELINE_CHECKDIGIT_ERROR),
        );
      });
    });
  });
});
