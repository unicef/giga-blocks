export default function TableFormatter(array: any[][]): Record<string, any[]> {
  const convertedObject: Record<string, any[]> = {};

  for (let i = 0; i < array[0]?.length; i += 1) {
    const key: string = array[0][i];
    const values: any[] = array.slice(1).map((row) => row[i]);
    convertedObject[key] = values;
  }

  return convertedObject;
}
