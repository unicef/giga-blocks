import { Controller } from '@nestjs/common';
import { CronService } from './cron.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  handleCron() {
    this.cronService.updateLinks();
  }
}
