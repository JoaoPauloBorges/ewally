import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BankSlipCheckDigitValidator } from './bank-slip-check-digit.validator';
import { EMessages } from './errorMessages.enum';

describe('BankSlipCheckDigitValidator', () => {
  let validator: BankSlipCheckDigitValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankSlipCheckDigitValidator],
    }).compile();

    validator = module.get<BankSlipCheckDigitValidator>(BankSlipCheckDigitValidator);
  });

  it('should be defined', () => {
    expect(validator).toBeDefined();
  });

  describe('Given an value intercepted', () => {
    describe('when the barcode is not from a bank-slip type', () => {
      const billBarCode = '82210000215048200974123220154098290108605940';
      it('should just return the value', () => {
        expect(validator.transform(billBarCode, {} as any)).toBe(billBarCode);
      });
    });

    describe('when the value received has a wrong check digit', () => {
      const bankSlipBarCodeWithWrongCheckDigit = '21293758700000020000001121100012100447561740';
      it('should throw an BadRequestException with the correct description', () => {
        expect(() => validator.transform(bankSlipBarCodeWithWrongCheckDigit, {} as any)).toThrow(
          new BadRequestException(EMessages.CHECKDIGIT_ERROR),
        );
      });
    });

    describe('when the value received has a wrong check digit', () => {
      const bankSlipBarCode = '21299758700000020000001121100012100447561740';
      it('should just return the value', () => {
        expect(() => validator.transform(bankSlipBarCode, {} as any)).not.toThrow(
          new BadRequestException(EMessages.CHECKDIGIT_ERROR),
        );

        expect(validator.transform(bankSlipBarCode, {} as any)).toBe(bankSlipBarCode);
      });
    });
  });
});
