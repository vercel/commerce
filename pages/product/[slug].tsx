
import { Layout, RecipeDetail } from 'src/components/common'
import { ProductInfoDetail, RecommendedRecipes, ReleventProducts, ViewedProducts } from 'src/components/modules/product-detail'
import { INGREDIENT_DATA_TEST, RECIPE_DATA_TEST } from 'src/utils/demo-data'

export default function Slug() {
  return <>
    <ProductInfoDetail />
    <RecipeDetail ingredients={INGREDIENT_DATA_TEST} />
    <RecommendedRecipes data={RECIPE_DATA_TEST} />
    <ReleventProducts />
    <ViewedProducts />
  </>
}

Slug.Layout = Layout
