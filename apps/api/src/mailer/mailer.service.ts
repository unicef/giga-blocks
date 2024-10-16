import { Injectable, Logger } from '@nestjs/common';
import {
  SENT_OTP,
  MAIL_QUEUE,
  WELCOME_MSG,
  NEWSLETTER_WELCOME,
  DATA_VALIDATION,
  DEVELOPER_JOIN_MAIL,
} from './constants';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { jobOptions } from './config/bullOptions';

@Injectable()
export class MailService {
  private readonly _logger = new Logger(MailService.name);

  constructor(@InjectQueue(MAIL_QUEUE) private readonly _mailQueue: Queue) {}

  public async sendOTP({ email, otp }: { email: string; otp: string }): Promise<void> {
    try {
      await this._mailQueue.add(
        SENT_OTP,
        {
          email,
          otp,
        },
        jobOptions,
      );
    } catch (error) {
      this._logger.error(`Error queueing registration email to user ${email}`);
      throw error;
    }
  }

  public async welcome({ name, email }: { name: string; email: string }): Promise<void> {
    try {
      await this._mailQueue.add(
        WELCOME_MSG,
        {
          name,
          email,
        },
        jobOptions,
      );
    } catch (error) {
      this._logger.error(`Error queueing registration email to user ${email}`);
      throw error;
    }
  }

  public async newsletterWelcome({
    email,
    name,
    country,
  }: {
    email: string;
    name: string;
    country: string;
  }) {
    try {
      await this._mailQueue.add(
        NEWSLETTER_WELCOME,
        {
          email,
          name,
          country,
        },
        jobOptions,
      );
    } catch (error) {
      this._logger.error(`Error queueing registration email to user ${email}`);
      throw error;
    }
  }

  public async dataValidationEmail({
    email,
    name,
    school,
  }: {
    email: string;
    name: string;
    school: string;
  }) {
    try {
      await this._mailQueue.add(
        DATA_VALIDATION,
        {
          email,
          name,
          school,
        },
        jobOptions,
      );
    } catch (error) {
      this._logger.error(`Error queueing registration email to user ${email}`);
      throw error;
    }
  }

  public async developerJoinMail({
    email,
    name,
    country,
    emailTo,
  }: {
    email: string;
    name: string;
    country: string;
    emailTo: string[];
  }) {
    try {
      await this._mailQueue.add(
        DEVELOPER_JOIN_MAIL,
        {
          email,
          name,
          country,
          emailTo,
        },
        jobOptions,
      );
    } catch (error) {
      this._logger.error(`Error queueing registration email to user ${email}`);
      throw error;
    }
  }
}
