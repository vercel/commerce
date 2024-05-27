import { Metaobject, ScreenSize } from 'lib/shopify/types';

export const computeLayoutClassnames = ({
  layouts,
  screenSizes
}: {
  layouts: Metaobject[];
  screenSizes: Metaobject[];
}) => {
  const availableLayouts = layouts.reduce(
    (acc, layout) => {
      const screenSize = screenSizes.find((screen) => screen.id === layout.screen_size);
      if (screenSize?.size) {
        acc[screenSize.size.toLowerCase() as ScreenSize] = Number(layout.number_of_columns);
      }

      return acc;
    },
    {} as Record<ScreenSize, number>
  );

  let classnames = {} as { [key: string]: boolean };

  if (availableLayouts.small) {
    classnames = {
      ...classnames,
      'sm:grid-cols-1 sm:gap-x-8 sm:gap-y-12': availableLayouts.small === 1,
      'sm:grid-cols-2 sm:gap-y-16': availableLayouts.small === 2,
      'sm:grid-cols-3 sm:gap-y-16': availableLayouts.small === 3,
      'sm:grid-cols-4 sm:gap-y-16': availableLayouts.small === 4
    };
  }

  if (availableLayouts.medium) {
    classnames = {
      ...classnames,
      'md:grid-cols-1 md:gap-x-8 md:gap-y-12': availableLayouts.medium === 1,
      'md:grid-cols-2 md:gap-y-16': availableLayouts.medium === 2,
      'md:grid-cols-3 md:gap-y-16': availableLayouts.medium === 3,
      'md:grid-cols-4 md:gap-y-16': availableLayouts.medium === 4
    };
  }

  if (availableLayouts.large) {
    classnames = {
      ...classnames,
      'lg:grid-cols-1 lg:gap-x-8 lg:gap-y-12': availableLayouts.large === 1,
      'lg:grid-cols-2 lg:gap-y-16': availableLayouts.large === 2,
      'lg:grid-cols-3 lg:gap-y-16': availableLayouts.large === 3,
      'lg:grid-cols-4 lg:gap-y-16': availableLayouts.large === 4
    };
  }

  const validClassnames = Object.keys(classnames)
    .filter((key) => classnames[key])
    .join(' ');

  return validClassnames;
};
