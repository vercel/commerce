
import { ButtonCommon, Layout } from 'src/components/common'
export default function Home() {
  return (
    <>
      <div>This is home page</div>
      <ButtonCommon />
      <p>Go to <code>pages/index.tsx</code> to get your hand dirty!</p>
      <p>Go to <code>src/components</code> to make your awesome component!</p>
      <p>Go to <code>src/styles</code> to find global styles!</p>
    </>
  )
}

Home.Layout = Layout
