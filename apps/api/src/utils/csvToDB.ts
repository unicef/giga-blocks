interface SchoolData {
  school_id_giga: string;
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
        school_id_giga,
  
      ] = row.split(',');

      

    const schoolData: SchoolData = {
      school_id_giga,
        
    };

    schoolArrays.push(schoolData);
    }
  });
  return { schoolArrays, rowValue };
}
