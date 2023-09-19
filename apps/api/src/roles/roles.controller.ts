import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from './entities/role.entity';
import { Role } from '@prisma/application';

@Controller('roles')
@ApiTags('Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiCreatedResponse({ type: RoleEntity })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const role = await this.rolesService.create(createRoleDto);

    return role;
  }

  @Get()
  @ApiOkResponse({ type: RoleEntity, isArray: true })
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Get(':role')
  @ApiOkResponse({ type: RoleEntity })
  async findOne(@Param('role') role: Role) {
    const roles = await this.rolesService.findOne(role);
    return roles;
  }

  @Patch(':role')
  @ApiOkResponse({ type: RoleEntity })
  async update(@Param('role') role: Role, @Body() updateRoleDto: UpdateRoleDto) {
    const roles = await this.rolesService.update(role, updateRoleDto);

    return roles;
  }

  @Delete(':role')
  async remove(@Param('role') role: Role) {
    const roles = await this.rolesService.remove(role);

    return roles;
  }
}
