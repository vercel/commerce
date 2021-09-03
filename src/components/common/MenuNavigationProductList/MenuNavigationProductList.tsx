import React, { useState } from 'react';
import {ButtonCommon, MenuFilter, MenuNavigation} from 'src/components/common';
import s from './MenuNavigationProductList.module.scss';
import {IconHide} from 'src/components/icons';
import MenuSort from './MenuSort/MenuSort';
import {LANGUAGE} from 'src/utils/language.utils';
import classNames from 'classnames'
interface Props{
    categories:{name:string,link:string}[],
    brands:{name:string,link:string}[],
    featured:{name:string,link:string}[],
}

const MenuNavigationProductList = ({categories,brands,featured}:Props)=>{
    
    const [dataSort,setDataSort] = useState({});
    const [isShow,setIsShow] = useState(true);
    
    function handleValue(value:Object){
        setDataSort({...dataSort,...value});
    }
    function filter(){
        console.log(dataSort)
    }

    function hideMenu(){
        if(isShow === true){
            setIsShow(false);
        }
    }
    return(
        <>
            <div className={s.menuNavigationProductListDesktop}>
                <MenuNavigation categories={categories} heading="Categories"/>
                <MenuNavigation categories={brands} heading="Brands"/>
                <MenuNavigation categories={featured} heading="Featured"/>
            </div>
            <div className={classNames({ [s.menuNavigationProductListMobile] :true,[s.isShow]: isShow})}>
                <div className={s.menuNavigationProductModal}>
                    <div className={s.content}>
                        <div className={s.head}>
                            <h3>FILTER</h3>
                            <div onClick={hideMenu}><IconHide/></div>
                        </div>
                        <MenuFilter categories={categories} heading="Categories" type="category" onChangeValue={handleValue}/>
                        <MenuFilter categories={brands} heading="Brand" type="brand" onChangeValue={handleValue}/>
                        <MenuFilter categories={featured} heading="Featured" type="featured" onChangeValue={handleValue}/>
                        <MenuSort heading="SORT BY" type="sort" onChangeValue={handleValue}/>
                        <ButtonCommon size="large" onClick={filter}>{LANGUAGE.BUTTON_LABEL.CONFIRM}</ButtonCommon>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuNavigationProductList