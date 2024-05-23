import { Customer } from "src/database/databaseModels/customer.entity";
import { 
    InternalServerErrorException,
    HttpException,
    NotFoundException
} from '@nestjs/common';
import { CustomerPaginationDto, CustomerModifiedDto } from "src/database/DTO/customer.dto";

export interface ICustomer {
    findAll(): Promise<object[] | InternalServerErrorException | HttpException>;
    findById(id: number): Promise<object | InternalServerErrorException>;
    create(customer: Customer): Promise<Customer | InternalServerErrorException>;
    update(customer: CustomerModifiedDto): Promise<boolean | InternalServerErrorException>;
    delete(id: number): Promise<boolean | InternalServerErrorException | NotFoundException>;
    findAllPaginated(input: CustomerPaginationDto): Promise<{
        data: object[], 
        totalCount: number
    } | InternalServerErrorException | HttpException>;
};