import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/newsletter';
import { Prisma } from '@prisma/newsletter';

@Injectable()
export class PrismaNewsLetterService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.NEWSLETTER_DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase(): Promise<[Prisma.BatchPayload]> {
    if (process.env.NODE_ENV === 'production') return;
    // teardown logic
    return Promise.all([this.temporaryEmails.deleteMany()]);
  }
}
