import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Inject,
    NotFoundException
} from '@nestjs/common';
import { Customer } from 'src/database/databaseModels/customer.entity';
import { ICustomer } from './customer.interface';
import { CustomerAddress } from 'src/database/databaseModels/customer_address.entity';
import { CustomerPaginationDto, CustomerModifiedDto } from 'src/database/DTO/customer.dto';

@Injectable()
export class CustomerRepository implements ICustomer {
    constructor(
        @Inject('CUSTOMER_REPOSITORY')
        private readonly customerModel: typeof Customer,
    ) { };

    public async findAll(): Promise<object[] | InternalServerErrorException | HttpException> {
        try {
            const allCustomers = await this.customerModel.findAll({
                attributes: [
                    'kh_id',
                    'th', 'tl', 'tc',
                    //[this.customerModel.sequelize.fn('COUNT', this.customerModel.sequelize.col('kh_id')), 'total_addresses']
                ],
                include: [
                    {
                        model: CustomerAddress,
                        as: 'customer_addresses',
                        attributes: ['ldc', 'updated_date'],
                        required: true,
                    },
                ],
                limit: 10,
            });

            const formattedCustomers = allCustomers.map(customer => ({
                cutomer_id: customer.kh_id,
                full_name: `${customer.th} ${customer.tl} ${customer.tc}`,
                customer_addresses: customer.customer_addresses.map(address => ({
                    address_type: address.ldc,
                    updated_date: address.updated_date,
                })),
            }));

            //console.log("all customer: ", formattedCustomers);

            if (!allCustomers) {
                return new HttpException('No customer found!', HttpStatus.NOT_FOUND);
            } else {
                return formattedCustomers;
            }
        } catch (error) {
            throw new InternalServerErrorException("Error fetching customers", error)
        };
    };

    public async findById(id: number): Promise<object | InternalServerErrorException> {
        try {
            console.log("id: ", id);
            const customer = await this.customerModel.findOne({
                attributes: [
                    'kh_id',
                    'th', 
                    'tl', 
                    'tc',
                    'changed_date',
                ],
                include: [
                    {
                        model: CustomerAddress,
                        as: 'customer_addresses',
                        attributes: ['ldc', 'updated_date'],
                        required: false,
                    },
                ],
                where: {
                    kh_id: id,
                },
            });

            console.log("customer: ", customer.dataValues);

            const formattedCustomer = {
                kh_id: customer.kh_id,
                full_name: `${customer.th} ${customer.tl} ${customer.tc}`,
                update_at: customer.changed_date,
                customer_addresses: customer.customer_addresses || [],
            };

            if (!customer) {
                return new HttpException('No customer found!', HttpStatus.NOT_FOUND);
            } else {
                return formattedCustomer;
            };
        } catch (error) {
            return new InternalServerErrorException("Error fetching customer", error)
        };
    };

    public async create(customer: Customer): Promise<Customer | InternalServerErrorException> {
        try {
            const newCustomer = await this.customerModel.create({
                dc_id: Math.floor(Math.random() * 1000000) + 1,
                ...customer,
            });

            if (!newCustomer) {
                return null;
            } else {
                return newCustomer;
            };
        } catch (error) {
            return new InternalServerErrorException("Error creating customer", error)
        }
    };

    public async update(customer: CustomerModifiedDto):
        Promise<boolean | InternalServerErrorException | NotFoundException> {
        try {
            console.log("customer: ", customer);
            const customerExist = await this.customerModel.findOne({
                where: { kh_id: customer.kh_id }
            });

            console.log("This datetime: ", new Date().toISOString());
            console.log("customer exist: ", customerExist.dataValues);

            const utcDate = new Date(new Date().toISOString());

            const updateCustomer = await this.customerModel.update(
                {
                    td: customer.td,
                    th: customer.th,
                    tl: customer.tl,
                    tc: customer.tc,
                    surffix: customer.surffix,
                    companyName: customer.companyName,
                    email: customer.email,
                    phone: customer.phone,
                    changed_date: utcDate,
                },
                {
                    where: {
                        kh_id: customer.kh_id,
                    },
                },
            );

            console.log("update customer: ", updateCustomer);

            if (updateCustomer[0] < 1) {
                return new NotFoundException("Customer not found");
            } else {
                return true;
            };
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    };

    public async delete(id: number): Promise<boolean | InternalServerErrorException> {
        try {
            const deleteCustomer = await this.customerModel.destroy({
                where: {
                    dc_id: id,
                },
            });

            if (!deleteCustomer) {
                return false;
            } else {
                return true;
            };
        } catch (error) {
            return new InternalServerErrorException("Error deleting customer", error)
        }
    };

    public async findAllPaginated(input: CustomerPaginationDto): Promise<
        {
            data: object[],
            totalCount: number
        } | InternalServerErrorException | HttpException
    > {
        try {
            const { count, rows: allCustomers } = await this.customerModel.findAndCountAll({
                attributes: [
                    'kh_id',
                    'th', 'tl', 'tc',
                ],
                include: [
                    {
                        model: CustomerAddress,
                        as: 'customer_addresses',
                        attributes: ['ldc', 'updated_date'],
                        required: true,
                    },
                ],
                limit: input.limit,
                offset: (input.page - 1) * input.limit,
            });

            if (!allCustomers || count === 0) {
                return { data: [], totalCount: 0 };
            }

            const numberOfPage = Math.ceil(count / input.limit);

            const formattedCustomers = allCustomers.map(customer => ({
                customer_id: customer.kh_id,
                full_name: `${customer.th} ${customer.tl} ${customer.tc}`,
                customer_addresses: customer.customer_addresses.map(address => ({
                    address_type: address.ldc,
                    updated_date: address.updated_date,
                })),
            }));

            return { data: formattedCustomers, totalCount: numberOfPage };
        } catch (error) {
            throw new InternalServerErrorException("Error fetching customers", error);
        }
    };
}