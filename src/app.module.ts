import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerAddressController } from './customer_address/controller/customer_address.controller';
import { CustomerAddressService } from './customer_address/services/customer_address.service';
import { CustomerAddressModule } from './customer_address/customer_address.module';
import { StandardResponseModule } from 'nest-standard-response';
import { CustomersModule } from './customers/customers.module';
import { RouterModule } from '@nestjs/core';
// import { RoleController } from './role/controller/role.controller';
// import { RoleService } from './role/service/role.service';
import { RoleModule } from './role/role.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StandardResponseModule.forRoot({}),
    RouterModule.register([
      {
        path: 'api/customers',
        module: CustomersModule,
      },
      {
        path: 'api/role',
        module: RoleModule,
      },
    ]),
    DatabaseModule,
    AddressModule,
    CustomerAddressModule,
    CustomersModule,
    RoleModule
  ],
  controllers: [
    AppController,
    CustomerAddressController,
  ],
  providers: [
    AppService,
    CustomerAddressService,
  ],
})

export class AppModule {
  constructor() {
    console.log('AppModule loaded');
  };
};