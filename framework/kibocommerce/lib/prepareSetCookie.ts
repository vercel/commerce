export function prepareSetCookie(name: string, value: string, options: any = {}): string {
  const encodedValue = Buffer.from(value).toString('base64')
  const cookieValue = [`${name}=${encodedValue}`];
 
  if (options.maxAge) {
    cookieValue.push(`Max-Age=${options.maxAge}`);
  }
 
  if (options.expires && !options.maxAge) {
    cookieValue.push(`Expires=${options.expires.toUTCString()}`);
  }
   
  const cookie = cookieValue.join('; ')
  return cookie
}