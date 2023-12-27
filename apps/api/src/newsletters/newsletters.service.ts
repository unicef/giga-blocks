import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmailDto } from './dto/create-newsletters.dto';
import { UpdateEmailDto } from './dto/update-newsletters.dto';
import { PrismaNewsLetterService as PrismaService } from '../prisma/prisma-newsletter.service';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { MailService } from '../mailer/mailer.service';

export interface EmailResult {
  id: string;
  email: string;
  fullname: string;
  country: string;
}

let emailResult: EmailResult;
@Injectable()
export class EmailService {
  private readonly _logger = new Logger(EmailService.name);

  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private appPrisma: PrismaAppService,
  ) {}

  async create(createEmailDto: CreateEmailDto) {
    // Verify email doesn't already exist
    emailResult = await this.prisma.temporaryEmails.findUnique({
      where: { email: createEmailDto.email },
    });
    if (emailResult) throw new ConflictException('Email already registered');

    // Create data if email doesn't exist
    try {
      emailResult = await this.prisma.temporaryEmails.create({
        data: createEmailDto,
      });
      const adminUser = await this.appPrisma.user.findMany({ where: { roles: { has: 'ADMIN' } } });
      const emailTo = adminUser.map(user => user.email);

      this.mailService.newsletterWelcome({
        email: emailResult.email,
        name: emailResult.fullname,
        country: emailResult.country,
      });
      this.mailService.developerJoinMail({
        email: emailResult.email,
        name: emailResult.fullname,
        country: emailResult.country,
        emailTo: emailTo,
      });
    } catch (error) {
      this._logger.error(`Couldn't create email: ${error}`);
    }

    return { emailResult, success: true, msg: 'Email created successfully' };
  }

  async findAll(query: { country?: string }) {
    let emailResultArray: EmailResult[];
    try {
      emailResultArray = await this.prisma.temporaryEmails.findMany({ where: query });
    } catch (error) {
      this._logger.error(`Couldn't find emails: ${error}`);
    }

    if (!emailResultArray[0]) throw new NotFoundException('No email in db');

    return emailResultArray;
  }

  async findOne(id: string) {
    try {
      emailResult = await this.prisma.temporaryEmails.findUnique({
        where: { id: id },
      });
    } catch (error) {
      this._logger.error(`Couldn't find email: ${error}`);
    }

    if (!emailResult) throw new NotFoundException('No email with such ID');

    return emailResult;
  }

  async update(id: string, updateEmailDto: UpdateEmailDto) {
    // Check if either data with such ID exists
    emailResult = await this.prisma.temporaryEmails.findUnique({
      where: { id: id },
    });
    if (!emailResult) {
      throw new NotFoundException('No data with such ID');
    }

    // Check if this email already exists
    emailResult = await this.prisma.temporaryEmails.findUnique({
      where: { email: updateEmailDto.email },
    });
    if (emailResult) throw new ConflictException('Email already exists');

    let updateResult: any;
    try {
      updateResult = this.prisma.temporaryEmails.update({
        where: { id: id },
        data: {
          email: updateEmailDto.email,
          fullname: updateEmailDto.fullname,
          country: updateEmailDto.country,
        },
      });
    } catch (error) {
      this._logger.error(`Error while updating data.`);
    }

    return updateResult;
  }

  async remove(id: string) {
    const email = await this.prisma.temporaryEmails.findUnique({
      where: { id: id },
    });

    if (!email) {
      throw new ForbiddenException('No email with such ID');
    }

    try {
      const response = this.prisma.temporaryEmails.delete({ where: { id: id } });

      if (!response) {
        throw new ForbiddenException('Email cannot be deleted');
      }

      return response;
    } catch (error) {
      this._logger.error(`Error while removing data.`);
    }
  }
}
