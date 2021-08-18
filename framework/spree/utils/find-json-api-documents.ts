// Based on https://github.com/spark-solutions/spree2vuestorefront

import type {
  JsonApiResponse,
  JsonApiDocument,
} from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi'

export const findIncluded = <T extends JsonApiDocument>(
  response: JsonApiResponse,
  objectType: string,
  objectId: string
): T | null => {
  if (!response.included) {
    return null
  }

  return (
    (response.included.find(
      (includedObject) =>
        includedObject.type === objectType && includedObject.id === objectId
    ) as T) || null
  )
}

export const findIncludedOfType = <T extends JsonApiDocument>(
  response: JsonApiResponse,
  singlePrimaryRecord: JsonApiDocument,
  objectRelationshipType: string
): T[] => {
  if (!response.included) {
    return []
  }

  const typeRelationships =
    singlePrimaryRecord.relationships[objectRelationshipType]

  if (!typeRelationships) {
    return []
  }

  return typeRelationships.data
    .map((typeObject: JsonApiDocument) =>
      findIncluded(response, typeObject.type, typeObject.id)
    )
    .filter((typeRecord: JsonApiDocument | null) => !!typeRecord)
}
