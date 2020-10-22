type Props = {
  src: string
  width?: number
}

type LoaderProps = Props & { root: string }

function normalizeSrc(src: string) {
  return src[0] === '/' ? src.slice(1) : src
}

// This is the same loader used by Next.js in the Image Component, we have it here too
// so we can create image URLs for meta tags
function bcImageLoader({ root, src, width }: LoaderProps): string {
  return `${root}${normalizeSrc(
    width ? src.replace('/original/', `/${width}w/`) : src
  )}`
}

export default function bcImageSrc(props: Props) {
  return bcImageLoader({ root: 'https://cdn11.bigcommerce.com/', ...props })
}
