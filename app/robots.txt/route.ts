export function GET() {
  const content = `User-agent: *\nAllow: /\nSitemap: ${process.env.NEXTAUTH_URL || 'https://example.com'}/sitemap.xml\n`
  return new Response(content, { headers: { 'Content-Type': 'text/plain' } })
}


