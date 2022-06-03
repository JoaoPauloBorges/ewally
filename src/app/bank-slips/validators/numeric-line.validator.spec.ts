import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EMessages } from './errorMessages.enum';
import { NumericLineValidator } from './numeric-line.validator';

describe('NumericLineValidator', () => {
  let validator: NumericLineValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NumericLineValidator],
    }).compile();

    validator = module.get<NumericLineValidator>(NumericLineValidator);
  });

  it('should be defined', () => {
    expect(validator).toBeDefined();
  });

  describe('Given an value intercepted', () => {
    describe('when the value received is a numeric value', () => {
      const value = '21290001192110001210904475617405975870000002000';
      it('should return the same value received', () => {
        expect(validator.transform(value, {} as any)).toBe<string>(value);
      });
    });

    describe('when the value received is a non-numeric value', () => {
      const value = 'as1233.23444dasdasd';
      it('should throw an BadRequestException with the correct description', () => {
        expect(() => validator.transform(value, {} as any)).toThrow(
          new BadRequestException(EMessages.NON_NUMERIC_VALUE),
        );
      });
    });

    describe('when the length of barcode is shorter then 47 characters', () => {
      const value = '212900011921100012';
      it('should throw an BadRequestException with the correct description', () => {
        expect(() => validator.transform(value, {} as any)).toThrowError(
          new BadRequestException(EMessages.LINE_SHORTER_THAN_EXPECTED),
        );
      });
    });

    describe('when the length of barcode is longer then 48 characters', () => {
      const value = '2129000119211000121090447561740597587000000200012333';
      it('should throw an BadRequestException with the correct description', () => {
        expect(() => validator.transform(value, {} as any)).toThrowError(
          new BadRequestException(EMessages.LINE_LONGER_THAN_EXPECTED),
        );
      });
    });
  });
});
