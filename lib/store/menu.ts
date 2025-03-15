export interface MenuItem {
  title: string;
  path: string;
}

export interface Menu {
  title: string;
  items: MenuItem[];
}

const menus: Record<string, Menu> = {
  footer: {
    title: "Footer",
    items: [
      { title: "About", path: "/about" },
      { title: "Shipping", path: "/shipping" },
      { title: "Terms of Service", path: "/terms" },
      { title: "Privacy Policy", path: "/privacy" },
    ],
  },
  navbar: {
    title: "Navigation",
    items: [
      { title: "All", path: "/search" },
      { title: "Electronics", path: "/search/electronics" },
      { title: "Books", path: "/search/books" },
      { title: "Clothing", path: "/search/clothing" },
    ],
  },
};

export const getMenu = (handle: string): Promise<Menu | undefined> => {
  return Promise.resolve(menus[handle]);
};
