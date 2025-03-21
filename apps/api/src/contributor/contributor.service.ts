import { Injectable, Logger } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { hexStringToBuffer } from 'src/utils/string-format';

@Injectable()
export class ContributorService {
    private readonly _logger = new Logger('Contributor Services');
    constructor(private prisma: PrismaAppService) {}

    addContributor(data: any) {
        if(data?.walletAddress) data.walletAddress = hexStringToBuffer(data.walletAddress);
        return this.prisma.contributor.create({data});
    }
    
    listContributors() {
        return this.prisma.contributor.findMany({where:{isVisible:true}});
    }
    
    getContributor(id:string) {
        return this.prisma.contributor.findUnique({where:{id}});
    }
    
    async claimNft(id: string,data:any) {
       const walletAddress = hexStringToBuffer(data?.walletAddress);
       const contributor = await this.prisma.contributor.findUnique({where:{id}});
       if(contributor.nftReserved) return this.prisma.contributor.update({where:{id}, data:{nftClaimed:true,walletAddress}});
       else return {message: 'NFT not reserved'};
    }

    
}
