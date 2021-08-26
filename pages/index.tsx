
import { Banner, ButtonCommon, ButtonIconBuy, Inputcommon, InputSearch, Layout } from 'src/components/common';
import { IconBuy } from 'src/components/icons';
import { HomeBanner } from 'src/components/modules/home';


export default function Home() {
  return (
    <>
      <HomeBanner />
      <div>This is home page</div>
      <p>Go to <code>pages/index.tsx</code> to get your hand dirty!</p>
      <p>Go to <code>src/components</code> to make your awesome component!</p>
      <p>Go to <code>src/styles</code> to find global styles!</p>

      {/* demo  */}
      <div style={{ display: 'flex' }}>
        <Inputcommon placeholder="Enter here" />
        <InputSearch />
      </div>
      <ButtonCommon type='ghost' icon={<IconBuy />}>Button</ButtonCommon>
      <ButtonIconBuy />

      <Banner
        title="Save 15% on your first order"
        subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
        imgLink="https://user-images.githubusercontent.com/76729908/130574371-3b75fa72-9552-4605-aba9-a4b31cd9dce7.png"
      />
    </>
  )
}

Home.Layout = Layout
