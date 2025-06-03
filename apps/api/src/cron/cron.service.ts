import { Injectable } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.service';

@Injectable()
export class CronService {
    constructor(private readonly _prismaService: PrismaAppService) {}

    async updateLinks() {
        const date = new Date();
        await this._prismaService.activationLog.updateMany({
            where:{
                startDate:{lte: date},
                manually_inactivated: false,
            },
            data:{
                status:'ACTIVE',
            }
        })

        await this._prismaService.activationLog.updateMany({
            where:{
                endDate:{lte: date},
                OR:[
                    {status: 'ACTIVE'},
                    {status: 'INACTIVE'}
                ]
            },
            data:{
                status:'EXPIRED',
            }
        })

    }
}
