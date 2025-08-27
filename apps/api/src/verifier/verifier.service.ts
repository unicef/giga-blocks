import { Injectable, Logger } from '@nestjs/common';
import { CreateVerifierDto } from './dto/create-verifier.dto';
import { UpdateVerifierDto } from './dto/update-verifier.dto';
import { HOST_URL } from 'src/constants';
import { auth, resolver, protocol } from '@iden3/js-iden3-auth';
import { v4 as uuidv4 } from 'uuid';
import * as getRawBody from 'raw-body';
import { PrismaAppService } from 'src/prisma/prisma.service';
import * as path from 'path';
import { UUID } from 'crypto';

@Injectable()
export class VerifierService {
  private readonly _logger = new Logger('Verifier Services');
  constructor(private prisma: PrismaAppService) {}
  async getAuthRequest(schoolId: UUID, data: any) {
    const hosturl = HOST_URL;
    const sessionId = uuidv4();
    const audience = process.env.AUDIENCE_DID;
    const redirect_uri = `${hosturl}/verifier/callback?sessionId=${sessionId}`;

    const request = auth.createAuthorizationRequest('verification', audience, redirect_uri);

    const schoolData = await this.prisma.school.findUnique({
      where: { id: schoolId },
    });


    const proofRequest = {
      id: 1,
      circuitId: 'credentialAtomicQuerySigV2',
      query: {
        allowedIssuers: ['*'],
        type: process.env.SCHEMA_TYPE,
        context: process.env.SCHEMA_CONTEXT_URL,
        credentialSubject: {
          'country': {
            $eq: schoolData?.country,
          },
        },
      },
    };
    const scope = data?.scope ?? [];
    request.body.scope = [...scope, proofRequest];
    await this.prisma.sessionId.create({
      data: {
        id: sessionId,
        schoolId,
        requestDetails: request,
      },
    });
    const universalLink = btoa(JSON.stringify(request));
    return {
      request: request,
      universalLink,
    };
  }

  async callback(req) {
    console.log('here at the callback');
    let authResponse;

    const sessionId = req?.query.sessionId;
    const raw = req.body;
    const tokenStr = raw.toString().trim();
    const keyDir = './keys';

    const resolvers = {
      // ['polygon:amoy']: new resolver.EthStateResolver(
      //   'https://polygon-amoy.g.alchemy.com/v2/T0PE-HxhWOEH0eUNTcUOFgPQJiQzL6uf',
      //   '0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124',
      // ),
      [process.env.RESOLVER_NETWORK]: new resolver.EthStateResolver(
        process.env.RESOLVER_URL,
        process.env.RESOLVER_ADDRESS,
      ),
    };
    const sessionDetails = await this.prisma.sessionId.findUnique({
      where: { id: sessionId },
    });
    const requestDetails = sessionDetails?.requestDetails;

    const verifier = await auth.Verifier.newVerifier({
      stateResolver: resolvers,
      circuitsDir: path.join(__dirname, keyDir),
      ipfsGatewayURL: 'https://ipfs.io',
    });
    try {
      const opts = {
        AcceptedStateTransitionDelay: 5 * 60 * 1000, // 5 minute
      };
      authResponse = await verifier.fullVerify(tokenStr, requestDetails as any, opts as any);
      if (authResponse.id) {
        const updatedSession = await this.prisma.sessionId.update({
          where: { id: sessionId },
          data: {
            status: true,
          },
        });
        const schoolQuery = await this.prisma.school.update({
          where: { giga_school_id: sessionDetails?.schoolId },
          data: {
            verifiedCIW: true,
          },
        });
      }
    } catch (err) {
      this._logger.error(err);
      return {
        status: 500,
        err,
      };
    }
    return authResponse;
  }
}
