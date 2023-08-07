import DynamicContentManager from 'components/layout/dynamic-content-manager'

interface HomePageProps {
  data: object | any
}

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function HomePage({ data }: HomePageProps) {
  return (
    <DynamicContentManager content={data?.content} />
  )
}
