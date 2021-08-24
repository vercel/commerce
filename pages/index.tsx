
import { ButtonCommon, Layout } from 'src/components/common'
import { IconBuy } from 'src/components/icons'
import { ButonType, ButtonSize } from 'src/utils/constanst.utils'
import {CarouselCommon, LabelCommon, QuanittyInput } from 'src/components/common'
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
      <ButtonCommon loading={true}>Button default</ButtonCommon>
      <ButtonCommon type={ButonType.light} >{ButonType.light} -  Button light</ButtonCommon>
      <ButtonCommon type={ButonType.light} disabled>{ButonType.light} -  Button light</ButtonCommon>
      <ButtonCommon type={ButonType.light} loading = {true}>{ButonType.light} -  Button light</ButtonCommon>
      <ButtonCommon size={ButtonSize.large} icon={<IconBuy/>}>{ButtonSize.large} - Button default large</ButtonCommon>
      <ButtonCommon icon={<IconBuy/>} disabled isIconSuffix={true}>Button with icon disabled</ButtonCommon>
      <ButtonCommon icon={<IconBuy/>} type={ButonType.light}>Button with icon</ButtonCommon>
    </>
  )
}

Home.Layout = Layout
