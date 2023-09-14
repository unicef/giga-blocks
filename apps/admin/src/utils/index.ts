export function truncateText(text: String) {
  const maxLength = 32;
  const preLength = 15;
  const postLength = 8;
  if (text.length <= maxLength) return text;
  const preText = text.slice(0, preLength);
  const postText = text.slice(-postLength);
  return `${preText}....${postText}`;
}
