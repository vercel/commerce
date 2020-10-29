import cn from 'classnames'
import s from './HTMLContent.module.css'

type Props = {
  className?: 'string'
  html: string
}

export default function HTMLContent({ className, html }: Props) {
  return (
    <div
      className={cn(s.root, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
