import * as HeroIcons from '@heroicons/react/24/outline';
import startcase from 'lodash.startcase';

type IconName = keyof typeof HeroIcons;
interface IconProps {
  icon: string;
  className?: string;
}

const DynamicHeroIcon = ({ icon, className }: IconProps) => {
  const _icon = startcase(icon).replace(/\s/g, '');
  const SingleIcon = HeroIcons[`${_icon}Icon` as IconName];

  return SingleIcon ? <SingleIcon className={className} /> : null;
};

export default DynamicHeroIcon;
