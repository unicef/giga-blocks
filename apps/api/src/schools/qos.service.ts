import { Injectable } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { WeeklyQOSDto } from './dto/reserve-nft.dto';

@Injectable()
export class QosService {
  constructor(private readonly prisma: PrismaAppService) {}

  async getWeeklyQOS(query: WeeklyQOSDto) {
    const { giga_school_id, startDate, endDate } = query;
    const stats = await this.prisma.qos.findMany({
      where: {
        giga_school_id,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      select:{
        speed_upload: true,
      }
    });
    return stats;
  }

  async getMonthlyQOS(query: WeeklyQOSDto) {
    const { giga_school_id, startDate, endDate } = query;

    // Fetch all data within the date range
    const stats = await this.prisma.qos.findMany({
      where: {
        giga_school_id,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      select: {
        date: true, // Include the date field for grouping
        speed_upload: true, // Include the field to calculate the average
      },
    });

    // Group data by month and calculate the average
    const monthlyAverages = stats.reduce((acc, record) => {
      const month = `${record.date.getFullYear()}-${record.date.getMonth() + 1}`; // Format: YYYY-MM
      if (!acc[month]) {
        acc[month] = { total: 0, count: 0 };
      }
      acc[month].total += Number(record.speed_upload) || 0; // Add speed_upload value
      acc[month].count += 1; // Increment count
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    // Calculate the average for each month
    const result = Object.entries(monthlyAverages).map(([month, { total, count }]) => ({
      month,
      averageSpeedUpload: total / count,
    }));

    return result;
  }
}

