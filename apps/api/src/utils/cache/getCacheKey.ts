import { MintStatus } from '@prisma/application';
export const getCacheKey = (schoolName: string, country: string, page: string, perPage: string,minted:MintStatus) => {
  const normalizedSchoolName = schoolName ? schoolName.toLowerCase().trim() : '*';
  const normalizedCountry = country ? country.toLowerCase().trim() : '*';
  return `school_search:${normalizedSchoolName}:${normalizedCountry}:${page}:${perPage}:${minted}`;
};
