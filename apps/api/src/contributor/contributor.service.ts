import { Injectable, Logger } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { hexStringToBuffer } from 'src/utils/string-format';
import { ContributorNameType, Role } from '@prisma/application';
import { MailService } from 'src/mailer/mailer.service';
import { QueueService } from 'src/mailer/queue.service';
import { CreateContributor } from './contributor.dto';
import { ethers } from 'ethers';
const Link = process.env.NEXT_PUBLIC_WEB_NAME;

@Injectable()
export class ContributorService {
  private readonly _logger = new Logger('Contributor Services');
  constructor(
    private prisma: PrismaAppService,
    private mailService: MailService,
    private queueService: QueueService,
  ) {}

  async addContributor(data: CreateContributor) {
    const { email } = data;
    let walletAddress;
    let name = data?.name;

    if (!data?.name) name = data?.walletAddress || email;
    if (data?.walletAddress) walletAddress = hexStringToBuffer(data.walletAddress);
    const existinguser = await this.prisma.user.findUnique({ where: { email } });
    if (existinguser) await this.updateContributor(existinguser.id, data);
    else {
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          walletAddress,
          roles: [Role.CONTRIBUTOR],
        },
      });
      if (user)
        await this.prisma.contributor.create({
          data: {
            userId: user?.id,
            isVisible: data.isVisible,
            schoolreserved: [data?.schoolReserved],
            nftReserved: true,
            nftClaimed: false,
            totalNftMinted: +1,
          },
        });
    }
    const school = await this.prisma.school.findFirst({ where: { id: data?.schoolReserved } });
    const schoolLink = `${Link}/schools/claim/${school?.id}`;

    await this.mailService.sendThankYouMail({ email, school: school.name, link: schoolLink });
  }

  async listContributors() {
    const contributors = await this.prisma.contributor.findMany({
      where: { isVisible: true },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            walletAddress: true,
          },
        },
      },
      orderBy: [{ nameType: 'asc' }, { updatedAt: 'desc' }],
    });
    return contributors;
  }

  getContributor(userId: string) {
    return this.prisma.contributor.findUnique({ where: { userId }, include: { user: true } });
  }

  async claimNft(email: string, wallet: any) {
    const walletAddress = hexStringToBuffer(wallet);

    const user = await this.prisma.user.findUnique({ where: { email } });
    const contributor = await this.prisma.contributor.findUnique({ where: { userId: user?.id } });

    if (contributor.nftReserved) {
      await this.prisma.contributor.update({
        where: { userId: user?.id },
        data: { nftClaimed: true },
      });
    } else return { message: 'NFT not reserved' };
  }

  async updateContributor(userId: string, data: any) {
    const contributor = await this.prisma.contributor.findUnique({ where: { userId } });

    if (!contributor) {
      throw new Error('Contributor not found');
    }

    const updatedNftReserved = Array.isArray(contributor.schoolreserved)
      ? [...contributor.schoolreserved, data.schoolReserved].flat().filter(Boolean)
      : [contributor.schoolreserved, data.schoolReserved].flat().filter(Boolean);
    const updatedcontributor = await this.prisma.contributor.update({
      where: { userId },
      data: {
        nftReserved: true,
        schoolreserved: updatedNftReserved || [],
        totalNftMinted: { increment: 1 },
        isVisible: data.isVisible,
      },
    });
    return updatedcontributor;
  }

  async addPayingContributor(data: CreateContributor) {
    let walletAddress;
    let name = data?.name;
    if (!data?.name) name = data?.walletAddress || data?.email;
    if (data?.walletAddress) walletAddress = hexStringToBuffer(data.walletAddress);
    const existinguser = await this.prisma.user.findUnique({
      where: { walletAddress: walletAddress },
    });
    if (!existinguser) {
      const user = await this.prisma.user.create({
        data: {
          name,
          email: data?.email,
          walletAddress,
          roles: [Role.CONTRIBUTOR],
        },
      });
      if (user) {
        await this.prisma.contributor.create({
          data: {
            userId: user?.id,
            isVisible: data.isVisible || false,
            nftReserved: false,
            nftClaimed: true,
            totalNftMinted: +1,
          },
        });
      }
    } else await this.updateContributor(existinguser.id, data);
    return { sucess: true, message: 'Contributor added successfully' };
  }

  async getReservedSchools(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Contributor not found');
    }
    const contributor = await this.prisma.contributor.findUnique({
      where: { userId: user.id },
    });

    const reservedSchools = await this.prisma.school.findMany({
      where: { id: { in: contributor.schoolreserved } },
      select: {
        id: true,
        name: true,
        country: true,
        minted: true,
        imageHash: true,
      },
    });
    return reservedSchools;
  }

  async updateVisibility(walletAddress: string, data: any) {
    let name = data?.name;
    if (!data?.name) name = data?.walletAddress;
    const nameType = name?.endsWith('.eth')
      ? ContributorNameType.ENS
      : ethers.isAddress(name)
      ? ContributorNameType.WALLET
      : ContributorNameType.REGULAR;
    const userDetails = await this.prisma.user.update({
      where: { walletAddress: hexStringToBuffer(walletAddress) },
      data: { name: data.name },
    });
    if (!userDetails) {
      throw new Error('Contributor not found');
    }
    const updatedcontributor = await this.prisma.contributor.update({
      where: { userId: userDetails.id },
      data: {
        isVisible: data.isVisible,
        nameType: nameType,
        name,
      },
    });
    return updatedcontributor;
  }
}
