import classNames from 'classnames';
import React from 'react';

import s from './RecipesList.module.scss';
import RecipesItem from './RecipesItem/RecipesItem';
import PaginationCommon from 'src/components/common/PaginationCommon/PaginationCommon';

interface Props{
    recipes:{
        id:string,
        title:string,
        image:StaticImageData,
        description:string,
        link:string
    }[],
}



const RecipesList = ({recipes}:Props) => {
    return (
        <>
        <div className={classNames(s.recipesListWrapper)}>
            <div  className={classNames(s.recipesHead)}>
                
            </div>

            <div className={classNames(s.recipesListBlogs)}>
                <div className={classNames(s.recipesList)}>
                    {recipes?.map(item => (
                        <div key={item.id} className={classNames(s.recipesItem)}>
                          <RecipesItem
                                name={item.title}
                                image={item.image}
                                description={item.description}
                                link={item.link}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div  className={classNames(s.recipesPagination)}>
                <PaginationCommon pageSize={6} total={9}/>
            </div>
        </div>
        </>
    )
}

export default RecipesList
