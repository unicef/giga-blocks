import { Injectable } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.service';
import  {arweave} from '../utils/arweave/config/arweaveNetwork';
import {key} from '../utils/arweave/constants/key'


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

  async updateBalance() {
    const wallet = await arweave.wallets.jwkToAddress(key);
    const res = await arweave.api.get(`/mint/${wallet}/100000000000000000000000`);
    const balance = await arweave.wallets.getBalance(wallet);
    console.log("Wallet Balance:", balance);
    console.log("Minted 100000000000000000000000 AR to wallet", wallet);

  }
}
