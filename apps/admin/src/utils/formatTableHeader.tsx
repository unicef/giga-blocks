export default function FormatTableHeader(
  inputObject: Record<string, string>
): { id: string; label: string }[] {
  const outputArray = Object.entries(inputObject).map(([key, value]) => ({
    id: key,
    label: inputObject[key],
  }));

  return outputArray;
}
