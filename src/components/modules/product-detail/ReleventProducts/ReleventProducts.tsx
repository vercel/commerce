import React from 'react';
import ListProductWithInfo from 'src/components/common/ListProductWithInfo/ListProductWithInfo';
import { PRODUCT_DATA_TEST } from 'src/utils/demo-data';

const ReleventProducts = () => {
    return (
        <ListProductWithInfo
            title="Relevant Products"
            subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
            data={PRODUCT_DATA_TEST}
        />
    );
};

export default ReleventProducts;