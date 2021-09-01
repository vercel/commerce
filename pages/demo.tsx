import { Layout, RecipeDetail } from 'src/components/common';
import { ProductInfoDetail } from 'src/components/modules/product-detail'



export default function Demo() {
    return <>
        <ProductInfoDetail />
        <RecipeDetail />
    </>
}

Demo.Layout = Layout
