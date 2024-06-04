import { ChevronDownIcon } from '@heroicons/react/16/solid';
import Tooltip from './tooltip';

function Banner() {
  return (
    <div className="flex min-h-10 w-full flex-col items-center justify-center gap-x-8 bg-primary p-2 text-sm font-medium text-white md:flex-row md:p-0">
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
