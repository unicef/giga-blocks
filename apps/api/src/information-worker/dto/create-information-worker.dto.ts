import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateInformationWorkerDto {
    @ApiProperty({
        example:'Joe',
        description:'Name of the information worker'
    })
    @IsOptional()
    name?:string;

    @ApiProperty({
        example:'did:1234567890',
        description:'DID of the information worker'
    })
    @IsNotEmpty()
    did:string;

    @ApiProperty({
        example:'joe@gmail.com',
        description:'valid email of the information worker'
    })
    @IsNotEmpty()
    email:string;

}
