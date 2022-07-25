import { MetafieldType } from '../types/product'

export const parseJson = (value: string): any => {
  try {
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}

const unitConversion: Record<string, string> = {
  MILLIMETERS: 'millimeter',
  CENTIMETERS: 'centimeter',
  METERS: 'meter',

  MILLILITERS: 'milliliter',
  LITERS: 'liter',
  FLUID_OUNCES: 'fluid-ounce',
  IMPERIAL_FLUID_OUNCES: 'fluid-ounce',
  GALLONS: 'gallon',

  KILOGRAMS: 'kilogram',
  GRAMS: 'gram',
  OUNCES: 'ounce',
  POUNDS: 'pound',
}

export const getMeasurment = (input: string, locale: string = 'en-US') => {
  try {
    let { unit, value } = JSON.parse(input)

    return new Intl.NumberFormat(locale, {
      unit: unitConversion[unit],
      style: 'unit',
    }).format(parseFloat(value))
  } catch (e) {
    console.error(e)
    return input
  }
}

export const getMetafieldValue = (
  type: MetafieldType,
  value: string,
  locale: string = 'en-US'
) => {
  switch (type) {
    case 'boolean':
      return value === 'true' ? '&#10003;' : '&#10005;'
    case 'number_integer':
      return parseInt(value).toLocaleString(locale)
    case 'number_decimal':
      return parseFloat(value).toLocaleString(locale)
    case 'date':
      return Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
      }).format(new Date(value))
    case 'date_time':
      return Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
        timeStyle: 'long',
      }).format(new Date(value))
    case 'dimension':
    case 'volume':
    case 'weight':
      return getMeasurment(value, locale)
    case 'rating':
      const { scale_max, value: val } = JSON.parse(value)
      return Array.from({ length: scale_max }, (_, i) =>
        i <= val - 1 ? '&#9733;' : '&#9734;'
      ).join('')
    case 'color':
      return `<figure style="background-color: ${value}; width: 1rem; height:1rem; display:block; margin-top: 2px; border-radius: 100%;"/>`
    case 'url':
      return `<a href="${value}" target="_blank">${value}</a>`
    case 'multi_line_text_field':
      return value
        .split('\n')
        .map((line) => `<p>${line}</p>`)
        .join('')
    case 'json':
    case 'single_line_text_field':
    case 'product_reference':
    case 'page_reference':
    case 'variant_reference':
    case 'file_reference':
    default:
      return value
  }
}

export const humanizeString = (string: string) => {
  string = string
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()

  string = string.charAt(0).toUpperCase() + string.slice(1)

  return string
}
