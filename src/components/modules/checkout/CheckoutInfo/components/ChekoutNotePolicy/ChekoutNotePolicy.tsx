import Link from 'next/link'
import React, { memo } from 'react'
import { ROUTE } from 'src/utils/constanst.utils'
import s from './ChekoutNotePolicy.module.scss'

const ChekoutNotePolicy = memo(() => {
  return (
    <div className={s.chekoutNotePolicy}>
      By clicking continue you agree to Casper's{' '}
      {
        <Link href={ROUTE.TERM_CONDITION}>
          <a>
            <strong>terms and conditions</strong>
          </a>
        </Link>
      }{' '}
      and{' '}
      {
        <Link href={ROUTE.PRIVACY_POLICY}>
          <a>
            <strong>privacy policy</strong>
          </a>
        </Link>
      }
      .
    </div>
  )
})

ChekoutNotePolicy.displayName = 'ChekoutNotePolicy'
export default ChekoutNotePolicy
