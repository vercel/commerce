export function setCookies(res: any, cookies: string[]): void {
    res.setHeader('Set-Cookie', cookies);
}