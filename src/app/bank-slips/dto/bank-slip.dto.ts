import { ApiResponseProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class BankSlipsDto {
  constructor(partial?: Partial<BankSlipsDto>) {
    Object.assign(this, partial);
  }

  @ApiResponseProperty({ example: '21299758700000020000001121100012100447561740' })
  barCode!: string;

  @ApiResponseProperty({ example: '24.00' })
  amount!: number;

  @Transform(({ value }: { value: Date }) => value.toISOString().split('T')[0])
  @ApiResponseProperty({ example: '2022-05-30' })
  expirationDate!: Date;
}
