import { useState } from 'react'
import {
  ButtonCommon,
  Layout,
  ModalCommon,
  ModalConfirm,
  ModalInfo,
  ProductCarousel,
  ProductList,
} from 'src/components/common'
import PaginationCommon from 'src/components/common/PaginationCommon/PaginationCommon'
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
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
    {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Cucumber',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image6.src,
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
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Cucumber',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image6.src,
  },
  {
    name: 'Tomato',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image5.src,
  },
  {
    name: 'Cucumber',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image6.src,
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
    name: 'Cucumber',
    weight: '250g',
    category: 'VEGGIE',
    price: 'Rp 27.500',
    imageSrc: image6.src,
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
  return (
    <>
      <ButtonCommon onClick={onOpen}>open</ButtonCommon>
      <ModalInfo visible={visible} onClose={onClose}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi qui, esse eos nobis soluta suscipit aliquid nostrum corporis. Nihil eligendi similique recusandae minus mollitia aliquam, molestias fugit tenetur voluptatibus maiores et. Quaerat labore corporis inventore nostrum, amet autem exercitationem eligendi?
      </ModalInfo>
      <PaginationCommon total={40} pageSize={10}/>
      <ProductList data={dataTest}/>
    </>
  )
}

Test.Layout = Layout
