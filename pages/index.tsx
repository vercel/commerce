
import {  Layout, ProductCard } from 'src/components/common'
import {CarouselCommon } from 'src/components/common'
import ProductCaroucel from 'src/components/common/ProductCaroucel/ProductCaroucel'
import image5 from "../public/assets/images/image5.png"
import image6 from "../public/assets/images/image6.png"
import image7 from "../public/assets/images/image7.png"
import image8 from "../public/assets/images/image8.png"
const dataTest = [{
  name:"Tomato",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image5.src
},{
  name:"Cucumber",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image6.src
},{
  name:"Carrot",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image7.src
},{
  name:"Salad",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image8.src
},{
  name:"Tomato",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image5.src
},{
  name:"Cucumber",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image6.src
},{
  name:"Tomato",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image5.src
},{
  name:"Cucumber",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image6.src
},{
  name:"Carrot",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image7.src
},{
  name:"Salad",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image8.src
},{
  name:"Tomato",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image5.src
},{
  name:"Cucumber",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image6.src
}]
export default function Home() {
  return (
    <>
      <ProductCaroucel data={dataTest} itemKey="product-1" />
    </>
  )
}

Home.Layout = Layout
