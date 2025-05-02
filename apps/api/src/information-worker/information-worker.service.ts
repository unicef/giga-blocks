import { Injectable, Logger } from '@nestjs/common';
import { CreateInformationWorkerDto } from './dto/create-information-worker.dto';
import { UpdateInformationWorkerDto } from './dto/update-information-worker.dto';
import { PrismaAppService } from 'src/prisma/prisma.service';

@Injectable()
export class InformationWorkerService {
    private readonly _logger = new Logger(InformationWorkerService.name);
  
  constructor(
    private prisma : PrismaAppService,
  ){}
  create(createInformationWorkerDto: CreateInformationWorkerDto) {
    return this.prisma.informationWorker.create({
      data: createInformationWorkerDto,
      });
  }

  findAll() {
    return this.prisma.informationWorker.findMany();
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

  sendEmail(){
    this._logger.log('Sending email to the new CIW');
    // Logic to send email
    return 'Email sent successfully';
  }

  // remove(id: number) {
  //   return `This action removes a #${id} informationWorker`;
  // }
}
