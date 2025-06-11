import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { ActivationStatus } from '@prisma/application';
import {
  ActivationLogDTO,
  UpdateSchoolThemeAndContributorDTO,
} from './dto/create-activation-log.dto';
import { hexStringToBuffer } from 'src/utils/string-format';
import { QueueService } from 'src/mailer/queue.service';

@Injectable()
export class LinkactivationService {
  constructor(private readonly prisma: PrismaAppService, private queueService: QueueService) {}

  private toDateOnly(date: Date | string) {
    const d = new Date(date);
    const localYear = d.getFullYear();
    const localMonth = d.getMonth();
    const localDay = d.getDate();
    return new Date(Date.UTC(localYear, localMonth, localDay));
  }

  async createLink(data: ActivationLogDTO, userId: string) {
    console.log('Creating activation link with data:', data);
    const date = this.toDateOnly(new Date());
    const startDate = this.toDateOnly(data.startDate);
    const endDate = data?.endDate ? this.toDateOnly(data.endDate) : null;
    if (startDate > date) data.status = ActivationStatus.INACTIVE;
    if (startDate < date)
      throw new ConflictException('Start date should be later than current date');
    if (startDate > endDate)
      throw new ConflictException('End date should be later than start date');

    return this.prisma.activationLog.create({
      data: {
        status: data.status,
        name: data.name,
        activatedBy: userId,
        startDate: startDate,
        endDate: endDate || null,
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
    const date = new Date();

    const data = await this.prisma.activationLog.findUnique({
      where: {
        id: uuid,
      },
    });
    if (!data) {
      throw new NotFoundException('Activation ID not found;');
    }
    if (data?.endDate < date && data?.status == 'ACTIVE') {
      await this.prisma.activationLog.update({
        where: {
          id: uuid,
        },
        data: {
          status: 'EXPIRED',
        },
      });
    }

    return data;
  }

  async validateLink(uuid: string) {
    const date = this.toDateOnly(new Date());
    const data = await this.prisma.activationLog.findUnique({
      where: {
        id: uuid,
      },
    });
    if (!data) throw new NotFoundException('Invalid Link');
    if (this.toDateOnly(data?.endDate) >= date && data?.status == 'ACTIVE') return true;
    await this.prisma.activationLog.update({
      where: {
        id: uuid,
      },
      data: {
        status: 'EXPIRED',
      },
    });
    return false;
  }

  async deactivateLink(uuid: string, userId: string) {
    return this.prisma.activationLog.update({
      where: {
        id: uuid,
      },
      data: {
        status: 'INACTIVE',
        manually_inactivated: true,
        deActivatedBy: userId,
      },
    });
  }

  async updateSchoolThemeAndContributor(data: UpdateSchoolThemeAndContributorDTO) {
    await this.prisma.school.update({
      where: {
        id: data.id,
      },
      data: {
        themeId: data.themeId,
      },
    });

    if (data?.walletAddress) data.walletAddress = hexStringToBuffer(data.walletAddress);
    this.queueService.processImage(data.id);
    return this.prisma.contributor.create({ data });
  }

  async activateLink(uuid: string, userId: string) {
    const date = this.toDateOnly(new Date());
    const data = await this.prisma.activationLog.findUnique({
      where: {
        id: uuid,
      },
    });
    if (!data) throw new NotFoundException('Invalid Link');
    if (this.toDateOnly(data?.endDate) < date) throw new Error('Link already expired.');
    return this.prisma.activationLog.update({
      where: {
        id: uuid,
      },
      data: {
        status: 'ACTIVE',
        activatedBy: userId,
      },
    });
  }
}
