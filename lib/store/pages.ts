export type Page = {
  id: string;
  handle: string;
  title: string;
  body: string;
  bodySummary: string;
  seo?: {
    title: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
};

const pages: Page[] = [
  {
    id: "1",
    handle: "about",
    title: "About Us",
    body: "<h2>Welcome to Our Store</h2><p>We are dedicated to providing the best shopping experience for our customers.</p>",
    bodySummary: "Learn about our store and our mission.",
    seo: {
      title: "About Us | Our Store",
      description:
        "Learn about our store and our mission to provide the best shopping experience.",
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    handle: "shipping",
    title: "Shipping Information",
    body: "<h2>Shipping Policy</h2><p>We offer worldwide shipping with competitive rates.</p>",
    bodySummary: "Information about our shipping policies and rates.",
    seo: {
      title: "Shipping Information | Our Store",
      description:
        "Learn about our shipping policies and worldwide delivery options.",
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

export const getPage = (handle: string): Promise<Page | undefined> => {
  return Promise.resolve(pages.find((page) => page.handle === handle));
};
