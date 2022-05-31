import { Module } from '@nestjs/common';
import { BankSlipsService } from './bank-slips.service';
import { BankSlipsController } from './bank-slips.controller';

@Module({
  controllers: [BankSlipsController],
  providers: [BankSlipsService]
})
export class BankSlipsModule {}
