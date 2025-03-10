import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional } from 'class-validator';

export class ActivationLogDTO {
  @ApiProperty({
    description: 'Active status: ACTIVE or INACTIVE',
    example: 'ACTIVE',
    required: true,
  })
  @IsString()
  status: ACTIVE_STATUS;

  @ApiProperty({
    description: 'Start date of activation in ISO format',
    example: '2025-02-24T00:00:00.000Z',
    required: true,
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'End date of activation in ISO format',
    example: '2025-03-24T00:00:00.000Z',
    required: false,
  })
  @IsDateString()
  endDate: string;
}

enum ACTIVE_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
