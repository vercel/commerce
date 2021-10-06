import { QueryFacetsArgs } from '@framework/schema';
import classNames from 'classnames';
import React, { useState } from 'react';
import { ButtonCommon } from 'src/components/common';
import { useGetAllCollection } from 'src/components/hooks/collection';
import { useFacets } from 'src/components/hooks/facets';
import IconHide from 'src/components/icons/IconHide';
import { CODE_FACET_BRAND, CODE_FACET_FEATURED, QUERY_KEY } from 'src/utils/constanst.utils';
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
    const { facets, loading: facetsLoading } = useFacets(FACET_QUERY)
    const { collections, loading: collectionLoading } = useGetAllCollection()

    const [dataSort, setDataSort] = useState({});

    function handleValue(value: Object) {
        setDataSort({ ...dataSort, ...value });
    }
    function filter() {
        // console.log(dataSort)
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
                    <MenuFilter categories={collections} heading="Categories" type={QUERY_KEY.CATEGORY} onChangeValue={handleValue} />
                    {facetsLoading && <>
                        <SkeletonParagraph rows={5} />
                        <SkeletonParagraph rows={5} />
                    </>}
                    {
                        facets?.map(item => <MenuFilter
                            key={item.id}
                            type={item.code}
                            categories={item.values}
                            heading={item.name} />)
                    }
                    <MenuSort heading="SORT BY" type="sort" onChangeValue={handleValue} />
                    <div className={s.foot}>
                        <ButtonCommon size="large" onClick={filter}>{LANGUAGE.BUTTON_LABEL.CONFIRM}</ButtonCommon>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuNavigationProductList