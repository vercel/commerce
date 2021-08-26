import React, { MutableRefObject, useRef } from 'react';
import { HeadingCommon, CollectionHeading, ScrollToTop, ScrollTarget } from 'src/components/common'

export default function Home() {
  const refScrollUp = useRef() as MutableRefObject<HTMLDivElement>;

  return (
    <>
      <ScrollTarget refScrollUp={refScrollUp} />
      <HeadingCommon align="center" children="categories" />
      <CollectionHeading type="highlight" children="fresh product todays" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading children="coffee bean" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading type="highlight" children="fresh product todays" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading children="coffee bean" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading type="highlight" children="fresh product todays" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading children="coffee bean" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading type="highlight" children="fresh product todays" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading children="coffee bean" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading type="highlight" children="fresh product todays" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading children="coffee bean" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading type="highlight" children="fresh product todays" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading children="coffee bean" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading type="highlight" children="fresh product todays" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading children="coffee bean" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading type="highlight" children="fresh product todays" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading children="coffee bean" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading type="highlight" children="fresh product todays" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading children="coffee bean" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading type="highlight" children="fresh product todays" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <CollectionHeading children="coffee bean" subtitle="Last call! Shop deep deals on 100+ bulk picks while you can." />
      <ScrollToTop target={refScrollUp} />
    </>
  )
}

// Home.Layout = Layout
