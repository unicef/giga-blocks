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
    return await this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOkResponse({ type: RoleEntity, isArray: true })
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Get(':role')
  @ApiOkResponse({ type: RoleEntity })
  async findOne(@Param('role') role: Role) {
    return await this.rolesService.findOne(role);
  }

  @Patch(':role')
  @ApiOkResponse({ type: RoleEntity })
  async update(@Param('role') role: Role, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.rolesService.update(role, updateRoleDto);
  }

  @Delete(':role')
  async remove(@Param('role') role: Role) {
    return await this.rolesService.remove(role);
  }
}
