/**
 * Generates definitions for REST API endpoints that are being
 * used by ../api using https://github.com/drwpow/swagger-to-ts
 */
const { readFileSync, promises } = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const swaggerToTS = require('@manifoldco/swagger-to-ts').default

async function getSchema(url) {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Request failed with ${res.status}: ${res.statusText}`)
  }

  return res.json()
}

const schemas = Object.entries({
  '../api/definitions/catalog.ts':
    'https://next-api.stoplight.io/projects/8433/files/BigCommerce_Catalog_API.oas2.yml?ref=version%2F1.3',
})

async function writeDefinitions() {
  const ops = schemas.map(async ([dest, url]) => {
    const destination = path.join(__dirname, dest)
    const schema = await getSchema(url)
    const definition = swaggerToTS(schema.content, {
      prettierConfig: 'package.json',
    })

    await promises.writeFile(destination, definition)

    console.log(`✔️ Added definitions for: ${dest}`)
  })

  await Promise.all(ops)
}

writeDefinitions()
