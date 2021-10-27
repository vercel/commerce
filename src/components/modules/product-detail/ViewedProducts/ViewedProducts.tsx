import { Product, ProductCard } from '@commerce/types/product';
import { normalizeProductCard } from '@framework/utils/normalize';
import React, { useEffect, useState } from 'react';
import ListProductWithInfo from 'src/components/common/ListProductWithInfo/ListProductWithInfo';
import { ProductCardProps } from 'src/components/common/ProductCard/ProductCard';
import { useLocalStorage } from 'src/components/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from 'src/utils/constanst.utils';
interface Props {
    product?:Product
}
const ViewedProducts = ({product}:Props) => {
    const [local] = useLocalStorage<Product[]>(LOCAL_STORAGE_KEY.VIEWEDPRODUCT, []);
    const [viewed, setViewed] = useState<ProductCard[]>([])
    useEffect(() => {
    if(local){
        if(product){
            setViewed(local.filter((p)=>p.id !== product.id).map((p)=>normalizeProductCard(p)))
        }else{
            setViewed(local.map((p)=>normalizeProductCard(p)))
        }
    }

    }, [])
    if (viewed && viewed.length===0){
        return <div></div>
    }
    return (
        <ListProductWithInfo
            title="viewed Products"
            subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
            data={viewed}
            hasBorderBottomMobile={true}
        />
    );
};

export default ViewedProducts;