
import {  Layout, ProductCard } from 'src/components/common'
import {CarouselCommon } from 'src/components/common'
import image1 from "../public/assets/images/image5.png"
const dataTest = [{
  text:1
},{
  text:2
},{
  text:3
},{
  text:4
},{
  text:5
},{
  text:6
}]
const test = (props:{text:string})=><div className="h-64 bg-yellow-300">{props.text}</div>
export default function Home() {
  return (
    <>
      <CarouselCommon data={dataTest} Component={test} itemKey="test"/>
      
      <ProductCard name="tomato" weight = "250g" category ="VEGGIE" price="Rp 27.500" imageSrc={image1.src}/>
    </>
  )
}

Home.Layout = Layout
