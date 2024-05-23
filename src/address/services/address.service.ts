import { Injectable } from '@nestjs/common';
import { AddressRepository } from '../address.respository';
import { AddressDto } from 'src/database/DTO/address.dto';

@Injectable()
export class AddressService {
    constructor(private readonly addressRepository: AddressRepository) { 
        
    };

    async findAll() {
        console.log("Address service: findAll");
        return await this.addressRepository.findAll();
    };

    async findById(id: number) {
        return await this.addressRepository.findById(id);
    };

    async create(address: AddressDto) {
        return await this.addressRepository.create(address);
    };

    async update(id: number, address: any) {
        return await this.addressRepository.update(id, address);
    };

    async delete(id: number) {
        return await this.addressRepository.delete(id);
    };
};
