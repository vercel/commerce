
import { CarouselCommon, LabelCommon, Layout, QuanittyInput,CheckboxCommon ,Author,DateTime} from 'src/components/common'
import { HomeCategories } from 'src/components/modules/home';
import imgAuthor from '../src/components/common/Author/img/author.png';

import veggle from '../src/components/modules/home/homeCategories/img/veggle.png';
import seafood from '../src/components/modules/home/homeCategories/img/seafood.png';
import frozen from '../src/components/modules/home/homeCategories/img/frozen.png';
import coffeebean from '../src/components/modules/home/homeCategories/img/coffeebean.png';
import sauce from '../src/components/modules/home/homeCategories/img/sauce.png';



const dataTest = [{
  text: 1
}, {
  text: 2
}, {
  text: 3
}, {
  text: 4
}, {
  text: 5
}, {
  text: 6
}]
const test = (props: { text: string }) => <div className="h-64 bg-yellow-300">{props.text}</div>
const categories = [
  {
    id:1,
    image:veggle,
    name:"Veggie",
    link:"veggie.html"
  },  {
    id:2,
    image:seafood,
    name:"Seafood",
    link:"seafood.html"
  }
  , {
    id:3,
    image:frozen,
    name:"Frozen",
    link:"frozen.html"
  }
  , {
    id:4,
    image:coffeebean,
    name:"Coffe Bean",
    link:"frozen.html"
  }
  , {
    id:5,
    image:sauce,
    name:"Sauce",
    link:"frozen.html"
  }
]
export default function Home() {
  return (
    <>
      {/* <CheckboxCommon defaultChecked={true}></CheckboxCommon>
      <Author image={imgAuthor} name="Alessandro Del Piero"></Author>
      <DateTime date="april 30,2021"></DateTime>*/}
      <HomeCategories categories={categories}></HomeCategories> 
    </>
  )
}

Home.Layout = Layout
