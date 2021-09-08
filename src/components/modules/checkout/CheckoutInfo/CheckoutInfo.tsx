import React, { useState } from 'react'
import { Logo } from 'src/components/common'
import CheckoutCollapse from 'src/components/common/CheckoutCollapse/CheckoutCollapse'
import { CheckOutForm } from 'src/utils/types.utils'
import s from './CheckoutInfo.module.scss'
import CustomerInfoForm from './components/CustomerInfoForm/CustomerInfoForm'
import PaymentInfoForm from './components/PaymentInfoForm/PaymentInfoForm'
import ShippingInfoForm from './components/ShippingInfoForm/ShippingInfoForm'
interface CheckoutInfoProps {}

const CheckoutInfo = ({}: CheckoutInfoProps) => {
  const [active, setActive] = useState(1)
  const [done, setDone] = useState<number[]>([])
  const [info, setInfo] = useState<CheckOutForm>({})
  const onOpen = (id:number) => {
		setActive(id)
	}

  const onEdit = (id:number) => {
		setActive(id)
	}

  const onClose = (id:number) => {
		setActive(id)
	}

  const onConfirm = (id:number,formInfo:CheckOutForm) => {
		if(id+1>formList.length){
			console.log({...info,...formInfo})
		}else{

			setActive(id+1)
		}
		setDone([...done,id])
		setInfo({...info,...formInfo})
	}
  const formList = [
    {
      id: 1,
      title: 'Customer Information',
      form: <CustomerInfoForm onConfirm={onConfirm} id={1}/>,
    },
    {
      id: 2,
      title: 'Shipping Information',
      form: <ShippingInfoForm onConfirm={onConfirm} id={2}/>,
    },
    {
      id: 3,
      title: 'Payment Information',
      form: <PaymentInfoForm onConfirm={onConfirm} id={3}/>,
    },
  ]
  return (
    <div className={s.warpper}>
      <div className={s.title}>
        <Logo />
      </div>
      {formList.map((item) => {
        return <CheckoutCollapse
					key={item.title}
          id={item.id}
          visible={item.id === active}
          title={item.title}
          onEditClick={onEdit}
          isEdit={done.includes(item.id)}
        >
          {item.form}
        </CheckoutCollapse>
      })}
      {/* <CheckoutCollapse
        id={1}
        visible={active === 1}
        // onOpen={onOpen}
        // onClose={onClose}
        title="Customer Information"
        isEdit={true}
      >
        <CustomerInfoForm />
      </CheckoutCollapse>
      <CheckoutCollapse
        id={2}
        visible={active === 2}
        // onOpen={onOpen2}
        // onClose={onClose2}
        title="Shipping Information"
        isEdit={true}
      >
        <ShippingInfoForm />
      </CheckoutCollapse> */}
    </div>
  )
}

export default CheckoutInfo
