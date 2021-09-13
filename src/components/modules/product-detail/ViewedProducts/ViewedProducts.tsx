import React from 'react';
import ListProductWithInfo from 'src/components/common/ListProductWithInfo/ListProductWithInfo';
import { PRODUCT_DATA_TEST } from 'src/utils/demo-data';

const ViewedProducts = () => {
    return (
        <ListProductWithInfo
            title="viewed Products"
            subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
            data={PRODUCT_DATA_TEST}
            hasBorderBottomMobile={true}
        />
    );
};

export default ViewedProducts;