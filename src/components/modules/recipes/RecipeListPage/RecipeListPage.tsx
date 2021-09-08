import React from 'react';
import { Banner, SelectCommon } from 'src/components/common';
import BreadcrumbCommon from 'src/components/common/BreadcrumbCommon/BreadcrumbCommon';
import MenuNavigation from 'src/components/common/MenuNavigation/MenuNavigation';
import { OPTION_ALL, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils';
import HeadingCommon from "../../../common/HeadingCommon/HeadingCommon";
import RecipesList from '../RecipesList/RecipesList';
import s from './RecipeListPage.module.scss';

const BREADCRUMB = [
    {
        name: 'Home',
        link: "/",
    },
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

const RECIPES = [
    {
        id: '1',
        image: 'https://user-images.githubusercontent.com/76729908/132159257-f92574c7-d00d-4142-8ea7-0ca9515fb737.png',
        title: "Want to Lose Weight? Here are 10 DEBM Diet Guidelines for Beginners",
        description: 'The DEBM diet stands for "Delicious Happy Fun Diet". This diet was popularized by Robert...',
        link: `${ROUTE.RECIPES}`
    }, {
        id: '2',
        image: 'https://user-images.githubusercontent.com/76729908/132159259-ae4c986d-ab53-4758-9137-d06bafdd15d0.png',
        title: "9 Ways to Make an Aloe Vera Mask at Home",
        description: 'Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...',
        link: `${ROUTE.RECIPES}`
    }
    , {
        id: '3',
        image: 'https://user-images.githubusercontent.com/76729908/132159262-f28a9fb9-4852-47e6-80b5-d600521b548a.png',
        title: "Don't Buy Wrong, Here Are 7 Ways to Choose a Ripe Dragon Fruit",
        description: 'Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...',
        link: `${ROUTE.RECIPES}`
    }
    , {
        id: '4',
        image: 'https://user-images.githubusercontent.com/76729908/132159257-f92574c7-d00d-4142-8ea7-0ca9515fb737.png',
        title: "Want to Lose Weight? Here are 10 DEBM Diet Guidelines for Beginners",
        description: 'The DEBM diet stands for "Delicious Happy Fun Diet". This diet was popularized by Robert...',
        link: `${ROUTE.RECIPES}`,
    }, {
        id: '5',
        image: 'https://user-images.githubusercontent.com/76729908/132159259-ae4c986d-ab53-4758-9137-d06bafdd15d0.png',
        title: "9 Ways to Make an Aloe Vera Mask at Home",
        description: 'Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...',
        link: `${ROUTE.RECIPES}`,
    }
    , {
        id: '6',
        image: 'https://user-images.githubusercontent.com/76729908/132159262-f28a9fb9-4852-47e6-80b5-d600521b548a.png',
        title: "Don't Buy Wrong, Here Are 7 Ways to Choose a Ripe Dragon Fruit",
        description: 'Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...',
        link: `${ROUTE.RECIPES}`,
    },
    {
        id: '1',
        image: 'https://user-images.githubusercontent.com/76729908/132159257-f92574c7-d00d-4142-8ea7-0ca9515fb737.png',
        title: "Want to Lose Weight? Here are 10 DEBM Diet Guidelines for Beginners",
        description: 'The DEBM diet stands for "Delicious Happy Fun Diet". This diet was popularized by Robert...',
        link: `${ROUTE.RECIPES}`
    }, {
        id: '2',
        image: 'https://user-images.githubusercontent.com/76729908/132159259-ae4c986d-ab53-4758-9137-d06bafdd15d0.png',
        title: "9 Ways to Make an Aloe Vera Mask at Home",
        description: 'Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...',
        link: `${ROUTE.RECIPES}`
    }
    , {
        id: '3',
        image: 'https://user-images.githubusercontent.com/76729908/132159262-f28a9fb9-4852-47e6-80b5-d600521b548a.png',
        title: "Don't Buy Wrong, Here Are 7 Ways to Choose a Ripe Dragon Fruit",
        description: 'Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...',
        link: `${ROUTE.RECIPES}`
    }
    , {
        id: '4',
        image: 'https://user-images.githubusercontent.com/76729908/132159257-f92574c7-d00d-4142-8ea7-0ca9515fb737.png',
        title: "Want to Lose Weight? Here are 10 DEBM Diet Guidelines for Beginners",
        description: 'The DEBM diet stands for "Delicious Happy Fun Diet". This diet was popularized by Robert...',
        link: `${ROUTE.RECIPES}`,
    }, {
        id: '5',
        image: 'https://user-images.githubusercontent.com/76729908/132159259-ae4c986d-ab53-4758-9137-d06bafdd15d0.png',
        title: "9 Ways to Make an Aloe Vera Mask at Home",
        description: 'Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...',
        link: `${ROUTE.RECIPES}`,
    }
    , {
        id: '6',
        image: 'https://user-images.githubusercontent.com/76729908/132159262-f28a9fb9-4852-47e6-80b5-d600521b548a.png',
        title: "Don't Buy Wrong, Here Are 7 Ways to Choose a Ripe Dragon Fruit",
        description: 'Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...',
        link: `${ROUTE.RECIPES}`,
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
]
const BANNER =[
    {
        imgLink:'assets/bannerrecipes.png',
        title:'SPECIAL RECIPE OF THE WEEK',
        subtitle:'Last call! Shop deep deals on 100+ bulk picks while you can.',
    }
]

const RecipesListPage = () => {
    return (
       <div className={s.recipesListPageWrapper}>
           
            <Banner data={BANNER}/>
            
            <div className={s.recipesListPageBreadcrumbDesktop}>
                <BreadcrumbCommon crumbs={BREADCRUMB} />
            </div>

            <div className={s.recipesListPageHeadMobile}>
                <div className={s.heading}>
                    <HeadingCommon align='left'>SPECIAL RECIPES</HeadingCommon>
                    <BreadcrumbCommon crumbs={BREADCRUMB} />
                </div>
            </div>

            <div className={s.recipesListPageMain}>

                <div className={s.categoriesDesktop}>
                    <MenuNavigation categories={CATEGORY} heading="Categories"/>
                </div>

                <div className={s.recipesList}>
                    <div className={s.sortByDesktop}>
                        <HeadingCommon align='left'>SPECIAL RECIPES</HeadingCommon>
                        <SelectCommon option={OPTIONSLECT} placeholder="Sort By" />
                    </div>
                    <div className={s.selectMobile}>
                        <div>
                            <label htmlFor="">Categories</label>
                            <SelectCommon option={CATEGORYSELECT} placeholder="Categories"/>
                        </div>
                        <div>
                            <label htmlFor="">Sort By</label>
                            <SelectCommon option={OPTIONSLECT} placeholder="Sort By" />
                        </div>
                    </div>
                    <RecipesList recipes={RECIPES}/>
                </div>
            </div>
       </div>
    )
}

export default RecipesListPage
