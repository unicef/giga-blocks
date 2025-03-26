import { Injectable, Logger } from '@nestjs/common';
import { CreateFeaturedDto } from './dto/create-featured.dto';
import { PrismaAppService } from '../prisma/prisma.service';

@Injectable()
export class FeaturedService {
  private readonly _logger = new Logger(FeaturedService.name);
  constructor(
    private prisma: PrismaAppService,
  ){
    
  }
  async create(createFeaturedDto: CreateFeaturedDto,userId:string) {
    const data = await this.prisma.featureCountry.findFirst({
      where:{
        country_code:createFeaturedDto.country_code
      }
    })
    if(data){
      return this.prisma.featureCountry.update({
        where:{
          id:data.id
        },
        data:{
          isFeatured:true
        }
      })
    }
    await this.prisma.featureCountry.updateMany({
      where:{
        isFeatured:true
      },
      data:{
        isFeatured:false
      }
    })
    await this.prisma.featureCountry.create({
      data:{
        country_code:createFeaturedDto.country_code,
        isFeatured:true,
        createdBy:userId}
    })

  }

  findAll() {
    return this.prisma.featureCountry.findMany();
  }

  async findFeatureSchool(query) {
    const {limit} = query;
    console.log(limit)
    const featuredata = await this.prisma.featureCountry.findFirst({
      where:{
        isFeatured:true
      }
    });
    const school = await this.prisma.school.findMany({
      where:{
        country:featuredata.country_code,
        
      },
      take: limit ||5

    })
    console.log(school)
    return school;

  }
}
