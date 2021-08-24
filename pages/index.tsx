
import { ButtonCommon, Inputcommon, Layout } from 'src/components/common';
import { IconBuy } from 'src/components/icons';
export default function Home() {
  return (
    <>
      <div>This is home page</div>
      <p>Go to <code>pages/index.tsx</code> to get your hand dirty!</p>
      <p>Go to <code>src/components</code> to make your awesome component!</p>
      <p>Go to <code>src/styles</code> to find global styles!</p>

      <Inputcommon placeholder="Enter here" />
      <Inputcommon placeholder="Enter here" type='number' />
      <Inputcommon placeholder="Enter here" value="23434" />

      <ButtonCommon type='ghost' icon={<IconBuy/>}>Button</ButtonCommon>
    </>
  )
}

Home.Layout = Layout
