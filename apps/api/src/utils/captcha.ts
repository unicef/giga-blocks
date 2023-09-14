import { CanActivate, Injectable, BadRequestException, ExecutionContext } from '@nestjs/common';

import { verify } from 'hcaptcha';

@Injectable()
export class CaptchaGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { headers } = context.switchToHttp().getRequest();
      const secret = process.env.HCAPTCHA_SECRET_KEY || '';
      const captcha = headers.captcha;
      const response = await verify(secret, captcha);
      if (response.success) return true;
    } catch (error) {
      throw new BadRequestException('Error verifying captcha');
    }
  }
}
