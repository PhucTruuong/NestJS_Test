import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDto {
    @IsString()
    @IsNotEmpty()
    dc1: string;

    @IsString()
    dc2: string;

    @IsString()
    @IsNotEmpty()
    tp: string;

    @IsString()
    @IsNotEmpty()
    tt: string;

    @IsString()
    @IsNotEmpty()
    dn: string;

    @IsString()
    @IsNotEmpty()
    mbc: string;
}