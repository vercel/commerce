import React, { useRef } from 'react'
import { ButtonCommon, Inputcommon, SelectCommon } from 'src/components/common'
import s from './ShippingInfoForm.module.scss'
import Link from 'next/link'
import { CustomInputCommon } from 'src/utils/type.utils'
import { Shipping } from 'src/components/icons'
import { CheckOutForm } from 'src/utils/types.utils'

interface ShippingInfoFormProps {
  onConfirm?: (id:number,formInfo:CheckOutForm)=>void
  id:number
}

const option = [
  {
    name: 'Hồ Chí Minh',
  },
  {
    name: 'Hà Nội',
  },
]

const ShippingInfoForm = ({onConfirm,id}: ShippingInfoFormProps) => {
  const addressRef = useRef<CustomInputCommon>(null)
  const cityRef = useRef<CustomInputCommon>(null)
  const stateRef = useRef<CustomInputCommon>(null)
  const codeRef = useRef<CustomInputCommon>(null)
  const phoneRef = useRef<CustomInputCommon>(null)
  const handleConfirmClick = () => {
    onConfirm && onConfirm(id,{
      address: addressRef?.current?.getValue().toString(),
      city: cityRef.current?.getValue().toString(),
      state: stateRef?.current?.getValue().toString(),
      code: Number(codeRef.current?.getValue()),
      phone: Number(phoneRef?.current?.getValue()),
    })
  }

  return (
    <div className={s.warpper}>
      <div className={s.body}>
        <Inputcommon
          type="text"
          placeholder="Street Address"
          ref={addressRef}
        />
        <Inputcommon type="text" placeholder="City" ref={cityRef} />
        <div className={s.line}>
          <SelectCommon option={option} type="custom" size="large">State</SelectCommon>
          <Inputcommon type="text" placeholder="Zip Code" ref={codeRef} />
        </div>
        <Inputcommon
          type="text"
          placeholder="Phone (delivery contact)"
          ref={phoneRef}
        />
				<div className={s.method}>
					<div className={s.left}>
						<div className={s.icon}>
							<Shipping/>
						</div>
						<div className={s.name}>
							Standard Delivery Method
						</div>
					</div>
					<div className={s.right}>
						<div className={s.price}>
							Free
						</div>
					</div>
				</div>
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
            Continue to Payment
          </ButtonCommon>
        </div>
      </div>
    </div>
  )
}

export default ShippingInfoForm
