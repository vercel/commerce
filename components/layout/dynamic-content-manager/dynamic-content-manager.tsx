'use client';

import BlurbSection from '@/components/modules/blurb-section/blurb-section';
import FilteredProductList from '@/components/modules/filtered-product-list/filtered-product-list';
import Hero from '@/components/modules/hero';
import ReusableSection from '@/components/modules/reusable-section/reusable-section';
import Slider from '@/components/modules/slider/slider';
import USPSection from '@/components/modules/usp-section/usp-section';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Suspense } from 'react';
interface getContentComponentProps {
  _type: string;
  _key: number;
  disabled: boolean;
}

const getContentComponent = ({ _type, _key, disabled, ...rest }: getContentComponentProps) => {
  let Component: any;

  switch (_type) {
    case 'hero':
      if (disabled !== true) {
        Component = Hero;
      } else {
        return;
      }
      break;
    case 'slider':
      if (disabled !== true) {
        Component = Slider;
      } else {
        return;
      }
      break;
    case 'filteredProductList':
      if (disabled !== true) {
        Component = FilteredProductList;
      } else {
        return;
      }
      break;
    case 'blurbSection':
      if (disabled !== true) {
        Component = BlurbSection;
      } else {
        return;
      }
      break;
    case 'uspSection':
      if (disabled !== true) {
        Component = USPSection;
      } else {
        return;
      }
      break;
    case 'reusableSection':
      if (disabled !== true) {
        Component = ReusableSection;
      } else {
        return;
      }
      break;
    default:
      return (
        <div
          className={`px-4 lg:px-8 2xl:px-16 ${
            process.env.NODE_ENV === 'production' ? 'hidden' : ''
          }`}
          key={`index-${_key}`}
        >
          <span className="inline-flex items-center bg-red p-2 text-sm font-bold">
            <InfoCircledIcon className="mr-1" />
            {`No matching component (Type: ${_type})`}
          </span>
        </div>
      );
  }

  return Component ? (
    <Suspense key={`${_key}`} fallback={<div>Loading...</div>}>
      <Component {...rest} />
    </Suspense>
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
