import { useState } from 'react'
import {
  CardItemCheckout,
  CheckoutBill,
  CustomerInfoForm,
  Layout,
  ShippingInfoForm,
} from 'src/components/common'
import { CardItemCheckoutProps } from 'src/components/common/CardItemCheckout/CardItemCheckout'
import CheckoutCollapse from 'src/components/common/CheckoutCollapse/CheckoutCollapse'
import PaginationCommon from 'src/components/common/PaginationCommon/PaginationCommon'
import image5 from '../public/assets/images/image5.png'
import image6 from '../public/assets/images/image6.png'
import image7 from '../public/assets/images/image7.png'
import image8 from '../public/assets/images/image8.png'
const dataTest:CardItemCheckoutProps[] = [
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image7.src,
    quantity:10
  },
  {
    name: 'Carrot',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image7.src,
    quantity:1
  },
  {
    name: 'Salad',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image8.src,
    quantity:2
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
    quantity:9
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
      <div className="w-full flex" style={{padding: "0 3.2rem"}} >
        <div className="">
          <CheckoutCollapse id={1} visible={visible} onOpen={onOpen} onClose={onClose} title="Customer Information" isEdit={true}>
            <CustomerInfoForm/>
          </CheckoutCollapse>
          <CheckoutCollapse id={2} visible={visible2} onOpen={onOpen2} onClose={onClose2} title="Shipping Information" isEdit={true}>
            <ShippingInfoForm/>
          </CheckoutCollapse>
        </div>
        <CheckoutBill data={dataTest}/>
      </div>
    </>
  )
}

Test.Layout = Layout
