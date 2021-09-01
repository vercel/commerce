import React from 'react'
import RecipeBriefInfo from './components/RecipeBriefInfo/RecipeBriefInfo'
import s from './RecipeDetail.module.scss'


interface Props {
    className?: string
    children?: any
}

const RecipeDetail = ({ }: Props) => {
    return (
        <section className={s.recipeDetail}>
            <div className={s.img}>
                <img src="https://user-images.githubusercontent.com/76729908/131634880-8ae1437b-d3f8-421e-a546-d5a4f9a28e5f.png" alt="Recipe" />
            </div>
            <div className={s.recipeInfo}>
                <div className={s.top}>
                    <h1 className={s.name}>
                        Crispy Fried  Calamari
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

export default RecipeDetail
