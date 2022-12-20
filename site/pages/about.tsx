import { Divider, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Layout } from '@components/common'
import AboutSlider from '@components/common/About/AboutSlider'

import { Text } from '@components/ui'

export default function About() {

  return (
    <>
        <div className="mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
            <AboutSlider></AboutSlider>
        </div>
    </>
  )
}

About.Layout = Layout
