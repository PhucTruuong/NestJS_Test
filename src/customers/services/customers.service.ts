import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../customer.repository';
import { CustomerPaginationDto, CustomerModifiedDto } from 'src/database/DTO/customer.dto';

@Injectable()
export class CustomersService {
    constructor(private readonly customerRepository: CustomerRepository) {};

    async findAll() {
        console.log("Customer service: findAll");
        return await this.customerRepository.findAll();
    };

    async findById(id: number) {
        return await this.customerRepository.findById(id);
    };

    async create(customer: any) {
        return await this.customerRepository.create(customer);
    };

    async update(customer: CustomerModifiedDto) {
        return await this.customerRepository.update(customer);
    };

    async delete(id: number) {
        return await this.customerRepository.delete(id);
    };

    async findAllPaginated(input: CustomerPaginationDto) {
        return await this.customerRepository.findAllPaginated(input);
    };
}
