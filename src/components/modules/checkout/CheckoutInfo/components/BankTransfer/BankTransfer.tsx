import React from 'react'
import s from './BankTransfer.module.scss'
interface BankTransferProps {}

const BankTransfer = ({}: BankTransferProps) => {
  return (
    <div className={s.warpper}>
      <div className={s.info}>
        <div className={s.line}>
          <div className={s.title}>Account Name:</div>
          <div className={s.hightlight}>Duong Dinh Vu</div>
        </div>
        <div className={s.line}>
          <div className={s.title}>Account Number:</div>
          <div className={s.hightlight}>1234 1234 1234 1234</div>
        </div>
        <div className={s.line}>
          <div className={s.title}>Bank Name:</div>
          <div className={s.hightlight}>Techcombank - HCMC</div>
        </div>
      </div>
    </div>
  )
}

export default BankTransfer
