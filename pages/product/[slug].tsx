
import { Layout, RecipeDetail, RelevantBlogPosts } from 'src/components/common'
import { ProductInfoDetail, RecommendedRecipes, ReleventProducts, ViewedProducts } from 'src/components/modules/product-detail'
import { BLOGS_DATA_TEST, INGREDIENT_DATA_TEST, RECIPE_DATA_TEST } from 'src/utils/demo-data'

export default function Slug() {
  return <>
    <ProductInfoDetail />
    <RecipeDetail ingredients={INGREDIENT_DATA_TEST} />
    <RecommendedRecipes data={RECIPE_DATA_TEST} />
    <ReleventProducts />
    <ViewedProducts />
    <RelevantBlogPosts data={BLOGS_DATA_TEST} title="You will like also"/>
  </>
}

Slug.Layout = Layout
