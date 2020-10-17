import { Layout } from '@components/core'
import { Container, Skeleton } from '@components/ui'
export default function Search() {
  return (
    <Container>
      <Skeleton className="w-64 h-12 rounded-md" />
    </Container>
  )
}

Search.Layout = Layout
