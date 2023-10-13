export function truncateText(text: String) {
  const maxLength = 32;
  const preLength = 15;
  const postLength = 8;
  if (text.length <= maxLength) return text;
  const preText = text.slice(0, preLength);
  const postText = text.slice(-postLength);
  return `${preText}....${postText}`;
}

export function separateUniqueAndDuplicates(arr: any) {
  const uniqueArray: string[] = [];
  const duplicates: string[] = [];
  arr?.map((d:any) => {
    const objString: string = JSON.stringify(d);
    if (!uniqueArray.includes(objString)) {
      return uniqueArray.push(objString);
    }
    return duplicates.push(objString);
  });
  const uniqueData = uniqueArray.map((objString) => JSON.parse(objString));
  return { unique: uniqueData, duplicate: duplicates };
}
