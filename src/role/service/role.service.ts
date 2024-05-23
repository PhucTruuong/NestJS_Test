import { Injectable } from '@nestjs/common';
import { RoleRespository } from '../role.repository';

@Injectable()
export class RoleService {
    constructor(private readonly roleRepository: RoleRespository) {};

    async findAll() {
        return await this.roleRepository.findAll();
    };

    async findById(id: number) {
        return await this.roleRepository.findById(id);
    };

    async createRole(role: any) {
        return await this.roleRepository.createRole(role);
    };

    async updateRoleById(role: any) {
        return await this.roleRepository.updateRoleById(role);
    };
}
