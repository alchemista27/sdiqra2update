export function formatUrl(url: string | undefined | null): string {
  if (!url) return '#';
  url = url.trim();
  if (url === '#' || url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return url;
  }
  return `https://${url}`;
}
