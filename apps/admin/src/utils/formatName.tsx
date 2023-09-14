export default function capitalizeFirstLetter(str: string | string[] | undefined): string {
  if (typeof str === 'string') {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return ''; // or handle the case when str is an array or undefined
}
