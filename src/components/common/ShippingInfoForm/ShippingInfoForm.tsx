import React, { useRef } from 'react'
import { ButtonCommon, Inputcommon, SelectCommon } from 'src/components/common'
import s from './ShippingInfoForm.module.scss'
import Link from 'next/link'
import { CustomInputCommon } from 'src/utils/type.utils'
import { Shipping } from 'src/components/icons'

interface ShippingInfoFormProps {}

const option = [
  {
    name: 'Hồ Chí Minh',
  },
  {
    name: 'Hà Nội',
  },
]

const ShippingInfoForm = ({}: ShippingInfoFormProps) => {
  const addressRef = useRef<CustomInputCommon>(null)
  const cityRef = useRef<CustomInputCommon>(null)
  const stateRef = useRef<CustomInputCommon>(null)
  const codeRef = useRef<CustomInputCommon>(null)
  const phoneRef = useRef<CustomInputCommon>(null)
  const handleConfirmClick = () => {
    return {
      address: addressRef?.current?.getValue(),
      city: cityRef.current?.getValue(),
      state: stateRef?.current?.getValue(),
      code: codeRef.current?.getValue(),
      phone: phoneRef?.current?.getValue(),
    }
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
        <ButtonCommon onClick={handleConfirmClick}>
          Continue to Payment
        </ButtonCommon>
      </div>
    </div>
  )
}

export default ShippingInfoForm
