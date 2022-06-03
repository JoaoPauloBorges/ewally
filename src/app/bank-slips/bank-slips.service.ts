import { Injectable } from '@nestjs/common';
import { BankSlipsRetrieverService } from './bank-slips-retriver.service';
import { BillRetrieverService } from './bill-retriever.service';
import { GetInfoFromDigitableLineDto } from './dto/get-info-from-digitable-line.dto';
import { InfoRetriver } from './info-retriever.interface';

@Injectable()
export class BankSlipsService {
  constructor(
    private billService: BillRetrieverService,
    private bankSlipService: BankSlipsRetrieverService,
  ) {}

  retrieveInfo(digitableLine: string): GetInfoFromDigitableLineDto {
    if (InfoRetriver.isBillType(digitableLine)) {
      return this.billService.retrieveInfoFromDigitableLine(digitableLine);
    }
    return this.bankSlipService.retrieveInfoFromDigitableLine(digitableLine);
  }
}
