import Link from 'next/link'
import React, { useRef } from 'react'
import { ButtonCommon, Inputcommon } from 'src/components/common'
import InputCommon from 'src/components/common/InputCommon/InputCommon'
import s from './CustomerInfoForm.module.scss'
interface CustomerInfoFormProps {
	onConfirm?: ()=>void
}

const CustomerInfoForm = ({}: CustomerInfoFormProps) => {
	const nameRef =  useRef<React.ElementRef<typeof InputCommon>>(null);
	const emailRef =  useRef<React.ElementRef<typeof InputCommon>>(null);



	const handleConfirmClick = () => {
		return {
			name:nameRef?.current?.getValue(),
			email:emailRef.current?.getValue()
		}
	}

  return (
    <div className={s.warpper}>
      <div className={s.body}>
        <Inputcommon type="text" placeholder="Full Name" ref={nameRef}/>
        <Inputcommon type="text" placeholder="Email Address" ref={emailRef}/>
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
        <ButtonCommon onClick={handleConfirmClick}>Continue to Shipping</ButtonCommon>
      </div>
    </div>
  )
}

export default CustomerInfoForm
