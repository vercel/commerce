import { QueryFacetsArgs } from '@framework/schema';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ButtonCommon } from 'src/components/common';
import { useGetAllCollection } from 'src/components/hooks/collection';
import { useFacets } from 'src/components/hooks/facets';
import IconHide from 'src/components/icons/IconHide';
import { CODE_FACET_BRAND, CODE_FACET_FEATURED, OPTIONS_SORT_PRODUCT, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils';
import { LANGUAGE } from 'src/utils/language.utils';
import { SortOrder } from 'src/utils/types.utils';
import MenuFilter from '../MenuFilter/MenuFilter';
import SkeletonParagraph from '../SkeletonCommon/SkeletonParagraph/SkeletonParagraph';
import s from './MenuNavigationProductList.module.scss';
import MenuSort from './MenuSort/MenuSort';

interface Props {
    visible: boolean,
    onClose: () => void
}

const FACET_QUERY = {
    options: {
        sort: {
            code: SortOrder.Asc
        },
        filter: {
            code: {
                in: [CODE_FACET_FEATURED, CODE_FACET_BRAND]
            }
        }
    }
} as QueryFacetsArgs

const MenuNavigationProductList = ({ visible, onClose }: Props) => {
    const router = useRouter()
    const { facets, loading: facetsLoading } = useFacets(FACET_QUERY)
    const { collections, loading: collectionLoading } = useGetAllCollection()
    const [brandQuery, setBrandQuery] = useState<string[]>([])
    const [featuredQuery, setFeaturedQuery] = useState<string[]>([])
    const [categoryQuery, setCategoryQuery] = useState<string>()
    const [sortValue, setSortValue] = useState<string>();

    useEffect(() => {
        const rs = router.query[QUERY_KEY.SORTBY] as string
        if (rs) {
            setSortValue(rs)
        }
    }, [router.query])

    useEffect(() => {
        const rs = router.query[QUERY_KEY.CATEGORY] as string
        if (rs) {
            setCategoryQuery(rs)
        }
    }, [router.query])

    function onSubmit() {
        let newURL = `${ROUTE.PRODUCTS}?`

        if (categoryQuery) {
            newURL += `&${QUERY_KEY.CATEGORY}=${categoryQuery}`
        }

        if (brandQuery.length > 0) {
            newURL += `&${QUERY_KEY.BRAND}=${brandQuery.join(",")}`
        }

        if (featuredQuery.length > 0) {
            newURL += `&${QUERY_KEY.FEATURED}=${featuredQuery.join(",")}`
        }

        if (sortValue) {
            newURL += `&${QUERY_KEY.SORTBY}=${sortValue}`
        }
        router.push(newURL)
        onClose()
    }

    const onSortChange = (value: string) => {
        setSortValue(value)
    }

    const onCategoryChange = (value: string, isSelect: boolean) => {
        if (isSelect) {
            setCategoryQuery(value)
        } else {
            setCategoryQuery('')
        }
    }

    const onFilterOptionChange = (value: string, type: string, isSelect: boolean = true) => {
        if (type === QUERY_KEY.CATEGORY) {
            onCategoryChange(value, isSelect)
        } else {
            let rs = [...featuredQuery]
            let setDataFunction = setFeaturedQuery

            if (type === CODE_FACET_BRAND) {
                rs = [...brandQuery]
                setDataFunction = setBrandQuery
            }

            if (isSelect) {
                rs.push(value)
            } else {
                rs = rs.filter(item => item !== value)
            }
            setDataFunction(rs)
        }
    }


    return (
        <div className={classNames({ [s.menuNavigationProductListMobile]: true, [s.isShow]: visible })}>
            <div className={classNames({ [s.menuNavigationProductModal]: true, [s.animation]: visible })}>
                <div className={s.content}>
                    <div className={s.head}>
                        <h3>FILTER</h3>
                        <div onClick={onClose}><IconHide /></div>
                    </div>

                    {collectionLoading && <SkeletonParagraph rows={5} />}
                    <MenuFilter categories={collections}
                        heading="Categories"
                        type={QUERY_KEY.CATEGORY}
                        onChange={onFilterOptionChange} 
                        singleSelectedValue={categoryQuery}
                        isSingleSelect={true}
                        />

                    {facetsLoading && <>
                        <SkeletonParagraph rows={5} />
                        <SkeletonParagraph rows={5} />
                    </>}
                    {
                        facets?.map(item => <MenuFilter
                            key={item.id}
                            type={item.code}
                            categories={item.values}
                            heading={item.name}
                            onChange={onFilterOptionChange}
                        />)
                    }
                    <MenuSort heading="SORT BY" onChange={onSortChange} value={sortValue} options={OPTIONS_SORT_PRODUCT} />
                    <div className={s.foot}>
                        <ButtonCommon size="large" onClick={onSubmit}>{LANGUAGE.BUTTON_LABEL.CONFIRM}</ButtonCommon>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuNavigationProductList