import classNames from 'classnames';
import React from 'react';
import { QUERY_KEY, ROUTE } from 'src/utils/constanst.utils';
import HeadingCommon from "../../../common/HeadingCommon/HeadingCommon";
import CategoryItem from './CategoriesItem/CategoryItem';
import s from './HomeCategories.module.scss';
import coffeebean from './img/coffeebean.png';
import frozen from './img/frozen.png';
import sauce from './img/sauce.png';
import seafood from './img/seafood.png';
import veggle from './img/veggle.png';


const categories = [
    {
        id: 1,
        image: veggle,
        name: "Veggie",
        link: `${ROUTE.PRODUCTS}?${QUERY_KEY.CATEGORY}=veggie`
    }, {
        id: 2,
        image: seafood,
        name: "Seafood",
        link: `${ROUTE.PRODUCTS}?${QUERY_KEY.CATEGORY}=seafood`
    }
    , {
        id: 3,
        image: frozen,
        name: "Frozen",
        link: `${ROUTE.PRODUCTS}?${QUERY_KEY.CATEGORY}=frozen`
    }
    , {
        id: 4,
        image: coffeebean,
        name: "Coffe Bean",
        link: `${ROUTE.PRODUCTS}?${QUERY_KEY.CATEGORY}=coffee-bean`
    }
    , {
        id: 5,
        image: sauce,
        name: "Sauce",
        link: `${ROUTE.PRODUCTS}?${QUERY_KEY.CATEGORY}=sauce`,
    }
]

const HomeCategories = () => {
    return (
        <div className={classNames(s.homeCategoriesWrapper)}>
            <div className={s.inner}>
                <HeadingCommon align='center'>CATEGORIES</HeadingCommon>

                <div className={classNames(s.homeCategoryList)}>
                    {categories?.map(item => (
                        <div key={item.name} className={classNames(s.homeCategoriesItem)}>
                            <CategoryItem
                                name={item.name}
                                image={item.image}
                                link={item.link}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeCategories
