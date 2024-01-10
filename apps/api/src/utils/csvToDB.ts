import { PrismaClient } from '@prisma/application';
import * as fs from 'fs';
interface SchoolData {
  schoolName: string;
  giga_school_id: string;
  schoolType: string;
  country: string;
  longitude: number;
  latitude: number;
  connectivity: boolean;
  electricity_availability: boolean;
  coverage_availabitlity: boolean;
}

export async function handler(
  field: string,
  fileData: any,
  filename: string,
  encoding: string,
  mimetype: string,
  user: any,
): Promise<any> {
  try {
    const prisma = new PrismaClient();
    const chunks: any[] = [];
    //process the file data as it's streamed
    fileData.on('data', (chunk: any) => {
      chunks.push(chunk);
    });
    const userdata = user;
    let uploadBatch;

    uploadBatch = await new Promise((resolve, reject) => {
      fileData.on('end', async () => {
        // Now you can process the  file as needed
        const fileContent = Buffer.concat(chunks).toString();
        // Process the fileContent here

        const rows = fileContent.trim().split('\n').slice(1);
        const cleanedRows = rows.map(row => {
          // Remove trailing '\r' if present
          const cleanedRow = row
            .split(',')
            .map(value => value.trim())
            .join(',');
          return cleanedRow.replace(/\r$/, '');
        });
        await prisma.cSVUpload
          .create({
            data: {
              uploadedBy: userdata.id,
              fileValue: rows,
              fileName: filename,
            },
          })
          .then(async res => {
            uploadBatch = res;
            for (const row of cleanedRows) {
              const [
                schoolName,
                giga_school_id,
                longitudeStr,
                latitudeStr,
                schoolType,
                country,
                connectivity,
                coverage_availabitlity,
                electricity_availability,
              ] = row.split(',');

              const longitude = parseFloat(longitudeStr);
              const latitude = parseFloat(latitudeStr);

              if (isNaN(longitude) || isNaN(latitude)) {
                console.error(`Invalid longitude or latitude for school "${schoolName}"`);
                throw new Error('Invalid longitude or latitude');
              }
              const schoolData: SchoolData = {
                schoolName,
                giga_school_id,
                schoolType,
                country,
                longitude,
                latitude,
                connectivity: connectivity.toLowerCase() === 'yes' && true,
                coverage_availabitlity: coverage_availabitlity.toLowerCase() === 'yes' && true,
                electricity_availability: electricity_availability.toLowerCase() === 'yes' && true,
              };
              try {
                await prisma.school.create({
                  data: {
                    name: schoolData.schoolName,
                    giga_school_id: schoolData.giga_school_id,
                    school_type: schoolData.schoolType,
                    longitude: schoolData.longitude,
                    latitude: schoolData.latitude,
                    connectivity: schoolData.connectivity as boolean,
                    electricity_available: schoolData.electricity_availability as boolean,
                    coverage_availability: schoolData.coverage_availabitlity,
                    country: country,
                    uploadId: res.id,
                    createdById: userdata.id,
                  },
                });
                console.log(`School "${schoolName}" saved to the database.`);
              } catch (err) {
                throw err;
              }
            }
            resolve(res);
            return res;
          })
          .catch(error => {
            console.log(error);
            throw error;
          });
      });
    });

    return uploadBatch;
  } catch (error) {
    console.error('Error reading or saving CSV data:', error);
  }
}
