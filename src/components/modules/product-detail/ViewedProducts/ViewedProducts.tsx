import { Product } from '@commerce/types/product';
import React, { useEffect, useState } from 'react';
import ListProductWithInfo from 'src/components/common/ListProductWithInfo/ListProductWithInfo';
import { ProductCardProps } from 'src/components/common/ProductCard/ProductCard';
import { LOCAL_STORAGE_KEY } from 'src/utils/constanst.utils'
import { normalizeProductCard } from '@framework/utils/normalize';
import { useLocalStorage } from 'src/components/hooks/useLocalStorage';
interface Props {
}
const ViewedProducts = ({}:Props) => {
    const [data, setData] = useState<ProductCardProps[]>([])
    const [viewedProduct] = useLocalStorage<Product[]>(LOCAL_STORAGE_KEY.VIEWEDPRODUCT, []);

    useEffect(() => {
        setData(viewedProduct.map((p)=>normalizeProductCard(p)))
    }, [viewedProduct])
    
    if (data.length>0){
        return <div></div>
    }
    return (
        <ListProductWithInfo
            title="viewed Products"
            subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
            data={data}
            hasBorderBottomMobile={true}
        />
    );
};

export default ViewedProducts;