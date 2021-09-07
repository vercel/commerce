import classNames from 'classnames';
import React from 'react';
import s from './RecipesListPage.module.scss';
import RecipesList from '../RecipesList/RecipesList';
import { Banner, MenuFilter } from 'src/components/common';
import {MenuNavigation} from 'src/components/common';
import { OPTION_ALL, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import BreadcrumbCommon from 'src/components/common/BreadcrumbCommon/BreadcrumbCommon';
import HeadingCommon from "../../../common/HeadingCommon/HeadingCommon";
import { SelectCommon } from 'src/components/common';
import {RECIPE_DATA_TEST} from '../../../../utils/demo-data';

import blog1 from './img/blog1.png';
import blog2 from './img/blog2.png';
import blog3 from './img/blog3.png';
import blog4 from './img/blog4.png';
import blog5 from './img/blog5.png';
import blog6 from './img/blog6.png';

const BREADCRUMB = [
    {
        name: 'Home',
        link: "/",
    },
    {
        name: 'Special Recipes',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.RECIPES}=malaysia`,
    },
];

const CATEGORY = [
      {
          name: 'All',
          link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.RECIPES}=${OPTION_ALL}`,
      },
      {
          name: 'Malaysian',
          link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.RECIPES}=malaysia`,
      },
      {
          name: 'Vietnamese',
          link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.RECIPES}=vietnamese`,
      },
      {
          name: 'Thailand',
          link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.RECIPES}=thailand`,
      },
      {
          name: 'Indian',
          link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.RECIPES}=indian`,
      },
      {
          name: 'Lao',
          link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.RECIPES}=lao`,
      },
      {
        name: 'Chinese',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.RECIPES}=chinese`,
      },
      {
        name: 'Korean',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.RECIPES}=korean`,
      },
      {
        name: 'Japanese',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.RECIPES}=japanese`,
      }, 
      {
        name: 'Western',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.RECIPES}=western`,
      },
    ];

const RECIPES = [
    {
        id: '1',
        image: blog1,
        title: "Want to Lose Weight? Here are 10 DEBM Diet Guidelines for Beginners",
        description: 'The DEBM diet stands for "Delicious Happy Fun Diet". This diet was popularized by Robert...',
        link: `${ROUTE.PRODUCTS}?${QUERY_KEY.RECIPES}=veggie`
    }, {
        id: '2',
        image: blog2,
        title: "9 Ways to Make an Aloe Vera Mask at Home",
        description: 'Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...',
        link: `${ROUTE.PRODUCTS}?${QUERY_KEY.RECIPES}=seafood`
    }
    , {
        id: '3',
        image: blog3,
        title: "Don't Buy Wrong, Here Are 7 Ways to Choose a Ripe Dragon Fruit",
        description: 'Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...',
        link: `${ROUTE.PRODUCTS}?${QUERY_KEY.RECIPES}=coffee-bean`
    }
    , {
        id: '4',
        image: blog4,
        title: "Want to Lose Weight? Here are 10 DEBM Diet Guidelines for Beginners",
        description: 'The DEBM diet stands for "Delicious Happy Fun Diet". This diet was popularized by Robert...',
        link: `${ROUTE.PRODUCTS}?${QUERY_KEY.RECIPES}=sauce`,
    }, {
        id: '5',
        image: blog5,
        title: "9 Ways to Make an Aloe Vera Mask at Home",
        description: 'Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...',
        link: `${ROUTE.PRODUCTS}?${QUERY_KEY.RECIPES}=sauce`,
    }
    , {
        id: '6',
        image: blog6,
        title: "Don't Buy Wrong, Here Are 7 Ways to Choose a Ripe Dragon Fruit",
        description: 'Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...',
        link: `${ROUTE.PRODUCTS}?${QUERY_KEY.RECIPES}=sauce`,
    }
];

const OPTIONSLECT=[
    {
        name:"SORT BY 1"
    },
    {
        name:"SORT BY 2"
    },
    {
        name:"SORT BY 3"
    },
]

const RecipesListPage = () => {
    return (
       <div className={classNames(s.recipesListPageWrapper)}>
           
            <Banner title={'SPECIAL RECIPE OF THE WEEK'} subtitle={'Last call! Shop deep deals on 100+ bulk picks while you can.'} imgLink={'assets/bannerrecipes.png'} size="large"/>
            
            <div className={classNames(s.recipesListPageBreadcrumbDesktop)}>
                <BreadcrumbCommon crumbs={BREADCRUMB} />
            </div>

            <div className={classNames(s.recipesListPageHeadMobile)}>
                <div className={classNames(s.heading)}>
                    <HeadingCommon align='left'>SPECIAL RECIPES</HeadingCommon>
                    <BreadcrumbCommon crumbs={BREADCRUMB} />
                </div>
            </div>

            <div className={classNames(s.recipesListPageMain)}>

                <div className={classNames(s.categoriesDesktop)}>
                    <MenuNavigation categories={CATEGORY} heading="Categories"/>
                </div>

                <div className={classNames(s.recipesList)}>
                    <div className={classNames(s.sortByDesktop)}>
                        <HeadingCommon align='left'>SPECIAL RECIPES</HeadingCommon>
                        <SelectCommon option={OPTIONSLECT} placeHolder="SORT BY"/>
                    </div>
                    <div className={classNames(s.selectMobile)}>
                        <div>
                            <label htmlFor="">Categories</label>
                            <SelectCommon option={CATEGORY} placeHolder="Categories"/>
                        </div>
                        <div>
                            <label htmlFor="">Sort By</label>
                            <SelectCommon option={OPTIONSLECT} placeHolder="Sort by"/>
                        </div>
                    </div>
                    <RecipesList recipes={RECIPES}/>
                </div>

            </div>
       </div>
    )
}

export default RecipesListPage
