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
import {
  DEVELOPER_JOIN_MAIL,
  SEND_MAGIC_LINK,
  SEND_VC_LINK,
  THANK_YOU_MAIL,
} from '../constants/mail.constant';
import { QueueService } from '../queue.service';

@Injectable()
@Processor(MAIL_QUEUE)
export class MailProcessor {
  private readonly _logger = new Logger(MailProcessor.name);

  constructor(
    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService,
    private readonly _queueService: QueueService,
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
          to: this._configService.get('DEBUG_EMAIL_ADDRESS'),
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

  @Process(SEND_MAGIC_LINK)
  public async emailValidationMail(job: Job<{ email: string; link: string }>) {
    this._logger.log(`Sending email validation email to '${job.data.email}'`);
    return this._mailerService.sendMail({
      to: job.data.email,
      from: this._configService.get('EMAIL_ADDRESS'),
      subject: 'Email Validation',
      template: './email-validation',
      context: {
        email: job.data.email,
        link: job.data.link,
        emailurl: this._configService.get('REPLY_TO_EMAIL_ADDRESS'),
      },
    });
  }

  @Process(THANK_YOU_MAIL)
  public async thankyoumail(
    job: Job<{ email: string; school: string; link: string; schoolDetailLink: string,studentNumber:string }>,
  ) {
    this._logger.log(`Sending thank you email to '${job.data.email}`);
    const weblink = this._configService.get('NEXT_PUBLIC_WEB_NAME');
    const listLink = `${weblink}/schools/list`;

    return this._mailerService.sendMail({
      to: job.data.email,
      from: this._configService.get('EMAIL_ADDRESS'),
      subject: 'Thank You',
      template: './thank-you',
      context: {
        link: job.data.link,
        school: job.data.school,
        listLink,
        schoolLink: job.data.schoolDetailLink,
        studentnum:Number(job.data.studentNumber).toLocaleString(),
        emailurl: this._configService.get('REPLY_TO_EMAIL_ADDRESS'),
      },
    });
  }

  @Process(SEND_VC_LINK)
  public async sendVCLink(job: Job<{ email: string; link: string; did: string }>) {
    this._logger.log(`Sending VC link email to '${job.data.email}'`);
    const mailsend = await this._mailerService.sendMail({
      to: job.data.email,
      from: this._configService.get('EMAIL_ADDRESS'),
      subject: 'VC Link',
      template: './vc-link',
      context: {
        email: job.data.email,
        did: job.data.did,
        link: job.data.link,
        emailurl: this._configService.get('REPLY_TO_EMAIL_ADDRESS'),
      },
    });
    if (mailsend.accepted.includes(job.data.email)) {
      this._logger.log(`VC link email accepted by '${job.data.email}'`);
      return this._queueService.updateCIW(job.data.did);
    }
  }
}
