import { Module } from '@nestjs/common';
import { CustomersController } from './controller/customers.controller';
import { CustomersService } from './services/customers.service';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerProviders } from './customer.provider';
import { CustomerRepository } from './customer.repository';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomerRepository,
    ...CustomerProviders
  ]
})

export class CustomersModule { 
  
}
