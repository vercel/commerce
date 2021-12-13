import type { ProductOptionValues } from '@commerce/types/product'
import type {
  JsonApiDocument,
  JsonApiResponse,
} from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi'
import { jsonApi } from '@spree/storefront-api-v2-sdk'
import type { RelationType } from '@spree/storefront-api-v2-sdk/types/interfaces/Relationships'
import SpreeResponseContentError from '../errors/SpreeResponseContentError'
import type { OptionTypeAttr, ExpandedProductOption } from '../types'
import sortOptionsByPosition from '../utils/sort-option-types'

const isColorProductOption = (productOption: ExpandedProductOption) => {
  return productOption.displayName === 'Color'
}

const expandOptions = (
  spreeSuccessResponse: JsonApiResponse,
  spreeOptionValue: JsonApiDocument,
  accumulatedOptions: ExpandedProductOption[]
): ExpandedProductOption[] => {
  const spreeOptionTypeIdentifier = spreeOptionValue.relationships.option_type
    .data as RelationType

  const existingOptionIndex = accumulatedOptions.findIndex(
    (option) => option.id == spreeOptionTypeIdentifier.id
  )

  let option: ExpandedProductOption

  if (existingOptionIndex === -1) {
    const spreeOptionType = jsonApi.findDocument<OptionTypeAttr>(
      spreeSuccessResponse,
      spreeOptionTypeIdentifier
    )

    if (!spreeOptionType) {
      throw new SpreeResponseContentError(
        `Option type with id ${spreeOptionTypeIdentifier.id} not found.`
      )
    }

    option = {
      __typename: 'MultipleChoiceOption',
      id: spreeOptionType.id,
      displayName: spreeOptionType.attributes.presentation,
      position: spreeOptionType.attributes.position,
      values: [],
    }
  } else {
    const existingOption = accumulatedOptions[existingOptionIndex]

    option = existingOption
  }

  let optionValue: ProductOptionValues

  const label = isColorProductOption(option)
    ? spreeOptionValue.attributes.name
    : spreeOptionValue.attributes.presentation

  const productOptionValueExists = option.values.some(
    (optionValue: ProductOptionValues) => optionValue.label === label
  )

  if (!productOptionValueExists) {
    if (isColorProductOption(option)) {
      optionValue = {
        label,
        hexColors: [spreeOptionValue.attributes.presentation],
      }
    } else {
      optionValue = {
        label,
      }
    }

    if (existingOptionIndex === -1) {
      return [
        ...accumulatedOptions,
        {
          ...option,
          values: [optionValue],
        },
      ]
    }

    const expandedOptionValues = [...option.values, optionValue]
    const expandedOptions = [...accumulatedOptions]

    expandedOptions[existingOptionIndex] = {
      ...option,
      values: expandedOptionValues,
    }

    const sortedOptions = sortOptionsByPosition(expandedOptions)

    return sortedOptions
  }

  return accumulatedOptions
}

export default expandOptions
