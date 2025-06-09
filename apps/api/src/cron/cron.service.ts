import { Injectable } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.service';

@Injectable()
export class CronService {
  constructor(private readonly _prismaService: PrismaAppService) {}

  private toDateOnly(date: Date | string) {
    const d = new Date(date);
    const localYear = d.getFullYear();
    const localMonth = d.getMonth();
    const localDay = d.getDate();
    return new Date(Date.UTC(localYear, localMonth, localDay));
  }

  async updateLinks() {
    const date = this.toDateOnly(new Date());
    await this._prismaService.activationLog.updateMany({
      where: {
        startDate: { lte: date },
        manually_inactivated: false,
      },
      data: {
        status: 'ACTIVE',
      },
    });

    await this._prismaService.activationLog.updateMany({
      where: {
        endDate: { lt: date },
        OR: [{ status: 'ACTIVE' }, { status: 'INACTIVE' }],
      },
      data: {
        status: 'EXPIRED',
      },
    });
  }
}
