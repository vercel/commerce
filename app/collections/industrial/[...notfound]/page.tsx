import NotFound from '@/app/not-found'
import { notFound } from 'next/navigation'

export default function CatchAllNotFoundPage() {
  return <NotFound />
}
