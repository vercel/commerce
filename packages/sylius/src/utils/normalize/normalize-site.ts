import { SyliusCategorie } from 'types/site'

export const normalizeCategorie = (categorie: SyliusCategorie) => {
  return {
    id: categorie.id.toString(),
    name: categorie.name,
    slug: categorie.slug,
    path: `/${categorie.slug}`,
  }
}
