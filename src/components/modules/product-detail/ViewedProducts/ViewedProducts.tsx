import { Product } from '@commerce/types/product';
import React, { useEffect, useState } from 'react';
import ListProductWithInfo from 'src/components/common/ListProductWithInfo/ListProductWithInfo';
import useProductByIds, { ProductByIdsAgs } from 'src/components/hooks/product/useProductByIds';
import { useLocalStorage } from 'src/components/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from 'src/utils/constanst.utils';
interface Props {
    product?:Product
}
const ViewedProducts = ({product}:Props) => {
    const [local] = useLocalStorage<string[]>(LOCAL_STORAGE_KEY.VIEWED_PRODUCT_IDS, []);
    // const [viewed, setViewed] = useState<ProductCard[]>([])
    const [input, setInput] = useState<ProductByIdsAgs>({input:{ids:[]}})
    const {viewedProducts} = useProductByIds(input)
    useEffect(() => {
        if(local){
            if(product){
                let ids = local.filter((id)=>id !== product.id)
                setInput({input:{ids}})
            }else{
                let ids = local
                setInput({input:{ids}})
            }
        }
    }, [local, product])
    if (viewedProducts && viewedProducts.length===0){
        return <div></div>
    }
    return (
        <ListProductWithInfo
            title="viewed Products"
            subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
            data={viewedProducts}
            hasBorderBottomMobile={true}
        />
    );
};

export default ViewedProducts;