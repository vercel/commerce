import { FC } from 'react'
import s from './PaymentWidget.module.css'
import { ChevronRight, CreditCard, Pencil } from '@components/icons'
import { useUI } from '@components/ui/context'

interface ComponentProps {
  onClick?: () => any
}

const PaymentWidget: FC<ComponentProps> = ({ onClick }) => {
  const { paymentMethodDetails } = useUI()

  console.log(paymentMethodDetails)

  /* Shipping Address
  Only available with checkout set to true -
  This means that the provider does offer checkout functionality. */
  return (
    <div onClick={onClick} className={s.root}>
      <div className="flex flex-1 items-center">
        <CreditCard className="w-5 flex" />
        <div className="ml-5 text-sm text-left font-medium">
          {paymentMethodDetails?.paymentMethod ?
            <span className="text-left">
                 {paymentMethodDetails.address.cardholderName}<br/>
                 {paymentMethodDetails.paymentMethod.card.brand.toUpperCase()} **** **** **** {paymentMethodDetails.paymentMethod.card.last4}
            </span>
            :
            <span>  Add Payment Method</span>
          }
        </div>
      </div>
      <div>
        {paymentMethodDetails?.paymentMethod ?
          <Pencil />
        :
          <ChevronRight />
        }
      </div>
    </div>
  )
}

export default PaymentWidget
