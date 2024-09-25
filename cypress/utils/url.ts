export function toSlug(input: string): string {
  // 1. Convertir la chaîne en minuscules
  let slug = input.toLowerCase();

  // 2. Remplacer les caractères accentués ou spéciaux par leurs équivalents non accentués
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 3. Remplacer tous les caractères non alphanumériques par des tirets
  slug = slug.replace(/[^a-z0-9]+/g, '-');

  // 4. Supprimer les tirets de début ou de fin
  return slug.replace(/^-+|-+$/g, '');
}
export const verifyRequest = (alias: string) => {
  cy.wait(alias).its('response.statusCode').should('eq', 200);
};
