import { Collection } from '@commerce/types/collection';
import { ProductCard } from '@commerce/types/product';
import React, { useMemo } from 'react';
import ListProductWithInfo from 'src/components/common/ListProductWithInfo/ListProductWithInfo';
import { getCategoryNameFromCollectionId } from 'src/utils/funtion.utils';

interface Props {
    data: ProductCard[]
    collections: Collection[]

}

const ReleventProducts = ({ data, collections }: Props) => {
    const dataWithCategoryName = useMemo(() => {
        return data.map(item => {
            return {
              ...item,
              collection: getCategoryNameFromCollectionId(collections, item.collectionIds ? item.collectionIds[0] : undefined)
            }
          })
    }, [data, collections])

    if (data.length === 0) {
        return null
    }
    return (
        <ListProductWithInfo
            title="Relevant Products"
            subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
            data={dataWithCategoryName}
        />
    );
};

export default ReleventProducts;