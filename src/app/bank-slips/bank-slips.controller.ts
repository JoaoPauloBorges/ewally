import { ClassSerializerInterceptor, Get, Type, UseInterceptors } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BankSlipsService } from './bank-slips.service';
import { GetInfoFromDigitableLineDto } from './dto/get-info-from-digitable-line.dto';
import { NumericLineErrorResponseDto } from './validators/numeric-line.errors.dto';
import { NumericLineValidator } from './validators/numeric-line.validator';
import { DigitableLineCheckDigitsValidator } from './validators/digitable-line-check-digits.validator';

@Controller('boleto')
@ApiTags('Bank Slips')
export class BankSlipsController {
  constructor(private readonly service: BankSlipsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':barCode')
  @ApiOkResponse({
    status: 200,
    type: GetInfoFromDigitableLineDto,
    description: 'Returns the information associated with the barcode',
  })
  @ApiBadRequestResponse({
    description: 'Response when barcode received is invalid',
    type: NumericLineErrorResponseDto,
  })
  getBankSlipInfo(
    @Param('barCode', NumericLineValidator, DigitableLineCheckDigitsValidator)
    barCode: string,
  ): GetInfoFromDigitableLineDto {
    return this.service.retrieveInfo(barCode);
  }
}
