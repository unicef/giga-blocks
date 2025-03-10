import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { ActivationLogDTO } from './dto/create-activation-log.dto';

@Injectable()
export class LinkactivationService {
  constructor(private readonly prisma: PrismaAppService) {}

  async createLink(data: ActivationLogDTO,userId:string) {
  
    const date = new Date();

    return this.prisma.activationLog.create({
      data: {
        status: data.status,
        activatedBy: userId,
        startDate: data.startDate,
        endDate: data?.endDate || null,
      },
    });
  }

  async listLinks() {
    return this.prisma.activationLog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getActivation(uuid: string) {
    const data = this.prisma.activationLog.findUnique({
      where: {
        id: uuid,
      },
    });

    if (!data) {
      throw new NotFoundException('Activation ID not found;');
    }

    return data;
  }

  async validateLink(uuid: string) {
    const date = new Date();
    const data = await this.prisma.activationLog.findUnique({
      where: {
        id: uuid,
      },
    }); 
    if(!data) throw new NotFoundException('Invalid Link');
    if (data?.endDate >= date && data?.status == 'ACTIVE') return true;
    await this.prisma.activationLog.update({
      where: {
        id: uuid,
      },
      data: {
        status: 'EXPIRED',
      },
    })
    return false;
  }

  async deactivateLink(uuid: string, userId: string) {

    return this.prisma.activationLog.update({
      where: {
        id: uuid,
      },
      data: {
        status: 'INACTIVE',
        deActivatedBy: userId,
      },
    });
  }
}
