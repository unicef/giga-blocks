import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SignatureAuthGuard extends AuthGuard('signature') {}
