import { Layout } from 'src/components/common';
import { ViewedProducts } from 'src/components/modules/product-detail';
import ProductListFilter from 'src/components/modules/product-list/ProductListFilter/ProductListFilter';
import RecipeListBanner from 'src/components/modules/recipes-list/RecipeListBanner/RecipeListBanner';
import RecipesList from 'src/components/modules/recipes-list/RecipesList/RecipesList';
import ProductListBanner from '../src/components/modules/product-list/ProductListBanner/ProductListBanner';


export default function Products() {
  return (
    <>
      <ProductListBanner />
      <ProductListFilter/>
      <ViewedProducts/>
    </>
  )
}

Products.Layout = Layout
