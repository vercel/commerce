import DynamicContentManager from 'components/layout/dynamic-content-manager';
import { notFound } from "next/navigation";

interface SinglePageProps {
  data: object | any
}

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function SinglePage({data }: SinglePageProps) {

  if (!data) {
    return notFound();
  }

  return (
    <DynamicContentManager content={data?.content} />
  )
}
