import { Module } from '@nestjs/common';
import { BankSlipsService } from './bank-slips.service';
import { BankSlipsController } from './bank-slips.controller';
import { BankSlipsRetrieverService } from './bank-slips-retriver.service';
import { BillRetrieverService } from './bill-retriever.service';

@Module({
  controllers: [BankSlipsController],
  providers: [BankSlipsService, BankSlipsRetrieverService, BillRetrieverService],
})
export class BankSlipsModule {}
