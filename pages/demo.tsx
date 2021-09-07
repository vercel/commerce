import { Layout, RecipeDetail } from 'src/components/common';
import { ProductInfoDetail, ViewedProducts, ReleventProducts, RecommendedRecipes } from 'src/components/modules/product-detail';
import { INGREDIENT_DATA_TEST, RECIPE_DATA_TEST } from 'src/utils/demo-data';



export default function Demo() {
    return <>
        <ProductInfoDetail />
        <RecipeDetail ingredients={INGREDIENT_DATA_TEST}/>
        <RecommendedRecipes data={RECIPE_DATA_TEST}/>
        <ReleventProducts/>
        <ViewedProducts/>
    </>
}

Demo.Layout = Layout
