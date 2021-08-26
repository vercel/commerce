export function prepareSetCookie(name: string, value: string, options: any = {}): string {
  const cookieValue = [`${name}=${value}`];
 
  if (options.maxAge) {
    cookieValue.push(`Max-Age=${options.maxAge}`);
  }
 
  if (options.expires && !options.maxAge) {
    cookieValue.push(`Expires=${options.expires.toUTCString()}`);
  }
 
  return cookieValue.join('; ');
}