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
    description: 'Activated by name',
    example: 'John Doe',
    required: true,
  })
  @IsString()
  activatedBy: string;

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
  @IsOptional()
  endDate?: string;
}

enum ACTIVE_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
