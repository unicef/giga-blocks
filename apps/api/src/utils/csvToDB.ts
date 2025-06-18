interface SchoolData {
  school_id_giga: string;
}

export async function handler(fileData: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const schoolArrays: SchoolData[] = [];
    const rowValue: string[][] = [];

    const chunks: any[] = [];
    fileData.on('data', (chunk: any) => {
      chunks.push(chunk);
    });

    fileData.on('end', async () => {
      try {
        const fileContent = Buffer.concat(chunks).toString();

        const rows = fileContent.trim().split('\n').slice(1);
        rowValue.push(rows);
        const cleanedRows = rows.map(row => {
          const cleanedRow = row
            .split(',')
            .map(value => {
              let trimmedValue = value.trim();
              if (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) {
                return trimmedValue.slice(1, -1);
              }
              return trimmedValue;
            })
            .join(',');
          return cleanedRow.replace(/\r$/, '');
        });

        for (const row of cleanedRows) {
          const [school_id_giga] = row.split(',');
          const schoolData: SchoolData = {
            school_id_giga,
          };
          schoolArrays.push(schoolData);
        }

        console.log('Processed school data:', schoolArrays.length);
        resolve({ schoolArrays, rowValue });
      } catch (error) {
        console.error('Error processing file content within "end" event:', error);
        reject(new Error('Failed to process the file content'));
      }
    });

    fileData.on('error', (error: any) => {
      console.error('Error reading file stream:', error);
      reject(new Error('Failed to read the file stream'));
    });
  });
}
