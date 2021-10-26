import React from 'react';
import ListProductWithInfo from 'src/components/common/ListProductWithInfo/ListProductWithInfo';
import { ProductCardProps } from 'src/components/common/ProductCard/ProductCard';
interface Props {
    data: ProductCardProps[]
}
const ViewedProducts = ({data}:Props) => {
    if (data && data.length===0){
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