
<<<<<<< HEAD
import {  FeaturedProductCard, Layout, ProductCaroucel, RecipeCard } from 'src/components/common'
import image5 from "../public/assets/images/image5.png"
import image6 from "../public/assets/images/image6.png"
import image7 from "../public/assets/images/image7.png"
import image8 from "../public/assets/images/image8.png"
// import image9 from "../public/assets/images/image9.png"
// import image10 from "../public/assets/images/image10.png"
// import image11 from "../public/assets/images/image11.png"
import image12 from "../public/assets/images/image12.png"
import { CollectionCarcoucel } from 'src/components/modules/home'
import HomeRecipe from 'src/components/modules/home/HomeRecipe/HomeRecipe'
import image13 from "../public/assets/images/image13.png"
import image14 from "../public/assets/images/image14.png"
import { RecipeCardProps } from '../src/components/common/RecipeCard/RecipeCard';
const dataTest = [{
  name:"Tomato",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image5.src
},{
  name:"Cucumber",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image6.src
},{
  name:"Carrot",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image7.src
},{
  name:"Salad",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image8.src
},{
  name:"Tomato",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image5.src
},{
  name:"Cucumber",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image6.src
},{
  name:"Tomato",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image5.src
},{
  name:"Cucumber",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image6.src
},{
  name:"Carrot",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image7.src
},{
  name:"Salad",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image8.src
},{
  name:"Tomato",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image5.src
},{
  name:"Cucumber",
  weight:"250g",
  category:"VEGGIE",
  price:"Rp 27.500",
  imageSrc:image6.src
}]

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
=======
import { Layout } from 'src/components/common';
import { HomeBanner, HomeCTA, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
>>>>>>> 499221a7b8217276dbba438808a6ad3ece216a4d

export default function Home() {
  return (
    <>
<<<<<<< HEAD
      <CollectionCarcoucel data={dataTest} itemKey="product-1" title="VEGGIE" subTitle= "Last call! Shop deep deals on 100+ bulk picks while you can." />
      <HomeRecipe data={recipe}  itemKey="product-2" title="Special Recipes"/>
=======
      <HomeBanner />
      <HomeVideo />
      <HomeCTA />
      <HomeSubscribe />
>>>>>>> 499221a7b8217276dbba438808a6ad3ece216a4d
    </>
  )
}

Home.Layout = Layout
