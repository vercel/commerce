'use client';

import MenuIcon from 'components/icons/menu';

export default function Menu() {
  return (
    <button type="button" onClick={() => console.debug('showmenu')}>
      <MenuIcon />
    </button>
  );
}
