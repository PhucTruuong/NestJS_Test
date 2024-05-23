import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AddressController } from './controller/address.controller';
import { AddressService } from './services/address.service';
import { AddressMiddleware } from './middleware/address.middleware';
import { DatabaseModule } from 'src/database/database.module';
import { AddressProviders } from './address.provider';
import { AddressRepository } from './address.respository';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [AddressController],
  providers: [
    AddressService,
    AddressRepository,
    ...AddressProviders
  ]
})

export class AddressModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AddressMiddleware)
      .forRoutes('address');
  };
};