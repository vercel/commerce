import { ProductCard } from '@commerce/types/product';
import React from 'react';
import ListProductWithInfo from 'src/components/common/ListProductWithInfo/ListProductWithInfo';

interface Props {
    data: ProductCard[]
}

const ReleventProducts = ({ data }: Props) => {
    return (
        <ListProductWithInfo
            title="Relevant Products"
            subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
            data={data}
        />
    );
};

export default ReleventProducts;