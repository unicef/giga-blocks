import { Injectable, Logger } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class RolesService {
  private readonly _logger = new Logger(RolesService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    let role;
    try {
      role = await this.prisma.roles.create({ data: createRoleDto });
    } catch (error) {
      this._logger.error(`Error creating role ${createRoleDto.name}`);
      throw error;
    }
    return role;
  }

  async findAll() {
    const roles = await this.prisma.roles.findMany();
    return roles;
  }

  async findOne(name: Role) {
    const role = await this.prisma.roles.findUnique({ where: { name: name } });
    return role;
  }

  async update(name: Role, updateRoleDto: UpdateRoleDto) {
    let role;
    try {
      role = await this.prisma.roles.update({
        data: updateRoleDto,
        where: { name: name },
      });
    } catch (error) {
      this._logger.error(`Error updating role ${name}`);
      throw error;
    }
    return role;
  }

  async remove(name: Role) {
    let role;
    try {
      role = await this.prisma.roles.delete({ where: { name: name } });
    } catch (error) {
      this._logger.error(`Error deleting role ${name}`);
      throw error;
    }
    return role;
  }
}
