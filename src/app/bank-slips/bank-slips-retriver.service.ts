import { Utils } from '@app/shared/utils.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GetInfoFromDigitableLineDto } from './dto/get-info-from-digitable-line.dto';
import { InfoRetriver } from './info-retriever.interface';
import { BankSlip } from './entities/bank-slip';
import { EMessages } from './validators/errorMessages.enum';

@Injectable()
export class BankSlipsRetrieverService extends InfoRetriver {
  retrieveInfoFromDigitableLine(digitableLine: string): GetInfoFromDigitableLineDto {
    const bankCode = digitableLine.slice(0, 3);
    const currencyCode = digitableLine[3];

    const from20to24 = digitableLine.slice(4, 9);
    const from25to34 = digitableLine.slice(10, 20);
    const from35to44 = digitableLine.slice(21, 31);

    const checkDigit = digitableLine[32];

    const dueDateFactor = digitableLine.slice(33, 37);
    const amount = digitableLine.slice(37);

    const bankSlip = new BankSlip({
      bankCode,
      currencyCode,
      checkDigit,
      dueDateFactor,
      amount,
      freeField: from20to24 + from25to34 + from35to44,
    });

    const barCode = bankCode + currencyCode + checkDigit + dueDateFactor + amount + bankSlip.freeField;

    this.validateBarCodeCheckDigit(barCode);

    return new GetInfoFromDigitableLineDto({
      amount: bankSlip.getValue(),
      barCode,
      expirationDate: bankSlip.getDueDate(),
    });
  }

  validateBarCodeCheckDigit(barCode: string) {
    const barCodeWithoutCheckDigit = [...barCode.slice(0, 4), ...barCode.slice(5)];
    try {
      Utils.validateCheckDigitMod11(barCodeWithoutCheckDigit, barCode[4]);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new BadRequestException(EMessages.BARCODE_CHECKDIGIT_ERROR);
      }
    }
  }
}
