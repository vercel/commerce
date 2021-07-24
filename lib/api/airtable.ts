import Airtable from 'airtable'

const API_KEY = process.env.AIRTABLE_API_KEY || ''
const BASE_ID = process.env.AIRTABLE_BASE_ID || ''

const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID)

export interface Recipe {
  id: string
  title: string
  slug: string
}

export const getRecipePages = async (): Promise<string[]> =>
  new Promise((resolve, reject) =>
    base('Recipes')
      .select({
        view: 'Pages',
        filterByFormula: "{Status} = 'Live'",
        fields: ['Slug'],
      })
      .all((error, records = []) => {
        if (error) {
          reject(error)
        } else {
          resolve(records.map((recipe) => recipe.get('Slug') as string))
        }
      })
  )

export const getRecipes = async (): Promise<Recipe[]> =>
  new Promise((resolve, reject) =>
    base('Recipes')
      .select({
        view: 'Pages',
        filterByFormula: "{Status} = 'Live'",
      })
      .all((error, records = []) => {
        if (error) {
          reject(error)
        } else {
          resolve(
            records.map((recipe) => ({
              id: recipe.getId(),
              title: recipe.get('Recipes') as string,
              slug: recipe.get('Slug') as string,
            }))
          )
        }
      })
  )
