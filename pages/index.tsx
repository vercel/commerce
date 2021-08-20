
import { ButtonCommon, Layout } from 'src/components/common'
import { ButonType, ButtonSize } from 'src/utils/constanst.utils'
export default function Home() {
  return (
    <>
      <div>This is home page</div>
      <ButtonCommon>Button default</ButtonCommon>
      <ButtonCommon type={ButonType.light}>Button light</ButtonCommon>
      <ButtonCommon size={ButtonSize.large}>Button default large</ButtonCommon>
      <p>Go to <code>pages/index.tsx</code> to get your hand dirty!</p>
      <p>Go to <code>src/components</code> to make your awesome component!</p>
      <p>Go to <code>src/styles</code> to find global styles!</p>
    </>
  )
}

Home.Layout = Layout
