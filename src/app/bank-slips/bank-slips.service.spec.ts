import { Test, TestingModule } from '@nestjs/testing';
import { BankSlipsRetrieverService } from './bank-slips-retriver.service';
import { BankSlipsService } from './bank-slips.service';
import { BillRetrieverService } from './bill-retriever.service';

describe('BankSlipsService', () => {
  let service: BankSlipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankSlipsService, BillRetrieverService, BankSlipsRetrieverService],
    }).compile();

    service = module.get<BankSlipsService>(BankSlipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
