import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  Post,
  UseGuards,
  Req,
  Res,
  Request,
} from '@nestjs/common';
import { SchoolService } from './schools.service';
import { QosService } from './qos.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ListSchoolDto } from './dto/list-schools.dto';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { MintQueueDto, MintQueueSingleDto, MintSingleSchool } from './dto/mint-queue.dto';
import { MintStatus } from '@prisma/application';
import fastify = require('fastify');
import { ApproveContributeDatumDto } from 'src/contribute/dto/update-contribute-datum.dto';
import { RabbitMQService } from '@rumsan/rabbitmq';
import { QUEUES } from 'src/constants';
import { getFileData } from 'src/utils/arweave/get';
import { ActivationGuard } from 'src/auth/guards/activation.guard';
import { ThemeActivationDto } from './dto/theme-activation.dto';
import {
  claimReservedNFT,
  ReserveNFTDto,
  SchoolActivation,
  WeeklyQOSDto,
} from './dto/reserve-nft.dto';
@Controller('schools')
@ApiTags('School')
export class SchoolController {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly qosService: QosService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  // @Roles('ADMIN')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Get('onchainDataQueue')
  // queue() {
  //   return this.schoolService.queueOnchainData(1);
  // }

  // @Roles('ADMIN')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Patch('/update/:id')
  // update(@Param('id') id: string, @Req() req: any) {
  //   return this.schoolService.update(id, req.user.id);
  // }

  // @Roles('ADMIN')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Patch('/bulkUpdate')
  // bulkUpdate(@Body() updateContributeDatumDto: ApproveContributeDatumDto, @Req() req: any) {
  //   return this.schoolService.updateBulk(updateContributeDatumDto, req.user.id);
  // }

  // @Roles('ADMIN')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Post('mintBulk')
  // mintBatchSchool(@Body() MintData: MintQueueDto) {
  //   return this.schoolService.mintBulkNFT(MintData);
  // }

  // @Roles('ADMIN')
  // // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Public()
  // @Post('mintSchool')
  // mintSchool(@Body() MintData: MintSingleSchool) {
  //   return this.schoolService.mintNft(MintData);
  // }

  @Public()
  @ApiQuery({ name: 'minted', enum: MintStatus, required: false })
  @ApiOperation({ summary: 'Get the count of schools' })
  @Get('schoolCount')
  countSchools(@Query('minted') minted: MintStatus) {
    const query: ListSchoolDto = {
      minted,
    };
    return this.schoolService.countSchools(query);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Upload the school csv for bulk mint' })
  @Post('/uploadFile')
  async uploadFile(
    @Req() req: fastify.FastifyRequest,
    @Res() res: fastify.FastifyReply<any>,
    @Request() request: any,
  ): Promise<any> {
    return await this.schoolService.uploadFile(req, res, request.user);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all schools' })
  findAll(@Query() query: ListSchoolDto) {
    return this.schoolService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a school' })
  findOne(@Param('id') id: string) {
    return this.schoolService.findOne(`${id}`);
  }

  // @Public()
  // @Get('/getContractDetail/:tokenId')
  // findContract(@Param('tokenId') tokenId: string) {
  //   return this.schoolService.findContract(tokenId);
  // }

  // @Public()
  // @Get('byCountry/:country')
  // findByCountry(@Param('country') country: string) {
  //   return this.schoolService.byCountry(`${country}`);
  // }

  @Public()
  @Get('listUpload')
  @ApiOperation({ summary: 'Get all uploads' })
  listUploads() {
    return this.schoolService.listUploads();
  }

  @Public()
  @Get('themes')
  @ApiOperation({ summary: 'Get all themes added in giga system' })
  getAllThemes() {
    return this.schoolService.getAllTheme();
  }

  @Public()
  @Get('theme/:name')
  @ApiOperation({ summary: 'Get a theme by name' })
  getSingleTheme(@Param('name') name: string) {
    return this.schoolService.getSingleTheme(name);
  }

  @Public()
  @Patch('updateTheme/:schoolId')
  @ApiOperation({ summary: 'Theme update for a school' })
  updateTheme(@Param('schoolId') schoolId: string, @Body() themeActivationDto: ThemeActivationDto) {
    return this.schoolService.updateTheme(schoolId, themeActivationDto.themeId);
  }

  // Test rabbit mq
  // @Public()
  // @Get('send')
  // async sendMessage() {
  //   const response = await this.rabbitMQService.publishBatchToQueue(
  //     QUEUES.QOS_QUEUE,
  //     [{ date: '2024-05-26' }],
  //     1,
  //   );
  //   return { response };
  // }

  @Public()
  @Post('reserveNft')
  @ApiOperation({ summary: 'Reserve a school' })
  async reserveNft(@Body() reserveData: ReserveNFTDto) {
    return this.schoolService.reserveNft(reserveData);
  }

  @Public()
  @Post('/claimSchool')
  @ApiOperation({ summary: 'Claim the reserved school' })
  async claimSchool(@Body() claimData: claimReservedNFT) {
    return this.schoolService.claimSchool(claimData);
  }

  @Public()
  @Get('gigaSchoolId/:gigaSchoolId')
  @ApiOperation({ summary: 'Get the school by gigaSchoolId' })
  async getGigaSchoolId(@Param('gigaSchoolId') gigaSchoolId: string) {
    return await this.schoolService.getGigaSchoolId(gigaSchoolId);
  }

  @Public()
  @Post('/activateSchool')
  @ApiOperation({ summary: 'Activate the school by paying user' })
  async activateSchool(@Body() data: SchoolActivation) {
    return this.schoolService.activateSchool(data);
  }

  @Public()
  @Get('/qos/daily')
  @ApiOperation({ summary: 'Get the daily qos data of school' })
  async getDailyQos(@Query() giga_school_id: string) {
    return this.qosService.getlatestQOS(giga_school_id);
  }

  @Public()
  @Get('/qos/weekly')
  @ApiOperation({ summary: 'Get the weekly qos data of school' })
  async getWeeklyQos(@Query() query: WeeklyQOSDto) {
    return this.qosService.getWeeklyQOS(query);
  }

  @Public()
  @Get('/qos/monthly')
  @ApiOperation({ summary: 'Get the monthly qos data of school' })
  async getMonthlyQos(@Query() query: WeeklyQOSDto) {
    return this.qosService.getMonthlyQOS(query);
  }

  //arewave
  @Public()
  @Post('getFile')
  @ApiOperation({ summary: 'Get the file from arweave' })
  async getFile(@Body() fileHash: any) {
    const data = await getFileData(fileHash);
    return data.data[0];
  }

  //   @UseGuards(ActivationGuard)
  //   @Public()
  //   @Get('/testEmailActivation/:uuid')
  //   async activateWithEmail(@Param('uuid') uuid: string) {
  //     console.log(uuid);
  //   }
}
