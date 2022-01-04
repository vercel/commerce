export const getDeploymentUrl = () => {
  // Custom environment variable.
  if (process.env.NEXT_PUBLIC_COMMERCEJS_DEPLOYMENT_URL) {
    return process.env.NEXT_PUBLIC_COMMERCEJS_DEPLOYMENT_URL
  }
  // Automatic Vercel deployment URL.
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }
  // Assume local development.
  return 'http://localhost:3000'
}
