
import { useEffect, useRef } from 'react';
import { Inputcommon, Layout } from 'src/components/common'
import { InputType } from 'src/utils/constanst.utils'
export default function Home() {

  const inputElementRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() =>{
      inputElementRef.current?.focus()
    }, 1000)
  }, [])
  
  const onEnter = (value: string | number) => {

  }

  return (
    <>
      <div>This is home page</div>
      <p>Go to <code>pages/index.tsx</code> to get your hand dirty!</p>
      <p>Go to <code>src/components</code> to make your awesome component!</p>
      <p>Go to <code>src/styles</code> to find global styles!</p>

      <Inputcommon placeholder="Enter here" onEnter={onEnter} ref={inputElementRef}/>
      <Inputcommon placeholder="Enter here" onEnter={onEnter} type={InputType.number}/>
      <Inputcommon placeholder="Enter here" value="23434" />
    </>
  )
}

Home.Layout = Layout
