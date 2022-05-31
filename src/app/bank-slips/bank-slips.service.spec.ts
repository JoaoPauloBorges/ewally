import { Test, TestingModule } from '@nestjs/testing';
import { BankSlipsService } from './bank-slips.service';

describe('BankSlipsService', () => {
  let service: BankSlipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankSlipsService],
    }).compile();

    service = module.get<BankSlipsService>(BankSlipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
