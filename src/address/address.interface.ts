import { Address } from "src/database/databaseModels/address.entity";
import { AddressDto } from "src/database/DTO/address.dto";
import { 
    InternalServerErrorException,
    HttpException
} from '@nestjs/common';

export interface IAddress {
    findAll(): Promise<object[] | InternalServerErrorException | HttpException>;
    findById(id: number): Promise<Address | InternalServerErrorException>;
    create(address: AddressDto): Promise<Address | InternalServerErrorException>;
    update(id: number, address: Address): Promise<Address | InternalServerErrorException>;
    delete(id: number): Promise<boolean>;
};