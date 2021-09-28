import React from 'react'
import s from './LoadingCommon.module.scss'

interface Props {
  description?: string
}

const LoadingCommon = ({ description = 'Loading...' }: Props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.loadingCommon}></div>
      <p className={s.text}>{description}</p>
    </div>
  )
}

export default LoadingCommon
