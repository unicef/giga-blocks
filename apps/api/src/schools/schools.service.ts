import {
  Injectable,
  UnauthorizedException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { MintStatus, Prisma, Role } from '@prisma/application';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { ListSchoolDto } from './dto/list-schools.dto';
import { QueueService } from 'src/mailer/queue.service';
import { MintQueueDto, MintQueueSingleDto } from './dto/mint-queue.dto';
import { handler } from 'src/utils/csvToDB';
import { hexStringToBuffer } from '../utils/string-format';
import fastify = require('fastify');
import { AppResponseDto } from './dto/app-response.dto';
import { updateData } from 'src/utils/ethers/transactionFunctions';
import { ConfigService } from '@nestjs/config';
import { ApproveContributeDatumDto } from 'src/contribute/dto/update-contribute-datum.dto';
import { getTokenId } from 'src/utils/web3/subgraph';
import { PaginateFunction, PaginateOptions } from 'src/utils/paginate';
import { getContractWithSigner } from 'src/utils/ethers/contractWithSigner';
import { PAGINATION } from 'src/constants/pagination';
import { paginator } from 'src/utils/paginator';
@Injectable()
export class SchoolService {
  constructor(
    private prisma: PrismaAppService,
    private readonly queueService: QueueService,
    private readonly configService: ConfigService,
  ) {}

  async findAll(query: ListSchoolDto) {
    const { 
      page = PAGINATION.DEFAULT_PAGE, 
      perPage = PAGINATION.DEFAULT_PER_PAGE, 
      minted, 
      uploadId, 
      name, 
      country, 
      connectivityStatus, 
      orderBy = PAGINATION.DEFAULT_ORDERBY, 
      order = PAGINATION.DEFAULT_ORDER
    } = query;
  
    if (+perPage > PAGINATION.MAX_PER_PAGE) {
      throw new BadRequestException(`Maximum number of items per page is ${PAGINATION.MAX_PER_PAGE}`);
    }
  
    const where: Prisma.SchoolWhereInput = {
      deletedAt: null,
      ...(minted !== undefined && { minted }),
      ...(uploadId && { uploadId }),
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(country && { country: { contains: country, mode: 'insensitive' } }),
      ...(connectivityStatus !== undefined && { connectivity: connectivityStatus === 'true' }),
    };
  
    const paginate: PaginateFunction = paginator({ perPage });
  
    return paginate(
      this.prisma.school,
      { where },
      { page, perPage: +perPage, order, orderBy }
    );
  }
  

  async queueOnchainData(data: number) {
    return this.queueService.sendTransaction(data);
  }

  async findContract(tokenId) {
      const contract: any = getContractWithSigner('NFTContent', '0x38AB410c1C650d251a83F884BB76709d1791Ab07');
      return await contract.generateTokenData(tokenId);
  }

  async checkAdmin(address: string) {
    const buffAddress = hexStringToBuffer(address);
    const admin = await this.prisma.user.findUnique({
      where: {
        walletAddress: buffAddress,
      },
    });
    if (admin && admin.roles.includes(Role.ADMIN)) {
      return true;
    }
    throw new UnauthorizedException('Your wallet is not an admin wallet');
  }

  async mintBulkNFT(MintData: MintQueueDto) {
    return this.queueService.sendMintNFT(MintData);
  }

  async mintNft(MintData: MintQueueSingleDto) {
    return this.queueService.sendSingleMintNFT(MintData);
  }

  async uploadFile(
    req: fastify.FastifyRequest,
    res: fastify.FastifyReply<any>,
    user: any,
  ): Promise<any> {
    let uploadBatch: any;

    //@ts-ignore
    if (!req.isMultipart()) {
      res.send(
        new BadRequestException(new AppResponseDto(400, undefined, 'Request is not multipart')),
      );
      return;
    }

    await new Promise(async () => {
      //@ts-ignore
      await req.multipart(async (field: string, fileData: any, filename: string) => {
        try {
          const dataArray = await handler(fileData);
          const schoolData = dataArray.schoolArrays;
          schoolData.map(school => {
            if (isNaN(school.longitude) || isNaN(school.latitude)) {
              throw new BadRequestException({ message: 'Invalid longitude or latitude' });
            }
            if (
              school.latitude < -90 ||
              school.latitude > 90 ||
              school.longitude < -180 ||
              school.longitude > 180
            ) {
              throw new BadRequestException({ message: 'Invalid longitude or latitude' });
            }
          });
          const transaction = await this.prisma.cSVUpload.create({
            data: {
              uploadedBy: user.id,
              fileValue: dataArray.rowValue,
              fileName: filename,
              school: {
                createMany: {
                  data: dataArray.schoolArrays.map(school => ({
                    ...school,
                    createdById: user.id,
                  })),
                },
              },
            },
          });
          uploadBatch = transaction;
        } catch (err) {
          if (err.message.includes('Unique constraint failed on the fields: (`giga_school_id`)'))
            res
              .code(500)
              .send({ err: 'Internal Server error', message: 'Duplicate giga_school_id' });
          res.code(500).send({ err: 'Internal Server error', message: err.message });
        }
      }, onEnd);
    });

    // Uploading finished
    async function onEnd(err: any) {
      if (err) {
        res.send(new AppResponseDto(500, err, 'Internal Server error'));
        return;
      }
      // Ensure that the uploadBatch is available before proceeding
      while (uploadBatch === undefined) {
        // You might want to add a timeout to prevent infinite waiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      const data = uploadBatch.id;
      res.code(200).send(new AppResponseDto(200, data, 'Data uploaded successfully'));
    }
  }
  async findOne(id: string) {
    return await this.prisma.school.findUnique({
      where: {
        id,
      },
    });
  }

  async countSchools(query: ListSchoolDto) {
    return await this.prisma.school.count({
      where: {
        ...query,
      },
    });
  }

  async listUploads() {
    try {
      return await this.prisma.cSVUpload.findMany();
    } catch {
      throw new HttpException('Internal server error', 500);
    }
  }

  async byCountry(country: string) {
    const firstLetter = country.charAt(0);
    if (firstLetter === firstLetter.toUpperCase()) {
      return await this.prisma.school.findMany({
        where: {
          country: country,
        },
      });
    } else {
      const capitalizedLetter = firstLetter.toUpperCase();
      const restOfTheString = country.slice(1);
      return await this.prisma.school.findMany({
        where: {
          country: `${capitalizedLetter}${restOfTheString}`,
        },
      });
    }
  }

  async update(id: string, userId: string) {
    const school = await this.prisma.school.findUnique({ where: { id: id } });
    // if (school.minted === MintStatus.NOTMINTED) {
    //   return await this.updateSchoolData(id, userId);
    // }
    if (school?.minted === MintStatus.MINTED) {
      const tx = await this.updateOnchainData(id, school);
      if (tx.status === 1) await this.updateSchoolData(id, userId);
    } else {
      return await this.updateSchoolData(id, userId);
    }
  }

  async updateSchoolData(id: string, userId: string) {
    try {
      const validatedData = await this.prisma.validatedData.findFirst({
        where: {
          school_Id: id,
          isArchived: false,
          approvedStatus: false,
        },
      });
      const keyValue = Object.entries(validatedData.data);
      const dataToUpdate = Object.fromEntries(keyValue);
      const transaction = await this.prisma.$transaction([
        this.prisma.school.update({
          where: { id: id },
          data: {
            ...dataToUpdate,
            updatedBy: userId,
          },
        }),
        // need to delete the validatedData for now just archived
        this.prisma.validatedData.update({
          where: { id: validatedData.id },
          data: {
            isArchived: true,
            approvedBy: userId,
            approvedAt: new Date(),
            approvedStatus: true,
            inProgressStatus: false,
          },
        }),
        this.prisma.contributedData.updateMany({
          where: {
            id: {
              in: validatedData.contributed_data,
            },
          },
          data: {
            approvedBy: userId,
            approvedAt: new Date(),
          },
        }),
      ]);
      return transaction;
    } catch (err) {
      console.log(err);
    }
  }

  async updateOnchainData(id: string, data: any) {
    const schooldata = await this.filterOnchainData(id);
    const schoolTokenId = await getTokenId(
      this.configService.get('NEXT_PUBLIC_GRAPH_URL'),
      data.giga_school_id,
    );
    const tokenId = schoolTokenId.data.schoolTokenId.tokenId;
    const tx = await updateData(
      'NFTContent',
      this.configService.get('GIGA_NFT_CONTENT_ADDRESS'),
      tokenId,
      schooldata,
    );
    const txReceipt = await tx.wait();
    if (txReceipt.status === 1){
      this.queueService.processImage(id);
      }
    return txReceipt;
  }

  async removeAll() {
    return await this.prisma.school.deleteMany();
  }

  async updateBulk(ids: ApproveContributeDatumDto, userId: string) {
    this.prisma.validatedData.updateMany({
      where: {
        id: {
          in: ids.id,
        },
      },
      data: {
        inProgressStatus: true,
      },
    });
    this.queueService.approveBulkData(ids, userId);
  }

  private async filterOnchainData(id: string) {
    try {
      const validatedData = await this.prisma.validatedData.findFirst({
        where: {
          school_Id: id,
          isArchived: false,
          approvedStatus: false,
        },
      });
      const keyValue = Object.entries(validatedData.data);
      const dataToUpdate = Object.fromEntries(keyValue);
      const schooldata = await this.prisma.school.findUnique({
        where: {
          id: id,
        },
      });
      const filteredData = Object.fromEntries(
        Object.entries(validatedData.data).filter(([key]) => key in dataToUpdate),
      );
      const newData = {
        ...schooldata,
        ...filteredData,
      };
      return [
        newData.name,
        newData.school_type,
        newData.country,
        newData.longitude.toString(),
        newData.latitude.toString(),
        newData.connectivity.toString(),
        newData.coverage_availability.toString(),
        newData.electricity_available.toString(),
      ];
    } catch (err) {
      console.log(err);
    }
  }
}
