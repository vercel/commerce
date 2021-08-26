import React from 'react';

import s from './HomeCategories.module.scss'
import classNames from 'classnames';
import CategoryItem from './CategoriesItem/CategoryItem';
import HeadingCommon from "../../../common/HeadingCommon/HeadingCommon";

interface HomeCategories {
    categories: any[]
}

const HomeCategories = ({categories}:HomeCategories) => {
    return (
  
            <div className={classNames(s.homeCategoriesWrapper)}>
                <div className={classNames(s.homeCategoriesHeading)}>
                    <HeadingCommon  children="CATEGORIES"></HeadingCommon>
                </div>

                <div className={classNames(s.homeCategoryList)}>
                    {categories?.map((props,index)=>(
                        <div key={index} className={classNames(s.homeCategoriesItem)}>
                            <CategoryItem {...props}></CategoryItem>
                        </div>
                    ))}
                 </div>
            </div>
       
    )
}

export default HomeCategories
