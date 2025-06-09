import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ContributorService } from './contributor.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdateVisibility } from './contributor.dto';
// import { CreateContributor } from './contributor.dto';

@Controller('contributor')
@ApiTags('Contributor')
export class ContributorController {

    constructor(private readonly contributorService: ContributorService) {}
    
//    @Public()
//    @Post('add')
//     addContributor(@Body()data:CreateContributor) {
//       return this.contributorService.addContributor(data);
//     }

    @Public()
    @Get('list')
    @ApiOperation({ summary: 'List of all contributors' })
    listContributors() {
        return this.contributorService.listContributors();
        
    }

    @Public()
    @Get('get/:id')
    @ApiOperation({ summary: 'Get contributor by userId' })
    getContributor(@Param('id') userId: string) {
        return this.contributorService.getContributor(userId);
        
    }

    @Public()
    @Patch('update/:walletAddress')
    @ApiOperation({ summary: 'Updates contributor by walletAddress' })
    updateVisibilty(@Param('walletAddress') walletAddress: string, @Body() data:UpdateVisibility) {
        return this.contributorService.updateVisibility(walletAddress,data);
        
    }
    // @Public()
    // @Post('/claimNft/:id')
    // claimNft(@Param('id')id: string, @Body() data:any) {
    //     return this.contributorService.claimNft(id,data);
    // }

    // @Public()
    // @Patch('/update/:userId')
    // updateContributor(@Param('userId')userId: string, @Body() data:any) {
    //     return this.contributorService.updateContributor(userId,data);
    // }


    @Public()
    @Get('/getReservedSchools/:email')
    getReservedSchools(@Param('email') email: string) {
        return this.contributorService.getReservedSchools(email);      
    }

    

}
