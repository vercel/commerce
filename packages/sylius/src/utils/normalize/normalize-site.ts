import { SyliusCategorie } from 'types/site'

export const normalizeCategorie = (categorie: SyliusCategorie) => {
  return {
    //We use the code as id because Sylius need the code in the request parameter to filter products
    id: categorie.code,
    name: categorie.name,
    slug: categorie.code,
    path: `/${categorie.code}`,
  }
}
