import { Role } from "src/database/databaseModels/role.entity";
import { 
    InternalServerErrorException,
    HttpException,
    NotFoundException
} from '@nestjs/common';
import { NewRole } from "src/database/DTO/role.dto";
import { RoleModified } from "src/database/DTO/role.dto";

export interface IRole {
    findAll(): Promise<object[] | InternalServerErrorException | HttpException>;
    findById(id: number): Promise<object | InternalServerErrorException | NotFoundException>;
    createRole(role: NewRole): Promise<Role | InternalServerErrorException>;
    updateRoleById(role: RoleModified): Promise<boolean | InternalServerErrorException | NotFoundException>;
};