import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { ActivationLogDTO } from './dto/create-activation-log.dto';

@Injectable()
export class LinkactivationService {
    constructor(private readonly prisma: PrismaAppService) {}

    async activateLink(data:ActivationLogDTO){
        const activation = await this.prisma.activationLog.findFirst({
              orderBy: {
                createdAt: 'desc',
              },
            });
            const date = new Date();
            if(activation?.endDate >= date) throw new ConflictException('Link already activated!');
        
            return this.prisma.activationLog.create({
              data: {
                status: data.status,
                activatedBy: data.activatedBy,
                startDate: data.startDate,
                endDate: data?.endDate || null,
              },
            });

    }

    async getLatestActivation(){
        return this.prisma.activationLog.findFirst({
            orderBy: {
              createdAt: 'desc',
            },
          });
    }

    async getActivation(uuid: string){
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

    async validateLink(uuid: string){
        const date = new Date();
        const data = await this.prisma.activationLog.findUnique({
              where: {
                id: uuid,
              },
            });
        
        if(data?.endDate >= date) return true;
        return false;
    }
}
