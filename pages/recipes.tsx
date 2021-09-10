import { Layout } from 'src/components/common';
import RecipeListBanner from 'src/components/modules/recipes-list/RecipeListBanner/RecipeListBanner';
import RecipesList from 'src/components/modules/recipes-list/RecipesList/RecipesList';


export default function RecipeListPage() {
  return (
    <>
      <RecipeListBanner />
      <RecipesList/>
    </>
  )
}

RecipeListPage.Layout = Layout
