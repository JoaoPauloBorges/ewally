import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BankSlipsRetrieverService } from './bank-slips-retriver.service';
import { EMessages } from './validators/errorMessages.enum';

describe('BankSlipsRetrieverService', () => {
  let service: BankSlipsRetrieverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankSlipsRetrieverService],
    }).compile();

    service = module.get<BankSlipsRetrieverService>(BankSlipsRetrieverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When calling validateBarCodeCheckDigit', () => {
    const barCode = '21293758700000020000001121100012100447561740';
    describe('should throw an exception', () => {
      describe('should throw an exception with the correct message descriptio', () => {
        it('should', () => {
          expect(() => service.validateBarCodeCheckDigit(barCode)).toThrow(
            new BadRequestException(EMessages.BARCODE_CHECKDIGIT_ERROR),
          );
        });
      });
    });
  });

  describe('When calling retrieveInfoFromDigitableLine', () => {
    describe('with a valid digitable line', () => {
      const digitableLine = '21290001192110001210904475617405975870000002000';
      it('should call validate the barcode checkdigit and return the an instance of GetInfoFromDigitableLineDto with the correct data', () => {
        const validationMethodMock = jest.spyOn(service, 'validateBarCodeCheckDigit').mockImplementation();

        const result = service.retrieveInfoFromDigitableLine(digitableLine);
        const expirationDate = new Date('July 16, 2018');

        expect(result).toEqual({
          amount: 20,
          barCode: '21299758700000020000001121100012100447561740',
          expirationDate,
        });
        expect(validationMethodMock).toBeCalled();
      });
    });
  });
});
