import {
  Layout
} from 'src/components/common';
import MenuNavigation from 'src/components/common/MenuNavigation/MenuNavigation';
import MenuNavigationProductList from 'src/components/common/MenuNavigationProductList/MenuNavigationProductList';
import BlogContent from 'src/components/modules/blogs/BlogContent/BlogContent';
import { RecipesListPage } from 'src/components/modules/recipes';
import { OPTION_ALL, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils';
import imageAuthor from '../src/components/common/Author/img/author.png';

const CATEGORY = [
  {
      name: 'All',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=${OPTION_ALL}`,
  },
  {
      name: 'Veggie',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=veggie`,
  },
  {
      name: 'Seafood',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=seafood`,
  },
  {
      name: 'Frozen',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=frozen`,
  },
  {
      name: 'Coffee Bean',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=coffee-bean`,
  },
  {
      name: 'Sauce',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=sauce`,
  },
]
const BRAND = [
  {
      name: 'All',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=${OPTION_ALL}`,
  },
  {
      name: 'Veggie',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=veggie`,
  },
  {
      name: 'Seafood',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=seafood`,
  },
  {
      name: 'Frozen',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=frozen`,
  },
  {
      name: 'Coffee Bean',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=coffee-bean`,
  },
  {
      name: 'Sauce',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=sauce`,
  },
];
const BLOGDETAIL=
  {
    date:'APRIL 30, 2021',
    title:'The Best Sesame Soy Broccoli Salad',
    imageAuthor:imageAuthor,
    nameAuthor:'Alessandro Del Piero',
    content:`
    <p> When you’re trying to eat healthier but want something more substantial than a leafy green salad, broccoli salad is there for you. I love the crunch and heft of broccoli, especially when it’s cut up into bite size spoonable pieces.

    Some people aren’t into raw broccoli, but I love it! I always go for the raw broccoli on those vegetable platters that seem to be at every potluck/party you go to.

    This is a simple broccoli salad: you have the bulk of it, raw broccoli; crunchy red onions for a bit of acidity and raw crunch, craisins for sweetness, almonds for a nutty counter point; and a sweet and tangy soy-rice vinegar-sesame dressing.
    </p>

    <h2>What is broccoli salad</h2>

    <p>
    When you’re trying to eat healthier but want something more substantial than a leafy green salad, broccoli salad is there for you. I love the crunch and heft of broccoli, especially when it’s cut up into bite size spoonable pieces.

    Some people aren’t into raw broccoli, but I love it! I always go for the raw broccoli on those vegetable platters that seem to be at every potluck/party you go to.

    This is a simple broccoli salad: you have the bulk of it, raw broccoli; crunchy red onions for a bit of acidity and raw crunch, craisins for sweetness, almonds for a nutty counter point; and a sweet and tangy soy-rice vinegar-sesame dressing.
    </p>
    
    <h2>What about broccoli stems?</h2>

    <p>
    You can eat broccoli stems. In fact, they are delicious. Just use a peeler to peel off the outsides and then trim the stalks into small 1/4”-1/2” cubes.
    </p>
    `
  };

export default function Test() {

  return (
    <>
      {/* <BlogContent 
        date={BLOGDETAIL.date}
        title={BLOGDETAIL.title}
        imageAuthor={BLOGDETAIL.imageAuthor}
        nameAuthor={BLOGDETAIL.nameAuthor}
        content={BLOGDETAIL.content}
      /> */}
      <RecipesListPage/>
      {/* <MenuNavigation heading="CATEGORIES" categories={CATEGORY}/>
      <MenuNavigationProductList categories={CATEGORY}  brands={BRAND} featured={BRAND}/> */}
    </>
  )
}

Test.Layout = Layout
