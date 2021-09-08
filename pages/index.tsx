
import { Layout, SelectCommon } from 'src/components/common'
import { HomeBanner, HomeCollection, HomeCTA, HomeSubscribe, HomeVideo, HomeCategories, HomeFeature, HomeRecipe } from 'src/components/modules/home';

const OPTION_TEST = [
  {
    name: "By Name",
    value: "Name"
  },
  {
    name: "Price (High to Low)",
    value: "Price"
  },
  {
    name: "On Sale",
    value: "Sale"
  }
]
const handleChange = (value:string) => {
  console.log(value)
}
export default function Home() {
  return (
    <>
      <SelectCommon option={OPTION_TEST} placeholder="Sort By" onChange={handleChange} />
      <SelectCommon option={OPTION_TEST} placeholder="Sort By" onChange={handleChange} type='custom'/>
    </>
  )
}

Home.Layout = Layout
