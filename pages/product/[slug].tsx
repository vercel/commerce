
import { Layout, RecipeDetail } from 'src/components/common'
import { ProductInfoDetail } from 'src/components/modules/product-detail'

export default function Slug() {
  return <>
    <ProductInfoDetail/>
    <RecipeDetail/>
  </>
}

Slug.Layout = Layout
