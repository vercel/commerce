import React, { useState } from 'react';
import {ButtonCommon} from 'src/components/common';
import s from './MenuNavigationProductList.module.scss';
import MenuSort from './MenuSort/MenuSort';
import {LANGUAGE} from 'src/utils/language.utils';
import classNames from 'classnames'
import MenuFilter from '../MenuFilter/MenuFilter';
import MenuNavigation from '../MenuNavigation/MenuNavigation';
import IconHide from 'src/components/icons/IconHide';

interface Props{
    categories:{name:string,link:string}[],
    brands:{name:string,link:string}[],
    featured:{name:string,link:string}[],
    visible: boolean,
    onClose: () => void
}

const MenuNavigationProductList = ({categories,brands,featured,visible,onClose}:Props)=>{
    
    const [dataSort,setDataSort] = useState({});
    
    function handleValue(value:Object){
        setDataSort({...dataSort,...value});
    }
    function filter(){
        console.log(dataSort)
    }
    return(
        <>
            <div className={s.menuNavigationProductListDesktop}>
                <MenuNavigation categories={categories} heading="Categories"/>
                <MenuNavigation categories={brands} heading="Brands"/>
                <MenuNavigation categories={featured} heading="Featured"/>
            </div>
            <div className={s.menuNavigationProductListMobile} >
                <div className={classNames({ [s.menuNavigationProductModal] :true,[s.isShow]: visible})} onClick={onClose}>
                    <div className={classNames({[s.hideAnimation]:true,[s.animation]: visible})}>
                        <div className={s.content}>
                            <div className={s.head}>
                                <h3>FILTER</h3>
                                <div onClick={onClose}><IconHide/></div>
                            </div>
                            <MenuFilter categories={categories} heading="Categories" type="category" onChangeValue={handleValue}/>
                            <MenuFilter categories={brands} heading="Brand" type="brand" onChangeValue={handleValue}/>
                            <MenuFilter categories={featured} heading="Featured" type="featured" onChangeValue={handleValue}/>
                            <MenuSort heading="SORT BY" type="sort" onChangeValue={handleValue}/>
                            <div className={s.foot}>
                                <ButtonCommon size="large" onClick={filter}>{LANGUAGE.BUTTON_LABEL.CONFIRM}</ButtonCommon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuNavigationProductList