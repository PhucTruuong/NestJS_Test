import { Address } from 'src/database/databaseModels/address.entity';

export const AddressProviders = [{
    provide: 'ADDRESS_REPOSITORY',
    useValue: Address,
}];