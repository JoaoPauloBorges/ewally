import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BillCheckDigitValidator } from './bill-check-digit.validator';
import { EMessages } from './errorMessages.enum';

describe('BillCheckDigitValidator', () => {
  let validator: BillCheckDigitValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillCheckDigitValidator],
    }).compile();

    validator = module.get<BillCheckDigitValidator>(BillCheckDigitValidator);
  });

  it('should be defined', () => {
    expect(validator).toBeDefined();
  });

  describe('Given an value intercepted', () => {
    describe('when the barcode is not from a bill paymnet type', () => {
      const bankSlipBarCode = '21299758700000020000001121100012100447561740';
      it('should throw an BadRequestException with the correct description', () => {
        expect(validator.transform(bankSlipBarCode, {} as any)).toBe(bankSlipBarCode);
      });
    });

    describe('when the value received has a wrong check digit', () => {
      const billBarCodeWithWrongCheckDigit = '82220000215048200974123220154098290108605940';
      it('should throw an BadRequestException with the correct description', () => {
        expect(() => validator.transform(billBarCodeWithWrongCheckDigit, {} as any)).toThrow(
          new BadRequestException(EMessages.CHECKDIGIT_ERROR),
        );
      });
    });

    describe('when the value received has a wrong check digit', () => {
      const billBarCode = '82210000215048200974123220154098290108605940';
      it('should just return the value', () => {
        expect(() => validator.transform(billBarCode, {} as any)).not.toThrow(
          new BadRequestException(EMessages.CHECKDIGIT_ERROR),
        );

        expect(validator.transform(billBarCode, {} as any)).toBe(billBarCode);
      });
    });
  });
});
