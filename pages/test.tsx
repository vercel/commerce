import { useState } from 'react'
import {
  ButtonCommon,
  Layout,
  ModalCommon,
  ProductCarousel,
} from 'src/components/common'
import { CollectionCarcousel } from 'src/components/modules/home'
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
      <ModalCommon visible={visible} onClose={onClose}>
        <div className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          officiis dolorum ea incidunt. Sint, cum ullam. Labore vero quod
          itaque, officia magni molestias! Architecto deserunt soluta laborum
          commodi nesciunt delectus similique temporibus distinctio? Facere
          eaque minima enim modi magni, laudantium, animi mollitia beatae
          repudiandae maxime labore error nesciunt, nisi est?
        </div>
      </ModalCommon>
      <ProductCarousel
        data={dataTest}
        itemKey="product-2"
        isDot
        option={{
          slidesPerView: 1,
          breakpoints: {
            '(min-width: 640px)': {
              slidesPerView: 3,
            },
            '(min-width: 768px)': {
              slidesPerView: 4,
            },
            '(min-width: 1024px)': {
              slidesPerView: 4.5,
            },
            '(min-width: 1280px)': {
              slidesPerView: 5.5,
            },
          },
        }}
      />
    </>
  )
}

Test.Layout = Layout
