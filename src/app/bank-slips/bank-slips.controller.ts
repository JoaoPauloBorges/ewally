import { ClassSerializerInterceptor, Get, Type, UseInterceptors } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BankSlipsService } from './bank-slips.service';
import { BankSlipsDto } from './dto/bank-slip.dto';
import { BillCheckDigitValidator } from './validators/bill-check-digit.validator';
import { BankSlipCheckDigitValidator } from './validators/bank-slip-check-digit.validator';
import { NumericLineErrorResponseDto } from './validators/numeric-line.errors.dto';
import { NumericLineValidator } from './validators/numeric-line.validator';

@Controller('boleto')
@ApiTags('Bank Slips')
export class BankSlipsController {
  constructor(private readonly bankSlipsService: BankSlipsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':barCode')
  @ApiOkResponse({
    status: 200,
    type: BankSlipsDto,
    description: 'Returns the information associated with the barcode',
  })
  @ApiBadRequestResponse({
    description: 'Response when barcode received is invalid',
    type: NumericLineErrorResponseDto,
  })
  getBankSlipInfo(
    @Param('barCode', NumericLineValidator, BankSlipCheckDigitValidator, BillCheckDigitValidator)
    barCode: string,
  ): BankSlipsDto {
    return this.bankSlipsService.retrieveInfoFromBarCode(barCode);
  }
}
