import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { getAddressfromSignature } from 'src/utils/web3/wallet';

@Injectable()
export class SignatureStrategy extends PassportStrategy(Strategy, 'signature') {
  constructor() {
    super({ usernameField: 'walletAddress', passwordField: 'signature' });
  }

  async validate(walletAddress: string, signature: string): Promise<any> {
    const account = await getAddressfromSignature(signature);
    if (account !== walletAddress) {
      throw new Error('Invalid signature');
    }
    return account;
  }
}
