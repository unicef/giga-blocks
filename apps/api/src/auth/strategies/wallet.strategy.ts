import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getAddressfromSignature } from 'src/utils/web3/wallet';

@Injectable()
export class WalletStrategy extends PassportStrategy(Strategy, 'wallet') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'walletAddress', passwordField: 'signature' });
  }

  async validate(walletAddress: string, signature: string): Promise<any> {
    const account = await getAddressfromSignature(signature);
    if (account !== walletAddress) throw new Error('Invalid signature');
    const user = await this.authService.validateWalletAddress(account);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
