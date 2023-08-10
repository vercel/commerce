'use client';

import dynamic from 'next/dynamic';

import Hero from '@/components/modules/hero';
const BlurbSection = dynamic(() => import('@/components/modules/blurb-section/blurb-section'));
const FilteredProductList = dynamic(
  () => import('@/components/modules/filtered-product-list/filtered-product-list')
);
const ReusableSection = dynamic(
  () => import('@/components/modules/reusable-section/reusable-section')
);
const Slider = dynamic(() => import('@/components/modules/slider/slider'));
const USPSection = dynamic(() => import('@/components/modules/usp-section/usp-section'));

import { InformationCircleIcon } from '@heroicons/react/24/outline';

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
            <InformationCircleIcon className="mr-1" />
            {`No matching component (Type: ${_type})`}
          </span>
        </div>
      );
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
