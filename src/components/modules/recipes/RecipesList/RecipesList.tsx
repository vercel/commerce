import React from 'react';
import PaginationCommon from 'src/components/common/PaginationCommon/PaginationCommon';
import RecipesItem from './RecipesItem/RecipesItem';
import s from './RecipesList.module.scss';


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
        <div className={s.recipesListWrapper}>
            <div  className={s.recipesHead}>
                
            </div>

            <div className={s.recipesListBlogs}>
                <div className={s.recipesList}>
                    {recipes?.map(item => (
                        <div key={item.id} className={s.recipesItem}>
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
            <div  className={s.recipesPagination}>
                <PaginationCommon pageSize={6} total={9}/>
            </div>
        </div>
        </>
    )
}

export default RecipesList
