import { Test, TestingModule } from '@nestjs/testing';
import { BankSlipsRetrieverService } from './bank-slips-retriver.service';
import { BankSlipsService } from './bank-slips.service';
import { BillRetrieverService } from './bill-retriever.service';

describe('BankSlipsService', () => {
  let service: BankSlipsService;
  let billService: BillRetrieverService;
  let bankSlipService: BankSlipsRetrieverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankSlipsService, BillRetrieverService, BankSlipsRetrieverService],
    }).compile();

    service = module.get<BankSlipsService>(BankSlipsService);
    billService = module.get<BillRetrieverService>(BillRetrieverService);
    bankSlipService = module.get<BankSlipsRetrieverService>(BankSlipsRetrieverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when calling retrieveInfo', () => {
    describe('Given an digitable line from a bank-slip type', () => {
      const digitableLine = '21290001192110001210904475617405975870000002000';
      it('should call the apropriet servevice to handle it', () => {
        const spyBankSlipService = jest
          .spyOn(bankSlipService, 'retrieveInfoFromDigitableLine')
          .mockImplementation();

        service.retrieveInfo(digitableLine);

        expect(spyBankSlipService).toBeCalled();
      });
    });
    describe('Given an digitable line from a bill type', () => {
      const digitableLine = '858200000260178601801205529544183860673925100017';
      it('should call the apropriet servevice to handle it', () => {
        const spyBillService = jest.spyOn(billService, 'retrieveInfoFromDigitableLine').mockImplementation();

        service.retrieveInfo(digitableLine);
        expect(spyBillService).toBeCalled();
      });
    });
  });
});
