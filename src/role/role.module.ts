import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RoleController } from './controller/role.controller';
import { RoleService } from './service/role.service';
import { RoleProviders } from './role.provider';
import { RoleRespository } from './role.repository';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [RoleController],
    providers: [
        RoleService,
        RoleRespository,
        ...RoleProviders
    ]
})

export class RoleModule {

}
