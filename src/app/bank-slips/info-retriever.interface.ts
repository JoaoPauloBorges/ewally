import { GetInfoFromDigitableLineDto } from './dto/get-info-from-digitable-line.dto';

export abstract class InfoRetriver {
  static isBillType(digitableLine: string) {
    return digitableLine[0] === '8' && digitableLine.length === 48;
  }
  abstract retrieveInfoFromDigitableLine(digitableLine: string): GetInfoFromDigitableLineDto;
  abstract validateBarCodeCheckDigit(barCode: string);
}
