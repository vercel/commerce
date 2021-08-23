
import {CarouselCommon, Layout, QuanittyInput } from 'src/components/common'
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
      <CarouselCommon data={dataTest} Component={test} itemKey="test"/>
      <QuanittyInput/>
      <input type="number" />
      <input type="text" />
    </>
  )
}

Home.Layout = Layout
