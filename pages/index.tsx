
import { ButtonCommon, ButtonIconBuy, Inputcommon, InputSearch, Layout, MenuDropdown } from 'src/components/common';
import { IconBuy, IconUser } from 'src/components/icons';

const optionMenu = [
  {
    link: '/',
    name: 'Account',
  },
  {
    link: '/',
    name: 'Logout',
  },

]
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
        <InputSearch />
      </div>
      <ButtonCommon type='ghost' icon={<IconBuy />}>Button</ButtonCommon>
      <ButtonIconBuy />

      <MenuDropdown options={optionMenu}><IconUser /></MenuDropdown>
    </>
  )
}

Home.Layout = Layout
