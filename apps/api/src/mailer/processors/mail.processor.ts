import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import {
  SENT_OTP,
  MAIL_QUEUE,
  WELCOME_MSG,
  NEWSLETTER_WELCOME,
  DATA_VALIDATION,
} from '../constants';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { DEVELOPER_JOIN_MAIL } from '../constants/mail.constant';

@Injectable()
@Processor(MAIL_QUEUE)
export class MailProcessor {
  private readonly _logger = new Logger(MailProcessor.name);

  constructor(
    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService,
  ) {}

  @OnQueueActive()
  public onActive(job: Job) {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job) {
    this._logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  public onError(job: Job<any>, error: any) {
    this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    if (job.attemptsMade === job.opts.attempts) {
      try {
        return this._mailerService.sendMail({
          replyTo: this._configService.get('REPLY_TO_EMAIL_ADDRESS'),
          to: this._configService.get('EMAIL_ADDRESS'),
          from: this._configService.get('EMAIL_ADDRESS'),
          subject: 'Something went wrong with server!!',
          template: './error',
          context: {},
        });
      } catch {
        this._logger.error('Failed to send confirmation email to admin');
      }
    }
  }

  @Process(SENT_OTP)
  public async sendOTP(job: Job<{ email: string; otp: string }>) {
    this._logger.log(`Sending otp email to '${job.data.email}'`);

    return this._mailerService.sendMail({
      to: job.data.email,
      replyTo: this._configService.get('REPLY_TO_EMAIL_ADDRESS'),
      from: this._configService.get('EMAIL_ADDRESS'),
      subject: 'Sign In OTP',
      template: './otp',
      context: {
        name: job.data.email,
        otp: job.data.otp,
        emailurl: this._configService.get('REPLY_TO_EMAIL_ADDRESS'),
      },
    });
  }

  @Process(WELCOME_MSG)
  public async welcome(job: Job<{ email: string; name: string }>) {
    this._logger.log(`Sending welcome email to '${job.data.email}'`);

    return this._mailerService.sendMail({
      to: job.data.email,
      replyTo: this._configService.get('REPLY_TO_EMAIL_ADDRESS'),
      from: this._configService.get('EMAIL_ADDRESS'),
      subject: 'Greetings from Giga Blocks',
      template: './welcome',
      context: { name: job.data.name, url: this._configService.get('NEXT_PUBLIC_WEB_NAME') },
    });
  }

  @Process(NEWSLETTER_WELCOME)
  public async newsletterWelcome(job: Job<{ email: string; name: string; country: string }>) {
    this._logger.log(`Sending newsletter welcome email to '${job.data.email}'`);

    return this._mailerService.sendMail({
      to: job.data.email,
      replyTo: this._configService.get('REPLY_TO_EMAIL_ADDRESS'),
      from: this._configService.get('EMAIL_ADDRESS'),
      subject: 'Greetings from Giga Blocks',
      template: './newsletter-welcome',
      context: {
        name: job.data.name,
        country: job.data.country,
        url: this._configService.get('NEXT_PUBLIC_WEB_NAME'),
        emailurl: this._configService.get('REPLY_TO_EMAIL_ADDRESS'),
      },
    });
  }

  @Process(DATA_VALIDATION)
  public async dataValidationEmail(job: Job<{ email: string; name: string; school: string }>) {
    this._logger.log(`Sending data validation email to '${job.data.email}`);
    return this._mailerService.sendMail({
      to: job.data.email,
      from: this._configService.get('EMAIL_ADDRESS'),
      subject: 'Data Validation',
      template: './data-validation',
      context: {
        name: job.data.name,
        school: job.data.school,
        emailurl: this._configService.get('REPLY_TO_EMAIL_ADDRESS'),
      },
    });
  }

  @Process(DEVELOPER_JOIN_MAIL)
  public async developerJoinMail(
    job: Job<{ email: string; name: string; country: string; emailTo: string[] }>,
  ) {
    this._logger.log(`Sending developer join alert email to '${job.data.emailTo}'`);

    return this._mailerService.sendMail({
      to: job.data.emailTo,
      replyTo: this._configService.get('REPLY_TO_EMAIL_ADDRESS'),
      from: this._configService.get('EMAIL_ADDRESS'),
      subject: 'New User Register Alert',
      template: './developer-join',
      context: {
        name: job.data.name,
        country: job.data.country,
        email: job.data.email,
        url: this._configService.get('NEXT_PUBLIC_WEB_NAME'),
        emailurl: this._configService.get('REPLY_TO_EMAIL_ADDRESS'),
      },
    });
  }
}
