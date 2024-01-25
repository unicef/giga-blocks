interface SchoolData {
  name: string;
  giga_school_id: string;
  school_type: string;
  country: string;
  longitude: number;
  latitude: number;
  connectivity: boolean;
  coverage_availability: boolean;
  electricity_available: boolean;
}

export async function handler(fileData: any): Promise<any> {
  const schoolArrays = [];
  const rowValue = [];

  const chunks: any[] = [];
  //process the file data as it's streamed
  fileData.on('data', (chunk: any) => {
    chunks.push(chunk);
  });

  fileData.on('end', async () => {
    // Now you can process the  file as needed
    const fileContent = Buffer.concat(chunks).toString();
    // Process the fileContent here

    const rows = fileContent.trim().split('\n').slice(1);
    rowValue.push(rows);
    const cleanedRows = rows.map(row => {
      // Remove trailing '\r' if present
      const cleanedRow = row
        .split(',')
        .map(value => value.trim())
        .join(',');
      return cleanedRow.replace(/\r$/, '');
    });

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

      const schoolData: SchoolData = {
        name: schoolName,
        giga_school_id,
        school_type: schoolType,
        country,
        longitude,
        latitude,
        connectivity: connectivity.toLowerCase() === 'yes' && true,
        coverage_availability: coverage_availabitlity.toLowerCase() === 'yes' && true,
        electricity_available: electricity_availability.toLowerCase() === 'yes' && true,
      };

      schoolArrays.push(schoolData);
    }
  });
  return { schoolArrays, rowValue };
}
