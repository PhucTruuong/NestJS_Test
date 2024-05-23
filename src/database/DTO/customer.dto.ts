import { 
    IsNumber, 
    IsNotEmpty, 
    Length, 
    IsEmail, 
    IsString,
    IsNumberString
} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CustomerPaginationDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly page: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly limit: number;
};

export class CustomerModifiedDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly kh_id: number;

    @Length(1, 8)
    @IsString()
    @ApiProperty({
        default: "",
    })
    readonly td: string;

    @Length(1, 50)
    @IsString()
    @ApiProperty({
        default: "",
    })
    readonly th: string;

    @Length(1, 50)
    @ApiProperty({
        default: "",
    })
    readonly tl: string;

    @Length(1, 50)
    @ApiProperty({
        default: "",
    })
    readonly tc: string;

    @Length(1, 10)
    @ApiProperty({
        default: "",
    })
    readonly surffix: string;

    @Length(1, 128)
    @ApiProperty({
        default: "",
    })
    readonly companyName: string;

    @IsEmail()
    @Length(1, 50)
    @ApiProperty({
        default: "",
    })
    readonly email: string;

    @IsNumberString()
    @Length(1, 25)
    @ApiProperty({
        default: "",
    })
    readonly phone: string;
};