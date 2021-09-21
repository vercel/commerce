import Link from 'next/link'
import React, { useRef } from 'react'
import { ButtonCommon, Inputcommon } from 'src/components/common'
import InputCommon from 'src/components/common/InputCommon/InputCommon'
import { CheckOutForm } from 'src/utils/types.utils'
import s from './CustomerInfoForm.module.scss'
interface CustomerInfoFormProps {
  onConfirm?: (id: number, formInfo: CheckOutForm) => void
  id: number
}

const CustomerInfoForm = ({ id, onConfirm }: CustomerInfoFormProps) => {
  const nameRef = useRef<React.ElementRef<typeof InputCommon>>(null)
  const emailRef = useRef<React.ElementRef<typeof InputCommon>>(null)

  const handleConfirmClick = () => {
    onConfirm &&
      onConfirm(id, {
        name: nameRef?.current?.getValue().toString(),
        email: emailRef.current?.getValue().toString(),
      })
  }

  return (
    <div className={s.warpper}>
      <div className={s.body}>
        <Inputcommon type="text" placeholder="Full Name" ref={nameRef} />
        <Inputcommon type="text" placeholder="Email Address" ref={emailRef} />
      </div>
      <div className={s.bottom}>
        <div className={s.note}>
          By clicking continue you agree to Casper's{' '}
          {
            <Link href="#">
              <strong>terms and conditions</strong>
            </Link>
          }{' '}
          and{' '}
          {
            <Link href="#">
              <strong>privacy policy </strong>
            </Link>
          }
          .
        </div>
        <div className={s.button}>
          <ButtonCommon onClick={handleConfirmClick}>
            Continue to Shipping
          </ButtonCommon>
        </div>
      </div>
    </div>
  )
}

export default CustomerInfoForm
