import { Utils } from '@app/shared/utils.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GetInfoFromDigitableLineDto } from './dto/get-info-from-digitable-line.dto';
import { InfoRetriver } from './info-retriever.interface';
import { EMessages } from './validators/errorMessages.enum';
import { Bills } from './entities/bills';

@Injectable()
export class BillRetrieverService extends InfoRetriver {
  retrieveInfoFromDigitableLine(digitableLine: string): GetInfoFromDigitableLineDto {
    const field1 = digitableLine.slice(0, 11);
    const field2 = digitableLine.slice(12, 23);
    const field3 = digitableLine.slice(24, 35);
    const field4 = digitableLine.slice(36, 47);

    const barCode = field1 + field2 + field3 + field4;

    this.validateBarCodeCheckDigit(barCode);

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

    return new GetInfoFromDigitableLineDto({
      amount: bill.getValue(),
      barCode,
    });
  }

  validateBarCodeCheckDigit(barCode: string) {
    const barCodeWithoutCheckDigit = [...barCode.slice(0, 3), ...barCode.slice(4)];
    try {
      Utils.validateCheckDigitMod11(barCodeWithoutCheckDigit, barCode[3], true);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new BadRequestException(EMessages.BARCODE_CHECKDIGIT_ERROR);
      }
    }
  }
}
