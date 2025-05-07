import { Injectable } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { WeeklyQOSDto } from './dto/reserve-nft.dto';

@Injectable()
export class QosService {
  constructor(private readonly prisma: PrismaAppService) {}

  async getlatestQOS(giga_school_id: string) {
    const stats = await this.prisma.qos.findMany({
      where: {
        giga_school_id,
      },
      orderBy: {
        date: 'desc',
      },
      select: {
        speed_download: true,
        date: true,
      },
    });

    if (stats.length === 0) {
      return { message: 'No data available', averageSpeedUpload: 0 };
    }

    // Get the latest date
    const latestDate = stats[0].date.toISOString().split('T')[0]; // Extract the latest date in YYYY-MM-DD format

    // Filter records for the latest date
    const latestDateRecords = stats.filter(
      record => record.date.toISOString().split('T')[0] === latestDate,
    );

    // Calculate the average speed_upload for the latest date
    const totalSpeedUpload = latestDateRecords.reduce(
      (sum, record) => sum + Number(record.speed_upload || 0),
      0,
    );
    const averageSpeedUpload = totalSpeedUpload / latestDateRecords.length;

    return {
      latestDate,
      averageSpeedUpload,
    };
  }

  async getWeeklyQOS(query: WeeklyQOSDto) {
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
        speed_upload: true,
        date: true,
      },
    });

    // Group data by day and calculate the average
    const dailyAverages = stats.reduce((acc, record) => {
      const day = record.date.toISOString().split('T')[0]; // Extract the date in YYYY-MM-DD format
      if (!acc[day]) {
        acc[day] = { total: 0, count: 0 };
      }
      acc[day].total += Number(record.speed_upload) || 0; // Add speed_upload value
      acc[day].count += 1; // Increment count
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    // Calculate the average for each day
    const result = Object.entries(dailyAverages).map(([day, { total, count }]) => ({
      day,
      averageSpeedUpload: total / count,
    }));

    return result;
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
