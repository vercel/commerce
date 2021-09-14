
import { Layout, RecipeDetail, RecommendedRecipes } from 'src/components/common'
import { INGREDIENT_DATA_TEST, RECIPE_DATA_TEST } from 'src/utils/demo-data'

export default function Slug() {
  return <div className="page-recipe-detail">
    <RecipeDetail ingredients={INGREDIENT_DATA_TEST} />
    <RecommendedRecipes data={RECIPE_DATA_TEST} />
  </div>
}

Slug.Layout = Layout
