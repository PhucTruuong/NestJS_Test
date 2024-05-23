import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Inject,
    NotFoundException
} from '@nestjs/common';
import { Role } from 'src/database/databaseModels/role.entity';
import { IRole } from './role.interface';
import { NewRole } from 'src/database/DTO/role.dto';
import { RoleModified } from 'src/database/DTO/role.dto';

@Injectable()
export class RoleRespository implements IRole {
    constructor(
        @Inject('ROLE_REPOSITORY')
        private readonly roleModel: typeof Role,
    ) { };

    public async findAll(): Promise<object[] | InternalServerErrorException | HttpException> {
        try {
            const allRoles = await this.roleModel.findAll({
                attributes: [
                    'role_id',
                    'role_name',
                    'role_description',
                ],
            });

            if (!allRoles) {
                return new HttpException('No role found!', HttpStatus.NOT_FOUND);
            } else {
                return allRoles;
            }
        } catch (error) {
            throw new InternalServerErrorException("Error fetching roles", error)
        };
    };

    public async findById(id: number): Promise<object | InternalServerErrorException | NotFoundException> {
        try {
            const role = await this.roleModel.findByPk(id);

            if (!role) {
                return new NotFoundException(`Role with id ${id} not found!`);
            } else {
                return role;
            }
        } catch (error) {
            throw new InternalServerErrorException("Error fetching role", error)
        };
    };

    public async createRole(role: NewRole): Promise<Role | InternalServerErrorException> {
        // try {
            const newRole = await this.roleModel.create({
                role_name: role.role_name,
                description: role.description
            });

            return newRole;
        // } catch (error) {
        //     throw new InternalServerErrorException("Error creating role", error)
        // };
    };

    public async updateRoleById(role: RoleModified): Promise<boolean | InternalServerErrorException | NotFoundException> {
        try {
            const updatedRole = await this.roleModel.update(
                {
                    role_name: role.name,
                    description: role.description
                },
                {
                    where: {
                        role_id: role.role_id
                    }
                }
            );

            if (updatedRole[0] < 1) {
                return new NotFoundException(`Role with id ${role.role_id} not found!`);
            };
            
            return true;
        } catch (error) {
            throw new InternalServerErrorException("Error updating role", error)
        };
    };
};
