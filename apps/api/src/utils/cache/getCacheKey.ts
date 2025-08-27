import { MintStatus } from '@prisma/application';
export const getCacheKey = (schoolName: string, country: string,minted:MintStatus,page:number,perPage:number) => {
  const segements: string[] = ['school_search'];

  const normalizedSchoolName =  schoolName?.toLowerCase().trim();
  if (normalizedSchoolName) {
    segements.push(`${normalizedSchoolName}`);
  } 
  const normalizedCountry =  country?.toLowerCase().trim();
  if (normalizedCountry) {
    segements.push(`${normalizedCountry}`);
  }
  if (minted) {
    segements.push(`${minted}`);
  } 
  segements.push(`${page}`);
  segements.push(`${perPage}`);
  return segements.join(':');
};
