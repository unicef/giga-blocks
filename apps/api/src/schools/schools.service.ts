import {
  Injectable,
  UnauthorizedException,
  HttpException,
  BadRequestException,
  ConflictException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { MintStatus, Prisma, Role } from '@prisma/application';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { ListSchoolDto } from './dto/list-schools.dto';
import { QueueService } from 'src/mailer/queue.service';
import { MintQueueDto, MintQueueSingleDto, MintSingleSchool } from './dto/mint-queue.dto';
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
import { NFTContent } from 'src/constants/contract';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { getCacheKey } from 'src/utils/cache/getCacheKey';
import { ReserveNFTDto, SchoolActivation } from './dto/reserve-nft.dto';
import { ContributorService } from 'src/contributor/contributor.service';
import getLocationId from 'src/utils/gigamaps';
@Injectable()
export class SchoolService {
  constructor(
    private prisma: PrismaAppService,
    private contrubutorService: ContributorService,
    private readonly queueService: QueueService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(query: any) {
    const {
      page,
      perPage,
      minted,
      uploadId,
      name,
      country,
      connectivityStatus,
      orderBy,
      order,
      electricity,
      water,
      teachers,
      computers,
      students,
      download,
      connectionType,
    } = query;
    // Convert string booleans to actual booleans
    const waterBool = water?.trim() === 'true' ? true : water === 'false' ? false : undefined;
    const electricityBool =
      electricity === 'true' ? true : electricity === 'false' ? false : undefined;
    const connectivityBool =
      connectivityStatus?.trim() === 'true'
        ? true
        : connectivityStatus === 'false'
        ? false
        : undefined;

    const cacheKey = getCacheKey(name, country, minted, Number(page), Number(perPage));

    // Check if only the cache-relevant parameters are present
    const isCacheableQuery = Object.keys(query).every(key =>
      ['name', 'country', 'minted', 'page', 'perPage'].includes(key),
    );

    if (isCacheableQuery) {
      const cachedResult = await this.cacheManager.get<string>(cacheKey);
      if (cachedResult) {
        const parsedResult = JSON.parse(cachedResult);
        console.log(cachedResult?.length, 'cachedResult');

        return parsedResult;
      }
    }
    const gigaMapsConditions: Prisma.SchoolWhereInput[] = [];

    //Combines all the filters into a single condition
    if (waterBool !== undefined) {
      const waterConditions: Prisma.SchoolWhereInput = {
        OR: [
          {
            giga_maps_data: {
              path: ['water_availability'],
              equals: waterBool,
            },
          },
          {
            giga_maps_data: {
              path: ['water_availability'],
              equals: waterBool ? 'Yes' : 'No',
            },
          },
        ],
      };
      if (!waterBool) {
        waterConditions.OR?.push({
          giga_maps_data: {
            path: ['water_availability'],
            equals: null,
          },
        });
      }
      gigaMapsConditions.push(waterConditions);
    }
    if (teachers !== undefined) {
      gigaMapsConditions.push({
        giga_maps_data: {
          path: ['num_teachers'],
          lte: Number(teachers),
        },
      });
    }
    if (computers !== undefined) {
      gigaMapsConditions.push({
        giga_maps_data: {
          path: ['num_computers'],
          lte: Number(computers),
        },
      });
    }
    if (students !== undefined) {
      gigaMapsConditions.push({
        giga_maps_data: {
          path: ['num_students'],
          lte: Number(students),
        },
      });
    }
    if (download !== undefined) {
      gigaMapsConditions.push({
        giga_maps_data: {
          path: ['download_speed_benchmark'],
          lte: Number(download),
        },
      });
    }
    if (connectionType !== undefined) {
      gigaMapsConditions.push({
        OR: [
          {
            giga_maps_data: {
              path: ['connectivity_type'],
              string_contains: connectionType,
            },
          },
          {
            giga_maps_data: {
              path: ['connectivity_type'],
              string_contains: connectionType.toLowerCase(),
            },
          },
        ],
      });
    }
    const where: Prisma.SchoolWhereInput = {
      deletedAt: null,
      ...(minted !== 'undefined' && { minted }),
      ...(uploadId && { uploadId }),
      ...(name && { name: { contains: name.trim(), mode: 'insensitive' } }),
      ...(country && { country: { contains: country, mode: 'insensitive' } }),
      ...(connectivityBool !== undefined && { connectivity: connectivityBool }),
      ...(electricityBool !== undefined && { electricity_available: electricityBool }),
      ...(gigaMapsConditions.length > 0 && {
        AND: gigaMapsConditions,
      }),
    };

    const paginate: PaginateFunction = paginator({ perPage });

    const result = await paginate(
      this.prisma.school,
      {
        where,
        include: {
          theme: true,
          giga_maps_data: false,
        },
      },
      {
        page,
        perPage,
        order,
        orderBy,
      },
    );

    if (isCacheableQuery) {
      // *** IMPORTANT: Stringify the result before setting in cache ***
      const setStatus = await this.cacheManager.set(cacheKey, JSON.stringify(result), 12000);
      console.log(`Cache SET status for ${cacheKey}:`, setStatus ? 'SUCCESS' : 'FAILURE');
    }

    return result;
  }

  async queueOnchainData(data: number) {
    return this.queueService.sendTransaction(data);
  }

  async findContract(tokenId) {
    const contract: any = getContractWithSigner(
      NFTContent,
      '0x38AB410c1C650d251a83F884BB76709d1791Ab07',
    );
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

  async mintNft(MintData: MintSingleSchool) {
    const schoolData = await this.prisma.school.findUnique({
      where: {
        id: MintData.id,
      },
    });
    const data = this.formatSchoolData(schoolData);
    return this.queueService.sendSingleMintNFT(data);
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
          if (!filename.toLowerCase().endsWith('.csv')) {
            return res
              .code(400)
              .send({ message: 'Invalid file format. Only CSV files are allowed.' });
          }
          const dataArray = await handler(fileData);
          const schoolData = dataArray.schoolArrays;
          console.log({ schoolData });
          const schools = await this.prisma.school.findMany({
            where: {
              giga_school_id: {
                in: schoolData.map(school => school.school_id_giga),
              },
              minted: MintStatus.NOTMINTED,
            },
          });
          console.log(
            'dbdata',
            schools.map(school => school.giga_school_id),
          );
          // Check for missing schools
          const missingSchools = schoolData.filter(
            school => !schools.some(dbSchool => dbSchool.giga_school_id === school.school_id_giga),
          );

          const school_to_be_updated = schoolData
            .filter(school =>
              schools.some(dbSchool => dbSchool.giga_school_id === school.school_id_giga),
            )
            .map(school => school.school_id_giga);
          if (school_to_be_updated.length === 0)
            return res.code(400).send({ message: 'No school to be minted' });

          // if (missingSchools.length > 0) {
          //   throw new NotFoundException({
          //     message: 'Some schools from the CSV file are not found in the database',
          //     missingSchools: missingSchools.map(school => school.school_id_giga),
          //   });
          // }

          // throw error in case of  missing schools or add the available schools
          // to the uploadBatch and ignore the missing ones.
          // Still needs to inform the user about the missing schools
          //Need to add to the queue after the uploadBatch is created.
          const txn = await this.prisma.$transaction(async prisma => {
            const uploadBatch = await this.prisma.cSVUpload.create({
              data: {
                uploadedBy: user.id,
                fileValue: school_to_be_updated,
                fileName: filename,
              },
            });
            await prisma.school.updateMany({
              where: {
                giga_school_id: {
                  in: school_to_be_updated.map(school => school),
                },
              },
              data: {
                uploadId: uploadBatch.id,
              },
            });
            return uploadBatch;
          });
          this.queueService.csvMintdata(txn.id).catch(err => console.log(err));
          return res.code(200).send({ message: 'Batch processing started' });
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
    const school = await this.prisma.school.findUnique({
      where: {
        id,
      },
      include: {
        theme: true,
      },
    });

    if (!school) {
      throw new NotFoundException('School not found for given school id');
    }
    const mapsGigaData = school.giga_maps_data as any;

    const giga_maps_data = {
      Latitude: mapsGigaData?.latitude,
      Longitude: mapsGigaData?.longitude,
      'Download Speed (Govt) (mbps)': mapsGigaData?.download_speed_govt,
      'Location Data Source': mapsGigaData?.source_lat_lon,
      'Real-Time Connectivity': mapsGigaData?.connectivity_RT,
      'Education Level': mapsGigaData?.education_level,
      'Area Type': mapsGigaData?.school_area_type,
      'Reported Connectivity': mapsGigaData?.connectivity_govt,
      'Connectivity Type': mapsGigaData?.connectivity_type,
      'School Data Source': mapsGigaData?.school_data_source,
      'Fiber Node Distance (m)': mapsGigaData?.fiber_node_distance,
      'Education Level (Govt)': mapsGigaData?.education_level_govt,
      'Computer Availability': mapsGigaData?.computer_availability,
      'Cellular Coverage Type': mapsGigaData?.cellular_coverage_type,
      'Connectivity Type (Govt)': mapsGigaData?.connectivity_type_govt,
      'Download Speed Benchmark': mapsGigaData?.download_speed_benchmark,
      'Electricity Availability': mapsGigaData?.electricity_availability,
      'Contracted Download Speed (Mbps)': mapsGigaData?.download_speed_benchmark,
      'School established in (year)': mapsGigaData?.school_established_year,
      'Connectivity Data Source': mapsGigaData?.connectivity_RT_datasource,
      'School Data Collection Year': mapsGigaData?.school_data_collection_year,
      'Cellular Coverage Availability': mapsGigaData?.cellular_coverage_availability,
      'Connectivity Data Collection Year': mapsGigaData?.connectivity_govt_collection_year,
    };

    const locationdetails = await getLocationId(school.giga_school_id, 'giga_id_school');
    const schooldetails = {
      ...school,
      locationId: locationdetails?.id,
      countryCode: locationdetails?.country_code,
      giga_maps_data,
      data_Source: mapsGigaData?.source_lat_lon,
    };
    return schooldetails;
  }

  async countSchools(query: ListSchoolDto) {
    return await this.prisma.school.count({
      where: {
        ...query,
      },
    });
  }

  async getGigaMetrics() {
    const result = await this.prisma.school.groupBy({
      by: ['minted'],
      _count: { minted: true },
    });

    const offlineCount = await this.prisma.school.count({
      where: {
        connectivity: false,
        deletedAt: null,
      },
    });

    const contributorCount = await this.prisma.contributor.count();

    const metrics = {
      minted: 0,
      notMinted: 0,
      contributorCount: contributorCount,
      schoolCount: 0,
      offline: '0%',
    };

    result.forEach(row => {
      if (row.minted === MintStatus.MINTED) {
        metrics.minted = row._count.minted;
      }
      if (row.minted === MintStatus.NOTMINTED) {
        metrics.notMinted = row._count.minted;
      }
      metrics.schoolCount += row._count.minted;
    });

    const offlinePercentage = (offlineCount / metrics.schoolCount) * 100;
    metrics.offline = `${Math.round(offlinePercentage)}%`;

    return metrics;
  }

  async listUploads() {
    try {
      return await this.prisma.cSVUpload.findMany();
    } catch {
      throw new HttpException('Internal server error', 500);
    }
  }

  async getAllTheme() {
    return await this.prisma.theme.findMany({});
  }

  async getSingleTheme(name: string) {
    return await this.prisma.theme.findUnique({
      where: {
        name,
      },
    });
  }

  async updateTheme(id: string, themeId: string) {
    const school = await this.prisma.school.findUnique({
      where: {
        id: id,
      },
    });
    if (!school) {
      throw new NotFoundException('School not found');
    }
    const theme = await this.prisma.theme.findUnique({
      where: {
        id: themeId,
      },
    });
    if (!theme) {
      throw new NotFoundException('Theme not found');
    }

    return await this.prisma.school.update({
      where: {
        id,
      },
      data: {
        themeId,
      },
    });
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
      NFTContent,
      this.configService.get('GIGA_NFT_CONTENT_ADDRESS'),
      tokenId,
      schooldata,
    );
    const txReceipt = await tx.wait();
    if (txReceipt.status === 1) {
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

  async reserveNft(reserveNft: ReserveNFTDto) {
    await this.validateSchoolAndTheme(reserveNft.schoolId, reserveNft.themeId);
    const schoolData = await this.prisma.school.findUnique({
      where: {
        id: reserveNft.schoolId,
      },
    });
    const data = this.formatSchoolData(
      schoolData,
      reserveNft.email,
      reserveNft.walletAddress,
      reserveNft.themeId,
    );

    const schoolMinted = await this.queueService.sendSingleMintNFT(data);

    return schoolMinted;
  }

  async activatePaidSchool(data: SchoolActivation) {
    const { schoolId, themeId, contributorData } = data;
    await this.validateSchoolAndTheme(schoolId, themeId);
    const updatedSchool = await this.prisma.school.update({
      where: {
        id: schoolId,
      },
      data: {
        minted: MintStatus.ISMINTING,
      },
    });
    await this.prisma.schoolActivationDetails.create({
      data: {
        schoolId: schoolId,
        themeId: themeId,
        contributorData: JSON.parse(JSON.stringify(contributorData)),
        transactionHash: data.transactionHash,
      },
    });
    this.queueService.activatePaidSchool(data);
    return updatedSchool;
  }

  async activateSchool(data: SchoolActivation) {
    const { schoolId, themeId, contributorData } = data;
    await this.validateSchoolAndTheme(schoolId, themeId);
    const updatedSchool = await this.prisma.school.update({
      where: {
        id: schoolId,
      },
      data: {
        minted: MintStatus.MINTED,
        themeId: themeId,
      },
    });
    this.queueService.processImage(updatedSchool?.giga_school_id);
    return this.contrubutorService.addPayingContributor(contributorData);
  }

  async updateImages() {
    return this.queueService.bulkUpdateImageHash();
  }

  async getCountries() {
    return this.prisma.schoolVersion.findMany({
      select: {
        country_code: true,
      },
    });
  }

  private async validateSchoolAndTheme(schoolId: string, themeId: string) {
    const school = await this.prisma.school.findUnique({
      where: {
        id: schoolId,
      },
    });
    if (!school) {
      throw new NotFoundException('School not found');
    }
    if (school.minted === MintStatus.MINTED) {
      throw new ConflictException('School already minted');
    }
    if (school.minted === MintStatus.NOTMINTED && school.schoolClaimed)
      throw new ConflictException('School already  claimed');
    const theme = await this.prisma.theme.findUnique({
      where: {
        id: themeId,
      },
    });
    if (!theme) {
      throw new NotFoundException('Theme not found');
    }
  }

  formatSchoolData(
    schoolData,
    email?: string,
    walletAddress?: string,
    themeId?: string,
  ): MintQueueSingleDto {
    return {
      data: {
        id: schoolData.id,
        giga_school_id: schoolData.giga_school_id,
        schoolName: schoolData.name,
        schoolType: schoolData.school_type,
        country: schoolData.country,
        latitude: schoolData.latitude,
        longitude: schoolData.longitude,
        connectivity: schoolData.connectivity.toString(),
        electricity_availabilty: schoolData.electricity_available,
        coverage_availabitlity: schoolData.coverage_availability.toString(),
        region_name: schoolData.region_name,
      },
      email,
      walletAddress,
      themeId,
    };
  }

  async claimSchool(claimData: any) {
    const { email, walletAddress, schoolId } = claimData;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('No contributor found for given email');
    }
    const contributor = await this.prisma.contributor.findUnique({ where: { userId: user?.id } });
    if (!contributor?.nftReserved || !contributor?.schoolreserved.includes(schoolId)) {
      throw new NotFoundException('Given Schools is not reserved for given email');
    }
    // if (?.nftClaimed) {
    //   throw new ConflictException('School already claimed');
    // }

    this.queueService.claimReservedNFT(email, walletAddress, schoolId).catch(err => {
      console.log(err);
    });
    return { message: 'queue added successfully', statusCode: 200 };
  }

  async getGigaSchoolId(gigaSchoolId: string) {
    const school = await this.prisma.school.findUnique({
      where: {
        giga_school_id: gigaSchoolId,
      },
    });
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return school;
  }

  async getImageUpdateList(query: any) {
    const { page, perPage } = query;
    const paginate: PaginateFunction = paginator({ perPage });
    const schools = await paginate(
      this.prisma.school,
      {
        where: {
          imageUpdated: false,
          NOT: [{ imageHash: null }, { imageHash: '' }],
        },
        select: {
          giga_school_id: true,
          id: true,
          name: true,
          imageHash: true,
          longitude: true,
          latitude: true,
          country: true,
        },
      },
      {
        page,
        perPage,
      },
    );

    if (!schools || schools.meta.total === 0) {
      return { statusCode: 200, message: 'No schools found', data: [] };
    }

    return schools;
  }
}
