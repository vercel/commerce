import { Layout, RecipeDetail } from 'src/components/common';
import { ProductInfoDetail, ViewedProducts } from 'src/components/modules/product-detail';
import { PRODUCT_DATA_TEST } from 'src/utils/demo-data';



export default function Demo() {
    return <>
        <ProductInfoDetail />
        <RecipeDetail ingredients={PRODUCT_DATA_TEST}/>
        <ViewedProducts/>
    </>
}

Demo.Layout = Layout
