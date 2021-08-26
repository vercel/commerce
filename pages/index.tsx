
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
      <ViewAllItem link="/all"/>
      <ItemWishList />
      <Logo />
      <SelectCommon option={OPTION_SORT}>Sort by</SelectCommon>
      <SelectCommon option={OPTION_STATES} size={"large"} type={"custom"}>States</SelectCommon>
    </>
  )
}

Home.Layout = Layout
