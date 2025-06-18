import { Injectable } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { DailyQOSDto, WeeklyQOSDto } from './dto/reserve-nft.dto';

@Injectable()
export class QosService {
  constructor(private readonly prisma: PrismaAppService) {}

  async getlatestQOS(data: DailyQOSDto) {
    const { giga_school_id } = data;
    const stats = await this.prisma.qos.findMany({
      where: {
        giga_school_id,
      },
      orderBy: {
        date: 'desc',
      },
      select: {
        speed_download_mean: true,
        date: true,
      },
    });

    if (stats.length === 0) {
      return { message: 'No data available', averageDownloadSpeed: 0 };
    }

    // Get the latest date
    const latestDate = stats[0].date.toISOString().split('T')[0]; // Extract the latest date in YYYY-MM-DD format

    // Filter records for the latest date
    const latestDateRecords = stats.filter(
      record => record.date.toISOString().split('T')[0] === latestDate,
    );

    // Calculate the average speed_download_mean for the latest date
    const totalSpeedDownload = latestDateRecords.reduce(
      (sum, record) => sum + Number(record.speed_download_mean || 0),
      0,
    );
    const averageDownloadSpeed = totalSpeedDownload / latestDateRecords.length;

    return {
      latestDate,
      averageDownloadSpeed,
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
      speed_upload_mean: true,
      date: true,
    },
  });

  // Group data by day (YYYY-MM-DD in UTC)
  const dailyAverages = stats.reduce((acc, record) => {
    const day = record.date.toISOString().slice(0, 10); // YYYY-MM-DD
    if (!acc[day]) {
      acc[day] = { total: 0, count: 0 };
    }
    acc[day].total += Number(record.speed_upload_mean) || 0;
    acc[day].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const result: { day: string; averageSpeedUpload: number }[] = [];
  let current = new Date(startDate);
  const end = new Date(endDate);
  let allZeros = true; 

  while (current <= end) {
    // Always use UTC for comparison
    const dayStr = current.toISOString().slice(0, 10);
    let averageSpeedUpload = 0;

    if (dailyAverages[dayStr]) {
      averageSpeedUpload = dailyAverages[dayStr].total / dailyAverages[dayStr].count;
    }

    if (averageSpeedUpload !== 0) {
      allZeros = false;
    }

    result.push({
      day: dayStr,
      averageSpeedUpload: averageSpeedUpload,
    });

    current.setUTCDate(current.getUTCDate() + 1);
  }

  if (allZeros) {
    return {status: 200, message: "No data found"}; 
  }

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
        date: true,
        speed_upload_mean: true,
      },
    });

    // Group data by month and calculate the average
    const monthlyAverages = stats.reduce((acc, record) => {
      const month = `${record.date.getUTCFullYear()}-${String(
        record.date.getUTCMonth() + 1,
      ).padStart(2, '0')}`; // Format: YYYY-MM
      if (!acc[month]) {
        acc[month] = { total: 0, count: 0 };
      }
      acc[month].total += Number(record.speed_upload_mean) || 0;
      acc[month].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    // Generate all months in the range
    const result: { month: string; averageSpeedUpload: number }[] = [];
    let current = new Date(
      Date.UTC(new Date(startDate).getUTCFullYear(), new Date(startDate).getUTCMonth(), 1),
    );
    const end = new Date(
      Date.UTC(new Date(endDate).getUTCFullYear(), new Date(endDate).getUTCMonth(), 1),
    );

    while (current <= end) {
      const monthStr = `${current.getUTCFullYear()}-${String(current.getUTCMonth() + 1).padStart(
        2,
        '0',
      )}`;
      if (monthlyAverages[monthStr]) {
        result.push({
          month: monthStr,
          averageSpeedUpload: monthlyAverages[monthStr].total / monthlyAverages[monthStr].count,
        });
      } else {
        result.push({
          month: monthStr,
          averageSpeedUpload: 0,
        });
      }
      // Move to next month
      current.setUTCMonth(current.getUTCMonth() + 1);
    }

    return result;
  }
}
