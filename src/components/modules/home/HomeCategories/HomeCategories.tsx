import classNames from 'classnames';
import React from 'react';
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
        link: "veggie.html"
    }, {
        id: 2,
        image: seafood,
        name: "Seafood",
        link: "seafood.html"
    }
    , {
        id: 3,
        image: frozen,
        name: "Frozen",
        link: "frozen.html"
    }
    , {
        id: 4,
        image: coffeebean,
        name: "Coffe Bean",
        link: "frozen.html"
    }
    , {
        id: 5,
        image: sauce,
        name: "Sauce",
        link: "frozen.html"
    }
]

const HomeCategories = () => {
    return (
        <div className={classNames(s.homeCategoriesWrapper)}>
            <div className={classNames(s.homeCategoriesHeading)}>
                <HeadingCommon align='center' children="CATEGORIES"></HeadingCommon>
            </div>

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
    )
}

export default HomeCategories
