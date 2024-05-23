import { Customer } from "src/database/databaseModels/customer.entity";

export const CustomerProviders = [{
    provide: 'CUSTOMER_REPOSITORY',
    useValue: Customer,
}];