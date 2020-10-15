import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Layout } from '@components/core'
import { Container, Grid, Skeleton } from '@components/ui'
export default function Search() {
  return (
    <Container>
      <Skeleton className="w-64 h-12 rounded-md" />
    </Container>
  )
}

Search.Layout = Layout
