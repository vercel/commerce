
import {  FeaturedProductCard, Layout, ProductCaroucel, RecipeCard } from 'src/components/common'
import image5 from "../public/assets/images/image5.png"
import image6 from "../public/assets/images/image6.png"
import image7 from "../public/assets/images/image7.png"
import image8 from "../public/assets/images/image8.png"
import image9 from "../public/assets/images/image9.png"
import image10 from "../public/assets/images/image10.png"
import image11 from "../public/assets/images/image11.png"
import image12 from "../public/assets/images/image12.png"
import image13 from "../public/assets/images/image13.png"
import image14 from "../public/assets/images/image14.png"
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
      <ProductCaroucel data={dataTest} itemKey="product-1" isDot={true}/>
      <div>
        <FeaturedProductCard title="Sale 25% Coffee Bean" subTitle="50 first Orders within a day" price="$15.00" originPrice="$20.00" imageSrc={image9.src} />
        <RecipeCard title="Sale 25% Coffee Bean" imageSrc={image12.src} description="Alright, before we get to the actual recipe, let’s chat for a sec about the ingredients.  To make this pho soup recipe, you will need:" />
      </div>
    </>
  )
}

// Home.Layout = Layout
