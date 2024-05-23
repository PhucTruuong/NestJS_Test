import { Sequelize } from 'sequelize-typescript';
import { Address } from './databaseModels/address.entity';
import { Customer } from './databaseModels/customer.entity';
import { Role } from './databaseModels/role.entity';
import { CustomerAddress } from './databaseModels/customer_address.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from 'constant';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV as any) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }

      const sequelize = new Sequelize(config);
      sequelize.addModels([
        Address, 
        Customer, 
        CustomerAddress,
        Role
      ]);
      //await sequelize.sync({force: true});
      return sequelize;
    },
  },
];
