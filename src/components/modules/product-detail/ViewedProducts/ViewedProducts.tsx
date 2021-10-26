import React from 'react';
import ListProductWithInfo from 'src/components/common/ListProductWithInfo/ListProductWithInfo';
import { ProductCardProps } from 'src/components/common/ProductCard/ProductCard';
interface Props {
    data: ProductCardProps[]
}
<<<<<<< HEAD
const ViewedProducts = ({data = []}:Props) => {
    if (data.length===0){
=======
const ViewedProducts = ({data}:Props) => {
    if (data && data.length===0){
>>>>>>> a98fd093a0c4e3b68f23d0fcc90e15a765df0fc7
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