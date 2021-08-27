import React from 'react'
import { CollectionCarcoucel } from '..'
import image5 from '../../../../../public/assets/images/image5.png'
import image6 from '../../../../../public/assets/images/image6.png'
import image7 from '../../../../../public/assets/images/image7.png'
import image8 from '../../../../../public/assets/images/image8.png'
interface HomeCollectionProps {}
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

const HomeCollection = (props: HomeCollectionProps) => {
  return (
    <div className="w-full">
      <CollectionCarcoucel
        data={dataTest}
        itemKey="product-1"
        title="VEGGIE"
        subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
      />
      <CollectionCarcoucel
        data={dataTest}
        itemKey="product-2"
        title="VEGGIE"
        subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
      />
      <CollectionCarcoucel
        data={dataTest}
        itemKey="product-3"
        title="VEGGIE"
        subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
      />
      <CollectionCarcoucel
        data={dataTest}
        itemKey="product-4"
        title="VEGGIE"
        subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
      />
      <CollectionCarcoucel
        data={dataTest}
        itemKey="product-5"
        title="VEGGIE"
        subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
      />
      <CollectionCarcoucel
        data={dataTest}
        itemKey="product-6"
        title="VEGGIE"
        subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
      />
    </div>
  )
}

export default HomeCollection
