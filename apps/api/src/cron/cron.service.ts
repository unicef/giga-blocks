import { Injectable } from '@nestjs/common';

@Injectable()
export class CronService {

    async handleCron() {
        console.log("Handle crons")
    }
}
