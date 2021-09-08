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
import { CheckoutInfo } from 'src/components/modules/checkout'
import image5 from '../public/assets/images/image5.png'
import image6 from '../public/assets/images/image6.png'
import image7 from '../public/assets/images/image7.png'
import image8 from '../public/assets/images/image8.png'
const dataTest:CardItemCheckoutProps[] = [
  {
    name: 'Tomato',
    slug: "tomato",
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image7.src,
    quantity:10
  },
  {
    name: 'Carrot',
    slug: "carrot",
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image7.src,
    quantity:1
  },
  {
    name: 'Salad',
    slug:"salad",
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image8.src,
    quantity:2
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
      <div className="w-full flex justify-between" style={{padding: "0 3.2rem"}} >
        <CheckoutInfo/>
        <CheckoutBill data={dataTest}/>
      </div>
    </>
  )
}

Test.Layout = Layout
