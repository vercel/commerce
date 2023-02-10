import { Layout } from '@components/common'
import NewsSlider from '@components/common/News/NewsSlider'

export default function News() {
  return (
    <div style={{backgroundColor: "rgba(240, 226, 123, 0.9)"}} className="mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
      <NewsSlider></NewsSlider>
    </div>
  )
}

News.Layout = Layout
