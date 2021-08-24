
import { useState } from 'react'
import {CarouselCommon, LabelCommon, Layout, QuanittyInput } from 'src/components/common'
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
      <QuanittyInput size ="default" min={5} max={10} initValue={3}/>
      <QuanittyInput size ="small" min={3} step={10}/>
      <LabelCommon type="default" shape="half" >SEEFOOT</LabelCommon>
      <LabelCommon type="discount" shape="round">-15%</LabelCommon>
      <LabelCommon type="waiting">Waitting</LabelCommon>
      <LabelCommon type="delivering" >Delivering</LabelCommon>
      <LabelCommon type="delivered">Delivered</LabelCommon>
    </>
  )
}

Home.Layout = Layout
