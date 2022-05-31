import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BankSlipsModule } from './bank-slips/bank-slips.module';

@Module({
  imports: [BankSlipsModule],
  controllers: [AppController],
})
export class AppModule {}
