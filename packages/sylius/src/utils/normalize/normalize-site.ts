import { SyliusCategorie } from 'types/site'

export const normalizeCategorie = (categorie: SyliusCategorie) => {
  return {
    id: categorie.id.toString(),
    name: categorie.name,
    slug: categorie.code,
    path: `/${categorie.code}`,
  }
}
