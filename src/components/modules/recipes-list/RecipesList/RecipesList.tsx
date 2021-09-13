import React from 'react';
import { SelectCommon } from 'src/components/common';
import BreadcrumbCommon from 'src/components/common/BreadcrumbCommon/BreadcrumbCommon';
import MenuNavigation from 'src/components/common/MenuNavigation/MenuNavigation';
import PaginationCommon from 'src/components/common/PaginationCommon/PaginationCommon';
import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard';
import { OPTION_ALL, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils';
import HeadingCommon from "../../../common/HeadingCommon/HeadingCommon";
import RecipesItem from './RecipesItem/RecipesItem';
import s from './RecipesList.module.scss';

const recipe:RecipeCardProps[] = [
{
    title: "Special Recipe of Vietnamese Phở",
    description: "Alright, before we get to the actual recipe, let’s chat for a sec about the ingredients.  To make this pho soup recipe, you will need:",
    imageSrc: 'https://user-images.githubusercontent.com/76729908/132159257-f92574c7-d00d-4142-8ea7-0ca9515fb737.png',
    slug: "special-recipe-of-vietnamese-pho"
},
{
    title: "Original Recipe of Curry",
    description: "Chicken curry is common to several countries including India, countries in Asia and the Caribbean. My favorite of them though is this aromatic Indian...",
    imageSrc: 'https://user-images.githubusercontent.com/76729908/132159259-ae4c986d-ab53-4758-9137-d06bafdd15d0.png',
    slug:"original-recipe-of-curry"
},
{
    title: "The Best Recipe of Beef Noodle Soup",
    description: "The broth for Bun Bo Hue is prepared by slowly simmering various types of beef and pork bones (ox tail, beef shank, pork neck bones, pork feet,...",
    imageSrc: 'https://user-images.githubusercontent.com/76729908/132159262-f28a9fb9-4852-47e6-80b5-d600521b548a.png',
    slug:"the-best-recipe-of-beef-noodle-soup"
},
{
    title: "Special Recipe of Vietnamese Phở",
    description: "Alright, before we get to the actual recipe, let’s chat for a sec about the ingredients.  To make this pho soup recipe, you will need:",
    imageSrc: 'https://user-images.githubusercontent.com/76729908/132159257-f92574c7-d00d-4142-8ea7-0ca9515fb737.png',
    slug: "special-recipe-of-vietnamese-pho"
},
{
    title: "Original Recipe of Curry",
    description: "Chicken curry is common to several countries including India, countries in Asia and the Caribbean. My favorite of them though is this aromatic Indian...",
    imageSrc: 'https://user-images.githubusercontent.com/76729908/132159259-ae4c986d-ab53-4758-9137-d06bafdd15d0.png',
    slug:"original-recipe-of-curry"
},
{
    title: "The Best Recipe of Beef Noodle Soup",
    description: "The broth for Bun Bo Hue is prepared by slowly simmering various types of beef and pork bones (ox tail, beef shank, pork neck bones, pork feet,...",
    imageSrc: 'https://user-images.githubusercontent.com/76729908/132159262-f28a9fb9-4852-47e6-80b5-d600521b548a.png',
    slug:"the-best-recipe-of-beef-noodle-soup"
},];
const DEFAULT_PAGESIZE_RECIPELIST = 6;

const BREADCRUMB = [
    {
        name: 'Special Recipes',
        link: `#`,
    },
];

const CATEGORY = [
    {
        name: 'All',
        link: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=${OPTION_ALL}`,
    },
    {
        name: 'Malaysian',
        link: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=malaysia`,
    },
    {
        name: 'Vietnamese',
        link: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=vietnamese`,
    },
    {
        name: 'Thailand',
        link: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=thailand`,
    },
    {
        name: 'Indian',
        link: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=indian`,
    },
    {
        name: 'Lao',
        link: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=lao`,
    },
    {
      name: 'Chinese',
      link: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=chinese`,
    },
    {
      name: 'Korean',
      link: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=korean`,
    },
    {
      name: 'Japanese',
      link: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=japanese`,
    }, 
    {
      name: 'Western',
      link: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=western`,
    },
  ];

const CATEGORYSELECT = [
{
    name: 'All',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=${OPTION_ALL}`,
},
{
    name: 'Malaysian',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=malaysia`,
},
{
    name: 'Vietnamese',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=vietnamese`,
},
{
    name: 'Thailand',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=thailand`,
},
{
    name: 'Indian',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=indian`,
},
{
    name: 'Lao',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=lao`,
},
{
    name: 'Chinese',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=chinese`,
},
{
    name: 'Korean',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=korean`,
},
{
    name: 'Japanese',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=japanese`,
}, 
{
    name: 'Western',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=western`,
},
];
  
const OPTIONSLECT=[
    {
        name:"Most Viewed",
        value:"most-viewed"
    },
    {
        name:"Lastest Blogs",
        value:"lastest-blogs"
    },
    {
        name:"Recent Blogs",
        value:"recent-blogs"
    },
];

interface Props{
    data?: RecipeCardProps[],
    recipes?:{
        id:string,
        title:string,
        image:string,
        description:string,
        link:string
    }[],
}


const RecipesList = ({ data =recipe}:Props) => {
    return (
        <>
        <div className={s.recipesListWrapper}>
            <div className={s.breadcrumb}>
                <BreadcrumbCommon crumbs={BREADCRUMB} />
            </div>
            <div className={s.recipesListPageMain}>

                <div className={s.categories}>
                    <MenuNavigation categories={CATEGORY} heading="Categories"/>
                </div>

                <div className={s.recipesList}>
                    <HeadingCommon align='left'>SPECIAL RECIPES</HeadingCommon>
                    
                    <div className={s.boxSelect}>
                        <div className={s.categorySelectCate}>
                            <label htmlFor="">Categories</label>
                            <div className={s.select}>
                                <SelectCommon  option={CATEGORYSELECT} placeholder="Categories"/>
                            </div>
                        </div>
                        <div className={s.categorySelectSort}>
                            <label htmlFor="" >Sort By</label>
                            <div className={s.select}>
                                 <SelectCommon option={OPTIONSLECT} placeholder="Sort By" />
                            </div>
                        </div>
                    </div>
                  
                    <div className={s.inner}>
                        <div className={s.boxItem}>
                            {data?.map((item,index) => (
                                <div key={index} className={s.item}>
                                <RecipesItem
                                        name={item.title}
                                        image={item.imageSrc}
                                        description={item.description}
                                        link="#"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div  className={s.recipesPagination}>
                        <PaginationCommon pageSize={DEFAULT_PAGESIZE_RECIPELIST} total={data?.length}/>
                    </div>
                </div>
                
            </div>
          
        </div>
        </>
    )
}

export default RecipesList
