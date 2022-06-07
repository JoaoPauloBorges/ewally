import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BillRetrieverService } from './bill-retriever.service';
import { GetInfoFromDigitableLineDto } from './dto/get-info-from-digitable-line.dto';
import { EMessages } from './validators/errorMessages.enum';

describe('BillRetrieverService', () => {
  let service: BillRetrieverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillRetrieverService],
    }).compile();

    service = module.get<BillRetrieverService>(BillRetrieverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When calling validateBarCodeCheckDigit', () => {
    const barCode = '83620000003808800090466267200522000010830911';
    describe('should throw an exception with the correct message descriptio', () => {
      it('should', () => {
        expect(() => service.validateBarCodeCheckDigit(barCode)).toThrow(
          new BadRequestException(EMessages.BARCODE_CHECKDIGIT_ERROR),
        );
      });
    });
  });

  describe('When calling retrieveInfoFromDigitableLine', () => {
    describe('with a valid digitable line', () => {
      const digitableLine = '836900000032808800090462626720052200000108309113';
      it('should call validate the barcode checkdigit and return the an instance of GetInfoFromDigitableLineDto with the correct data', () => {
        const validationMethodMock = jest.spyOn(service, 'validateBarCodeCheckDigit').mockImplementation();

        expect(service.retrieveInfoFromDigitableLine(digitableLine)).toEqual({
          amount: 380.88,
          barCode: '83690000003808800090466267200522000010830911',
        } as GetInfoFromDigitableLineDto);
        expect(validationMethodMock).toBeCalled();
      });
    });
  });
});
