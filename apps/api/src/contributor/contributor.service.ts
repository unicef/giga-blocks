import { Injectable, Logger } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { hexStringToBuffer } from 'src/utils/string-format';
import { Role } from '@prisma/application';
import { MailService } from 'src/mailer/mailer.service';
const Link = process.env.NEXT_PUBLIC_WEB_NAME;

@Injectable()
export class ContributorService {
  private readonly _logger = new Logger('Contributor Services');
  constructor(private prisma: PrismaAppService, private mailService: MailService) {}

  async addContributor(data: any) {
    const { name, walletAddress, email } = data;

    if (!data?.name) data.name = walletAddress;
    if (data?.walletAddress) data.walletAddress = hexStringToBuffer(data.walletAddress);
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
            nftReserved: data.nftReserved,
            nftClaimed: false,
            totalNftMinted: data.totalNftMinted,
          },
        });
    }
    const school = await this.prisma.school.findFirst({ where: { id: data?.nftReserved } });
    const schoolLink = `${Link}/school/${school?.id}`;
    await this.mailService.sendThankYouMail({ email, school: school.name, link: schoolLink });
  }

  listContributors() {
    return this.prisma.contributor.findMany({
      where: { isVisible: true },
      include: { user: true },
    });
  }

  getContributor(userId: string) {
    return this.prisma.contributor.findUnique({ where: { userId }, include: { user: true } });
  }

  async claimNft(id: string, data: any) {
    const walletAddress = hexStringToBuffer(data?.walletAddress);
    const contributor = await this.prisma.contributor.findUnique({ where: { id } });

    if (contributor.nftReserved) {
      await this.prisma.user.update({ where: { id: contributor.userId }, data: { walletAddress } });
      return this.prisma.contributor.update({ where: { id }, data: { nftClaimed: true } });
    } else return { message: 'NFT not reserved' };
  }

  async updateContributor(userId: string, data: any) {
    const contributor = await this.prisma.contributor.findUnique({ where: { userId } });

    if (!contributor) {
      throw new Error('Contributor not found');
    }

    const updatedNftReserved = Array.isArray(contributor.nftReserved)
      ? [...contributor.nftReserved, data.nftReserved]
      : [contributor.nftReserved, data.nftReserved];

    return this.prisma.contributor.update({
      where: { userId },
      data: {
        nftReserved: updatedNftReserved,
        totalNftMinted: (contributor.totalNftMinted || 0) + (data.totalNftMinted || 0),
        ...data,
      },
    });
  }
}
