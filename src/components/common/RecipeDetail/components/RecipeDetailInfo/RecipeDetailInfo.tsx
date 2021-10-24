import React from 'react'
import { ImgWithLink } from 'src/components/common'
import { RecipeProps } from 'src/utils/types.utils'
import RecipeBriefInfo from '../RecipeBriefInfo/RecipeBriefInfo'
import s from './RecipeDetailInfo.module.scss'


interface Prop extends RecipeProps {
    className?: string
    children?: any
}

const RecipeDetailInfo = ({ ...rest}: Prop) => {
    
    return (
        <section className={s.recipeDetailInfo}>
            <div className={s.img}>
                <ImgWithLink src= {rest.imageSrc ?? ''} alt={rest.title} />
            </div>
            <div className={s.recipeInfo}>
                <div className={s.top}>
                    <h1 className={s.name}>
                        {rest.title}
                    </h1>
                    <RecipeBriefInfo />
                </div>
                <div className={s.detail}>
                    <div className={s.item}>
                        <h3 className={s.heading}>Ingredients</h3>
                        <ul className={s.content}>
                            <li>Canola oil for frying</li>
                            <li>1 pound clean squid bodies cut in 1/4 inch rings and dried with a paper towel</li>
                            <li>2 cups flour</li>
                            <li>1/2 teaspoon kosher salt</li>
                            <li>1/2 teaspoon garlic powder</li>
                            <li>1/8 teaspoon coarse ground black pepper</li>
                            <li>1 lemon cut into wedges</li>
                        </ul>
                    </div>

                    <div className={s.item}>
                        <h3 className={s.heading}>Preparation</h3>
                        <ul className={s.content}>
                            <li>1In a large pot or dutch oven add three inches of oil and bring to 350 degrees.</li>
                            <li>Add the flour, salt, garlic powder and pepper to a large bowl and stir to combine.</li>
                            <li>Toss the squid pieces in the flour then into the hot oil.</li>
                            <li>Fry the squid for 1-2 minutes. You want the color to stay pale like in the pictures.</li>
                            <li>Remove to a cookie sheet to drain (do not add paper towels as it will steam the calamari and make it soft.)</li>
                            <li>Serve with lemon wedges.</li>
                        </ul>
                    </div>
                    <div className={s.item}>
                        <h3 className={s.heading}>Link</h3>
                        <a href="https://dinnerthendessert.com/crispy-fried-calamari" target="_blank" rel="noopener noreferrer">https://dinnerthendessert.com/crispy-fried-calamari</a>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default RecipeDetailInfo
