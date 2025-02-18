import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

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
    activatedBy: string
}

enum ACTIVE_STATUS {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}