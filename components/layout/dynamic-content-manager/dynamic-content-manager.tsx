import BlurbSection from '@/components/modules/blurb-section/blurb-section';
import FilteredProductList from '@/components/modules/filtered-product-list/filtered-product-list';
import Hero from '@/components/modules/hero';
import ReusableSection from '@/components/modules/reusable-section/reusable-section';
import Slider from '@/components/modules/slider/slider';
import USPSection from '@/components/modules/usp-section/usp-section';

interface getContentComponentProps {
  _type: string;
  _key: number;
}

const getContentComponent = ({ _type, _key, ...rest }: getContentComponentProps) => {
  let Component: any;

  switch (_type) {
    case 'hero':
      Component = Hero;
      break;
    case 'slider':
      Component = Slider;
      break;
    case 'filteredProductList':
      Component = FilteredProductList;
      break;
    case 'blurbSection':
      Component = BlurbSection;
      break;
    case 'uspSection':
      Component = USPSection;
      break;
    case 'reusableSection':
      Component = ReusableSection;
      break;
    default:
      return;
  }

  return Component ? (
    <Component key={`${_key}`} {...rest} />
  ) : (
    <div key={`${_key}`}>Something else</div>
  );
};

interface dynamicContentManagerProps {
  content: [] | any;
}

const DynamicContentManager = ({ content }: dynamicContentManagerProps) => {
  return (
    <div className="dynamic-content overflow-x-hidden">{content?.map(getContentComponent)}</div>
  );
};

export default DynamicContentManager;
