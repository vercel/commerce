import { create, insertMultiple } from '@orama/orama';
import { getCollectionProducts, getCollections } from 'lib/shopify';

export async function createOramaInstance() {
  const collections = await getCollections();

  const products = await Promise.all(
    collections.map(({ handle, title }) => {
      return getCollectionProducts({ collection: handle }).then((products) =>
        products.map((product) => ({ ...product, collection: { handle, title } }))
      );
    })
  );

  const allProducts = products
    .flat()
    .filter((product, index, self) => self.findIndex(({ id }) => id === product.id) === index);

  const db = await create({
    schema: {
      title: 'string',
      collection: {
        handle: 'string',
        title: 'string'
      }
    }
  });

  await insertMultiple(db, allProducts);

  return db;
}
