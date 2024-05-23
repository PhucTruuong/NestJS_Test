import { Role } from "src/database/databaseModels/role.entity";

export const RoleProviders = [{
    provide: 'ROLE_REPOSITORY',
    useValue: Role,
}];