import { MintStatus } from '@prisma/application';
export const getCacheKey = (schoolName: string, country: string,minted:MintStatus,page:number,perPage:number) => {
  const normalizedSchoolName = schoolName ? schoolName.toLowerCase().trim() : '*';
  const normalizedCountry = country ? country.toLowerCase().trim() : '*';
  return `school_search:${normalizedSchoolName}:${normalizedCountry}:${minted}${page}:${perPage}`;
};
