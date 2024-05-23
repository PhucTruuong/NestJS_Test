import { Controller, Get } from '@nestjs/common';
import { AddressService } from '../services/address.service';
//import { AddressDto } from 'src/database/DTO/address.dto';
//import { Address } from 'src/database/databaseModels/address.entity';
import { 
    InternalServerErrorException,
    HttpException
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Address')
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Get('/all-addresses')
    async findAll(): Promise<object[] | InternalServerErrorException | HttpException> {
        console.log("Address controller: findAll");
        return this.addressService.findAll();
    };
}
