import { 
    Controller, 
    Get, 
    Param, 
    Body, 
    Post, 
    Patch,
    ValidationPipe,
    UsePipes
} from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { NewRole, RoleModified } from 'src/database/DTO/role.dto';
import { StandardResponse } from 'nest-standard-response';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { 
    InternalServerErrorException,
    HttpException,
    NotFoundException
} from '@nestjs/common';

@ApiTags('Role')
@Controller('')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get('/all-roles')
    async findAll() {
        const allRoles = await this.roleService.findAll();
        if (allRoles instanceof InternalServerErrorException || 
            allRoles instanceof HttpException
        ) {
            return allRoles as HttpException | InternalServerErrorException;
        }
        return allRoles;
    };

    @Get('/:id')
    @StandardResponse()
    async findById(@Param('id') id: number) {
        const role = await this.roleService.findById(id);
        if (role instanceof InternalServerErrorException || 
            role instanceof NotFoundException
        ) {
            return role as NotFoundException | InternalServerErrorException;
        } else {
            return role;
        }
    };

    @Post('/new-role')
    
    @ApiBody({ type: NewRole })
    async createRole(@Body() role: NewRole) {
        const newRole = this.roleService.createRole(role);
        if (newRole instanceof InternalServerErrorException) {
            return newRole;
        } else {
            return newRole;
        }
    };

    @Patch('/role-modified')
    @StandardResponse()
    @UsePipes(new ValidationPipe({ 
        transform: true,
        skipMissingProperties: true
    }))
    @ApiBody({ type: RoleModified })
    async updateRoleById(@Body() role: RoleModified) {
        const updatedRole = this.roleService.updateRoleById(role);
        if (updatedRole instanceof InternalServerErrorException || 
            updatedRole instanceof NotFoundException
        ) {
            return updatedRole as NotFoundException | InternalServerErrorException;
        } else {
            return 'Role updated successfully!'
        }
    };
}
