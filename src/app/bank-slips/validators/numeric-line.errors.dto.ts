import { ErrorResponseDto } from '@app/shared/errors/errorResponse.dto';
import { ApiResponseProperty } from '@nestjs/swagger';
import { EMessages } from './errorMessages.enum';

export class NumericLineErrorResponseDto extends ErrorResponseDto {
  @ApiResponseProperty({
    enum: EMessages,
  })
  message!: EMessages;
}
