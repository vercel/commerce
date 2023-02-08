import { Layout } from '@components/common'
import AboutSlider from '@components/common/About/AboutSlider'
import MessageMap from '@components/common/About/TestimonialCard'

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
