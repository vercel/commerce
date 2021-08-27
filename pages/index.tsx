
import {  FeaturedProductCard, Layout, ProductCaroucel, RecipeCard } from 'src/components/common'
import { HomeBanner, HomeCollection, HomeCTA, HomeSubscribe, HomeVideo } from 'src/components/modules/home';

// import image9 from "../public/assets/images/image9.png"
// import image10 from "../public/assets/images/image10.png"
// import image11 from "../public/assets/images/image11.png"
import image12 from "../public/assets/images/image12.png"
// import { CollectionCarcoucel } from 'src/components/modules/home'
import HomeRecipe from 'src/components/modules/home/HomeRecipe/HomeRecipe'
import image13 from "../public/assets/images/image13.png"
import image14 from "../public/assets/images/image14.png"
import { RecipeCardProps } from '../src/components/common/RecipeCard/RecipeCard';

const recipe:RecipeCardProps[] = [{
  title: "Special Recipe of Vietnamese Phở",
  description:"Alright, before we get to the actual recipe, let’s chat for a sec about the ingredients.  To make this pho soup recipe, you will need:",
  imageSrc: image12.src
},{
  title: "Original Recipe of Curry",
  description:"Chicken curry is common to several countries including India, countries in Asia and the Caribbean. My favorite of them though is this aromatic Indian...",
  imageSrc: image13.src
},{
  title: "The Best Recipe of Beef Noodle Soup",
  description:"The broth for Bun Bo Hue is prepared by slowly simmering various types of beef and pork bones (ox tail, beef shank, pork neck bones, pork feet,...",
  imageSrc: image14.src
},{
  title: "Special Recipe of Vietnamese Phở",
  description:"Alright, before we get to the actual recipe, let’s chat for a sec about the ingredients.  To make this pho soup recipe, you will need:",
  imageSrc: image12.src
},{
  title: "Original Recipe of Curry",
  description:"Chicken curry is common to several countries including India, countries in Asia and the Caribbean. My favorite of them though is this aromatic Indian...",
  imageSrc: image13.src
},{
  title: "The Best Recipe of Beef Noodle Soup",
  description:"The broth for Bun Bo Hue is prepared by slowly simmering various types of beef and pork bones (ox tail, beef shank, pork neck bones, pork feet,...",
  imageSrc: image14.src
}]


export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeCollection/>
      <HomeVideo />
      <HomeCTA />
      <HomeRecipe data={recipe}  itemKey="product-2" title="Special Recipes"/>
      <HomeSubscribe />
    </>
  )
}

Home.Layout = Layout
