/**
 * Generates definitions for REST API endpoints that are being
 * used by ../api using https://github.com/drwpow/swagger-to-ts
 */
const { readFileSync, promises } = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const swaggerToTS = require('@manifoldco/swagger-to-ts').default

async function getSchema(filename) {
  const url = `https://next-api.stoplight.io/projects/8433/files/${filename}?ref=version%2F1.3`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Request failed with ${res.status}: ${res.statusText}`)
  }

  return res.json()
}

const schemas = Object.entries({
  '../api/definitions/catalog.ts': 'BigCommerce_Catalog_API.oas2.yml',
  '../api/definitions/store-content.ts':
    'BigCommerce_Store_Content_API.oas2.yml',
  // swagger-to-ts is not working for the schema of the cart API
  // '../api/definitions/cart.ts':
  //   'BigCommerce_Server_to_Server_Cart_API.oas2.yml',
})

async function writeDefinitions() {
  const ops = schemas.map(async ([dest, filename]) => {
    const destination = path.join(__dirname, dest)
    const schema = await getSchema(filename)
    const definition = swaggerToTS(schema.content, {
      prettierConfig: 'package.json',
    })

    await promises.writeFile(destination, definition)

    console.log(`✔️ Added definitions for: ${dest}`)
  })

  await Promise.all(ops)
}

writeDefinitions()
