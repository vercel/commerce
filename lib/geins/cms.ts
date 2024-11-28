import { GeinsCMS } from '@geins/cms';
import { GeinsCore } from '@geins/core';
import { GeinsMenuType } from '@geins/types';
import { reshapeMenu, reshapePage } from './reshape';
import { MenuItemType } from './types';

export const getMenu = async (
  geinsCore: GeinsCore,
  locationId: string
): Promise<MenuItemType[]> => {
  const geinsCMS = new GeinsCMS(geinsCore);
  const menu = await geinsCMS.menu.get({ menuLocationId: locationId }).then((result) => {
    return result as GeinsMenuType;
  });

  return reshapeMenu(menu, locationId);
};

export const getPage = async (geinsCore: GeinsCore, alias: string) => {
  const geinsCMS = new GeinsCMS(geinsCore);
  const data = await geinsCMS.page.get({ alias }).then((result) => {
    return result;
  });

  return reshapePage(data, alias);
};
