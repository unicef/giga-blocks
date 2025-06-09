import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivationGuard implements CanActivate {
  constructor(private prisma: PrismaAppService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const linkId = request.params.uuid;

    if (!linkId) {
      throw new BadRequestException('Link ID is required');
    }

    const activation = await this.prisma.activationLog.findUnique({
      where: { id: linkId },
    });

    if (!activation) {
      throw new NotFoundException('Activation link not found');
    }

    const isActive = activation.status === 'ACTIVE';

    const currentDate = new Date();
    const isExpired = activation.endDate ? new Date(activation.endDate) < currentDate : false;

    if (isExpired) {
      throw new BadRequestException('Link has expired');
    }

    if (!isActive) {
      throw new BadRequestException('Link is not active');
    }

    return true;
  }
}
