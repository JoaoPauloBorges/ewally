import { ClassSerializerInterceptor, Get, UseInterceptors } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BankSlipsService } from './bank-slips.service';
import { BankSlipsDto } from './dto/bank-slip.dto';

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
    description: 'Invalid bar code',
  })
  getBankSlipInfo(@Param('barCode') barCode: string): BankSlipsDto {
    return new BankSlipsDto({ amount: 1, barCode, expirationDate: new Date() });
  }
}
