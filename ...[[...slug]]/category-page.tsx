import { notFound } from "next/navigation";

interface CategoryPageProps {
  data: object | any
}

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function CategoryPage({data }: CategoryPageProps) {

  if (!data) {
    return notFound();
  }

  return (
    <div>Category: {data?.title}</div>
  )
}
