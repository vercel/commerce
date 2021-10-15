import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SelectCommon } from 'src/components/common';
import { OPTIONS_SORT_PRODUCT, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils';

const ProductSort = () => {
    const router = useRouter()
    const [sortValue, setSortValue] = useState<string>();

    useEffect(() => {
        const rs = router.query[QUERY_KEY.SORTBY] as string
        if (rs) {
            setSortValue(rs)
        }
    }, [router.query])

    const onSortChange = (value: string) => {
        setSortValue(value)
        router.push({
            pathname: ROUTE.PRODUCTS,
            query: {
                ...router.query,
                [QUERY_KEY.SORTBY]: value
            }
        },
            undefined, { shallow: true }
        )
    }

    return (
        <SelectCommon
            options={OPTIONS_SORT_PRODUCT}
            placeholder="Sort By"
            value={sortValue}
            onChange={onSortChange}
        />
    );
};

export default ProductSort;