import {
    IsNumber,
    IsNotEmpty,
    Length,
    IsString,
} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class NewRole {
    @IsNotEmpty()
    @Length(1, 50)
    @IsString()
    @ApiProperty()
    readonly role_name: string;

    @Length(1, 50)
    @IsString()
    @ApiProperty()
    readonly description: string;
};

export class RoleModified {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    readonly role_id: number;

    @Length(1, 50)
    @IsString()
    @ApiProperty({
        default: "",
    })
    readonly name: string;

    @Length(1, 50)
    @IsString()
    @ApiProperty({
        default: "",
    })
    readonly description: string;
};