import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty } from "class-validator";

export class CreateFeaturedDto {
    @ApiProperty({
        example: 'NPL',
        description:'Code of the country to be featured'
    })
    @IsNotEmpty()
    country_code: string;

    @ApiProperty({
        example: 'Nepal',
        description:'Name of the country to be featured'
    })
    @IsNotEmpty()
    details: string;
    
}
