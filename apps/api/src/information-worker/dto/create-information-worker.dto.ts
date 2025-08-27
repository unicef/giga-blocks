import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class CreateInformationWorkerDto {
    @Transform(({ value }) => value.trim())
    @ApiProperty({
        example:'Joe',
        description:'Name of the information worker'
    })
    @IsOptional()
    name?:string;
    
    @Transform(({ value }) => value.trim())
    @ApiProperty({
        example:'did:1234567890',
        description:'DID of the information worker'
    })
    @IsNotEmpty()
    did:string;

    @Transform(({ value }) => value.trim())
    @ApiProperty({
        example:'joe@gmail.com',
        description:'valid email of the information worker'
    })
    @IsEmail()
    @IsNotEmpty()
    email:string;

}
