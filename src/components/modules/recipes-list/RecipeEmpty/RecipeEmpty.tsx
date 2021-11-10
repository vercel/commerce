import Link from 'next/link'
import React from 'react'
import { BlogEmpty, ButtonCommon } from 'src/components/common'
import s from './RecipeEmpty.module.scss'
import { useRouter } from 'next/router'
import {  ROUTE } from 'src/utils/constanst.utils'

interface Props {
}

const RecipeEmpty = ({ }: Props) => {
    const router = useRouter()
    const handleShowAllRecipes = () => {
        router.push({
            pathname: ROUTE.RECIPES,
        },
            undefined, { shallow: true }
        )
    }
    return (
        <div className={s.recipeEmpty}>
            <BlogEmpty/>
            <div className={s.buttCommon}>
                <ButtonCommon onClick={handleShowAllRecipes} type='primary'>Show all recipes</ButtonCommon>
            </div>
          
        </div >
    )
}

export default RecipeEmpty
