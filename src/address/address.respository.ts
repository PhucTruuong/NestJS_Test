import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Inject
} from '@nestjs/common';
import { Address } from 'src/database/databaseModels/address.entity';
import { IAddress } from './address.interface';
import { AddressDto } from 'src/database/DTO/address.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AddressRepository implements IAddress {
    constructor(
        @Inject('ADDRESS_REPOSITORY')
        private readonly addressModel: typeof Address,
    ) {

    };

    async findAll(): Promise<object[] | InternalServerErrorException> {
        try {
            const allAddress = await this.addressModel.findAll({
                limit: 3,
            });
            
            console.log("all address: ", allAddress);

            if (!allAddress) {
                return new HttpException('No address found!', HttpStatus.NOT_FOUND);
            } else {
                return allAddress;
            }
        } catch (error) {
            return new InternalServerErrorException("Error creating address", error)
        };
    };

    async findById(id: number): Promise<Address | null> {
        return await this.addressModel.findByPk(id);
    };

    async create(address: AddressDto): Promise<Address | InternalServerErrorException> {
        try {
            const newAddress = await this.addressModel.create({
                dc_id: Math.floor(Math.random() * 1000000) + 1,
                ...address,
                rid: uuidv4(),
                cpnh: new Date(),
            });

            if (!newAddress) {
                return null;
            } else {
                return newAddress;
            };
        } catch (error) {
            return new InternalServerErrorException("Error creating address", error)
        }
    };

    async update(id: number, address: Address): Promise<Address | null> {
        const [numberOfAffectedRows, [updatedAddress]] = await this.addressModel.update(address, { where: { id }, returning: true });
        return numberOfAffectedRows > 0 ? updatedAddress : null;
    };

    async delete(id: number): Promise<boolean> {
        const deletedAddress = await this.addressModel.destroy({ where: { id } });
        return deletedAddress > 0;
    };
}