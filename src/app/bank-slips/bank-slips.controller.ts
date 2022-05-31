import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BankSlipsService } from './bank-slips.service';

@Controller('boleto')
@ApiTags('Bank Slips')
export class BankSlipsController {
  constructor(private readonly bankSlipsService: BankSlipsService) {}

  @Get(':barCode')
  async asdj(@Param('barCode') barCode: string) {
    return barCode;
  }
}
