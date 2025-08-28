import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { CreateInformationWorkerDto } from './dto/create-information-worker.dto';
import { UpdateInformationWorkerDto } from './dto/update-information-worker.dto';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { getIssuedVC } from 'src/utils/did-issuer';
import { QueueService } from 'src/mailer/queue.service';
import { PaginateFunction } from 'src/utils/paginate';
import { paginator } from 'src/utils/paginator';
import { orderBy } from 'lodash';

@Injectable()
export class InformationWorkerService {
  private readonly _logger = new Logger(InformationWorkerService.name);

  constructor(private prisma: PrismaAppService, private readonly queueService: QueueService) {}
  async create(createInformationWorkerDto: CreateInformationWorkerDto) {
    const existingWorker = await this.prisma.informationWorker.findFirst({
      where: {
        OR: [{ did: createInformationWorkerDto.did }, { email: createInformationWorkerDto.email }],
      },
    });

    if (existingWorker) {
      if (existingWorker.did === createInformationWorkerDto.did) {
        throw new ForbiddenException('DID should be unique');
      }
      if (existingWorker.email === createInformationWorkerDto.email) {
        throw new ForbiddenException('Email should be unique');
      }
    }

    return this.prisma.informationWorker.create({
      data: createInformationWorkerDto,
    });
  }

  async findAll(query: any) {
    const { page, perPage } = query;

    const paginate: PaginateFunction = paginator({ page, perPage });
    const result = await paginate(
      this.prisma.informationWorker,
      {},
      {
        page,
        perPage,
        orderBy: 'emailSent',
        order: 'asc',
      },
    );

    return result;
  }

  findOne(id: string) {
    return this.prisma.informationWorker.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateInformationWorkerDto: UpdateInformationWorkerDto) {
    return this.prisma.informationWorker.update({
      where: {
        id: id,
      },
      data: updateInformationWorkerDto,
    });
  }

  async sendEmail() {
    this._logger.log('Sending email to the new CIW');
    const res = await getIssuedVC();
    for (let i = 0; i < res?.length; i++) {
      this.queueService.processVC(res[i]);
    }

    return {
      message: 'Process added to the queue sucessfully',
      statusCode: 200,
    };
  }
}
