
import { ButtonCommon, Inputcommon, InputSearch, Layout } from 'src/components/common';
import { IconBuy } from 'src/components/icons';
export default function Home() {
  return (
    <>
      <div>This is home page</div>
      <p>Go to <code>pages/index.tsx</code> to get your hand dirty!</p>
      <p>Go to <code>src/components</code> to make your awesome component!</p>
      <p>Go to <code>src/styles</code> to find global styles!</p>


      {/* demo  */}
      <div style={{ display: 'flex' }}>
        <Inputcommon placeholder="Enter here" />
        <InputSearch/>
      </div>

      <ButtonCommon type='ghost' icon={<IconBuy />}>Button</ButtonCommon>
      <ButtonCommon type='light'><IconBuy /></ButtonCommon>
      <ButtonCommon type='light' icon={<IconBuy />}/>
      <ButtonCommon type='ghost' icon={<IconBuy />} size='large'/>
    </>
  )
}

Home.Layout = Layout
