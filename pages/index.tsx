
import { ButtonCommon, Layout, ViewAllItem, ItemWishList, Logo, SelectCommon } from 'src/components/common'
import { IconBuy } from 'src/components/icons'
import { ButonType, ButtonSize, } from 'src/utils/constanst.utils'

const OPTION_SORT = [
  {
    name: 'By Name',
  },
  {
    name: 'Price (Hight to Low)',
  },
  {
    name: 'On Sale',
  }
]
const OPTION_STATES = [
  {
    name: 'Việt Nam'
  },
  {
    name: 'US'
  },
]
export default function Home() {
  return (
    <>
      <div>This is home page</div>
      <ButtonCommon loading={true}>Button default</ButtonCommon>
      <ButtonCommon type={ButonType.light} >{ButonType.light} -  Button light</ButtonCommon>
      <ButtonCommon type={ButonType.light} disabled>{ButonType.light} -  Button light</ButtonCommon>
      <ButtonCommon type={ButonType.light} loading = {true}>{ButonType.light} -  Button light</ButtonCommon>
      <ButtonCommon size={ButtonSize.large} icon={<IconBuy/>}>{ButtonSize.large} - Button default large</ButtonCommon>
      <ButtonCommon icon={<IconBuy/>} disabled isIconSuffix={true}>Button with icon disabled</ButtonCommon>
      <ButtonCommon icon={<IconBuy/>} type={ButonType.light}>Button with icon</ButtonCommon>
      <ViewAllItem link="/all"/>
      <ItemWishList />
      <Logo />
      <SelectCommon option={OPTION_SORT} placeHolder={"Sort By"}/>
      <SelectCommon option={OPTION_STATES} placeHolder={"States"} type="custom" size="large"/>
    </>
  )
}

Home.Layout = Layout
