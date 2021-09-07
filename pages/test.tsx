import { useState } from 'react'
import {
  CardItemCheckout,
  Layout,
} from 'src/components/common'
import PaginationCommon from 'src/components/common/PaginationCommon/PaginationCommon'
import CheckoutCollapse from 'src/components/modules/checkout/components/CheckoutCollapse/CheckoutCollapse'
import CustomerInfoForm from 'src/components/modules/checkout/components/CustomerInfoForm/CustomerInfoForm'
import ShippingInfoForm from 'src/components/modules/checkout/components/ShippingInfoForm/ShippingInfoForm'
import image5 from '../public/assets/images/image5.png'
import image6 from '../public/assets/images/image6.png'
import image7 from '../public/assets/images/image7.png'
import image8 from '../public/assets/images/image8.png'
const dataTest = [
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image7.src,
  },
  {
    name: 'Carrot',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image7.src,
  },
  {
    name: 'Salad',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image8.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Carrot',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image7.src,
  },
  {
    name: 'Salad',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image8.src,
  },
]
export default function Test() {
  const [visible, setVisible] = useState(false)
  const onClose = () => {
    setVisible(false)
  }
  const onOpen = () => {
    setVisible(true)
  }
  const [visible2, setVisible2] = useState(false)
  const onClose2 = () => {
    setVisible2(false)
  }
  const onOpen2 = () => {
    setVisible2(true)
  }
  return (
    <>
      <CardItemCheckout {...dataTest[0]} quantity={2}/>
      <div className="w-full" style={{padding: "0 3.2rem"}} >
        <CheckoutCollapse id={1} visible={visible} onOpen={onOpen} onClose={onClose} title="Customer Information" isEdit={true}>
          <CustomerInfoForm/>
        </CheckoutCollapse>
        <CheckoutCollapse id={2} visible={visible2} onOpen={onOpen2} onClose={onClose2} title="Shipping Information" isEdit={true}>
          <ShippingInfoForm/>
        </CheckoutCollapse>
      </div>
    </>
  )
}

Test.Layout = Layout
