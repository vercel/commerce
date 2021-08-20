
import { ButtonCommon, CarouselCommon, Layout } from 'src/components/common'
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
const test = (props:any)=><div className="h-64 bg-yellow-300">{props.text}</div>
export default function Home() {


  return (
    <>
      <div>This is home page</div>
      <ButtonCommon />
      <p>Go to <code>pages/index.tsx</code> to get your hand dirty!</p>
      <p>Go to <code>src/components</code> to make your awesome component!</p>
      <p>Go to <code>src/styles</code> to find global styles!</p>
      <CarouselCommon data={dataTest} Component={test} key="test"/>
        
    </>
  )
}

Home.Layout = Layout
