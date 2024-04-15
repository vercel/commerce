import { ChevronDownIcon } from '@heroicons/react/16/solid';
import Tooltip from './tooltip';

function Banner() {
  return (
    <div className="flex h-10 w-full items-center justify-center gap-x-8 bg-[#17E4BB] text-sm font-medium text-[#08312B]">
      <span>
        Speak to a Specialist Now:{' '}
        <a href={`tel:${8882422605}`} className="ml-1">
          (888) 242-2605
        </a>
      </span>
      <div data-tooltip-id="work-hours-tooltip" className="flex items-center">
        Business Hours <ChevronDownIcon className="h-5 w-5" />
      </div>
      <Tooltip id="work-hours-tooltip">
        <p>Monday - Friday: 9:00am - 8:00pm EST</p>
        <p>Saturday 11:00am - 4:00pm EST</p>
      </Tooltip>
    </div>
  );
}

export default Banner;
