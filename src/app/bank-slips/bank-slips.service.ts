import { Injectable } from '@nestjs/common';
import { BankSlip } from './bank-slip';
import { Bills } from './bills';
import { BankSlipsDto } from './dto/bank-slip.dto';

@Injectable()
export class BankSlipsService {
  retrieveInfoFromBarCode(barCode: string): BankSlipsDto {
    if (this.isBillPayment(barCode)) {
      return this.retrieveBillInfoFromBarCode(barCode);
    }
    return this.retrieveBankSlipInfoFromBarCode(barCode);
  }

  private isBillPayment(barCode: string) {
    return barCode[0] === '8';
  }

  private retrieveBankSlipInfoFromBarCode(barCode: string): BankSlipsDto {
    const bankSlip = new BankSlip({
      bankCode: barCode.slice(0, 3),
      currencyCode: barCode[3],
      CheckDigit: barCode[4],
      dueDateFactor: barCode.slice(5, 9),
      value: barCode.slice(9, 19),
      freeField: barCode.slice(18),
    });

    // console.log('BARCODE', barCode, '\n', bankSlip);
    return new BankSlipsDto({
      amount: bankSlip.getValue(),
      barCode,
      expirationDate: bankSlip.getDueDate(),
    });
  }

  private retrieveBillInfoFromBarCode(barCode: string): BankSlipsDto {
    const bill = new Bills({
      product: barCode[0],
      segment: barCode[1],
      flagEffectiveValueOrReference: barCode[2],
      checkDigit: barCode[3],
      value: barCode.slice(4, 15),
      company: barCode.slice(15, 19),
      cnpjOrMF: barCode.slice(15, 23),
      freeField: barCode.slice(22),
    });

    return new BankSlipsDto({
      amount: bill.getValue(),
      barCode,
    });
  }
}
