
import { ButtonCommon, Layout, ViewAllItem, ItemWishList, Logo } from 'src/components/common'
import { IconBuy } from 'src/components/icons'
import { ButonType, ButtonSize } from 'src/utils/constanst.utils'
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
      <ItemWishList isActive={true} />
      <Logo />
      <p>Go to <code>pages/index.tsx</code> to get your hand dirty!</p>
      <p>Go to <code>src/components</code> to make your awesome component!</p>
      <p>Go to <code>src/styles</code> to find global styles!</p>
    </>
  )
}

Home.Layout = Layout
