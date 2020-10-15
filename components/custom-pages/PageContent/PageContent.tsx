import cn from 'classnames'
import s from './PageContent.module.css'

type Props = {
  className?: 'string'
  html: string
}

export default function PageContent({ className, html }: Props) {
  return (
    <div
      className={cn(s.root, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
