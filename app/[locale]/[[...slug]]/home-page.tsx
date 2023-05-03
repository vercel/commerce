import DynamicContentManager from 'components/ui/dynamic-content-manager'

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function HomePage({ data }: { data: object | any }) {
  return (
    <DynamicContentManager content={data?.content} />
  )
}
