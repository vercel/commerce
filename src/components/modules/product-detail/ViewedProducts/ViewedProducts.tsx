import { Product } from '@commerce/types/product';
import React, { useEffect, useState } from 'react';
import ListProductWithInfo from 'src/components/common/ListProductWithInfo/ListProductWithInfo';
import { ProductCardProps } from 'src/components/common/ProductCard/ProductCard';
import { LOCAL_STORAGE_KEY } from 'src/utils/constanst.utils'
import { normalizeProductCard } from '@framework/utils/normalize';
import { useLocalStorage } from 'src/components/hooks/useLocalStorage';
interface Props {
    data: ProductCardProps[]
}
const ViewedProducts = ({data}:Props) => {
    if (data.length===0){
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