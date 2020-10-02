import cn from 'classnames'
import React, { FunctionComponent } from 'react'
import s from './Footer.module.css'
import { Container } from '@components/ui'

interface Props {
  className?: string
  children?: any
}

const Footer: FunctionComponent<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className)
  return (
    <footer className={rootClassName}>
      <Container className={s.container}></Container>
    </footer>
  )
}

export default Footer
