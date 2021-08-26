import React, { MutableRefObject, useRef } from 'react';
import { Banner, ButtonCommon, ButtonIconBuy, CollectionHeading, HeadingCommon, Inputcommon, InputSearch, Layout, ScrollTarget } from 'src/components/common';
import { IconBuy } from 'src/components/icons';

export default function Home() {
  const refScrollUp = useRef() as MutableRefObject<HTMLDivElement>;

  return (
    <>
      <ScrollTarget refScrollUp={refScrollUp} />
      <HeadingCommon align="center">categories</HeadingCommon>
      <HeadingCommon type='light'>categories</HeadingCommon>
      <CollectionHeading subtitle='Lorem' title='Heading here'/>
      <HeadingCommon align="center" type='light'>categories</HeadingCommon>

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
