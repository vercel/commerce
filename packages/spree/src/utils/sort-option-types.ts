import type { ExpandedProductOption } from '../types'

const sortOptionsByPosition = (
  options: ExpandedProductOption[]
): ExpandedProductOption[] => {
  return options.sort((firstOption, secondOption) => {
    return firstOption.position - secondOption.position
  })
}

export default sortOptionsByPosition
