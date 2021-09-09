import React, { useState } from 'react'
import { Logo } from 'src/components/common'
import CheckoutCollapse from 'src/components/common/CheckoutCollapse/CheckoutCollapse'
import { removeItem } from 'src/utils/funtion.utils'
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

  const onEdit = (id:number) => {
		setActive(id)
    setDone(removeItem<number>(done,id))
	}

  const onConfirm = (id:number,formInfo:CheckOutForm) => {
		if(id+1>formList.length){
			console.log({...info,...formInfo})
		}else{
      if(done.length>0){
        for (let i = id+1; i <= formList.length; i++) {
          if(!done.includes(i)){
            setActive(i)
          }
        }
      }else{
        setActive(id+1)
      }
      setDone([...done,id])
		}
		setInfo({...info,...formInfo})
	}

  const getNote = (id:number) => {
    switch (id) {
      case 1:
        return `${info.name}, ${info.email}`
        case 2:
          return `${info.address}, ${info.state}, ${info.city}, ${info.code}, ${info.phone}, `
      default:
        return ""
    }
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
        let note = getNote(item.id)
        return <CheckoutCollapse
					key={item.title}
          id={item.id}
          visible={item.id === active}
          title={item.title}
          onEditClick={onEdit}
          isEdit={done.includes(item.id)}
          note={note}
        >
          {item.form}
        </CheckoutCollapse>
      })}
    </div>
  )
}

export default CheckoutInfo
