export interface Discount {
  /**
   * The value of the discount, can be an amount or percentage.
   */
  value: number
}

export interface Measurement {
  /**
   * The measurement's value.
   */
  value: number
  /**
   * The measurement's unit, such as "KILOGRAMS", "GRAMS", "POUNDS" & "OOUNCES".
   */
  unit: 'KILOGRAMS' | 'GRAMS' | 'POUNDS' | 'OUNCES'
}

export interface Image {
  /**
   * The URL of the image.
   */
  url: string
  /**
   * A word or phrase that describes the content of an image.
   */
  alt?: string
  /**
   * The image's width.
   */
  width?: number
  /**
   * The image's height.
   */
  height?: number
}

export interface CustomField {
  /**
   * The unique identifier for the custom field.
   */
  id: string
  /**
   * The name of the custom field.
   */
  name: string
  /**
   * The value of the custom field.
   */
  value: string
}

export interface Metafield {
  /**
   * The unique identifier for the metafield.
   */
  key: string

  /**
   * The namespace for the metafield, which is a container for a set of metadata.
   * @example `rating`
   */
  namespace: string

  /**
   * The value of the metafield, usually a string that can be might parsed into JSON.
   * @example `{"value": 5, "scale_max": 5}`
   */
  value: any

  /**
   * The value of the metafield, complete with HTML formatting.
   */
  valueHtml?: string

  /**
   * The type of the metafield, used to determine how the value should be interpreted.
   * For example: `string`, `integer`, `boolean`, `json` ...
   */
  type?: string

  /**
   * The name of the metafield, that can be used as a label.
   */
  name?: string
}

export interface Metafields {
  /**
   * The namespace for the metafield, which is a container for a set of metadata.
   * @example `reviews`, `specifications`
   */
  [namespace: string]: {
    /**
     * The key of the metafield, which is the name of the metafield.
     * @example `rating`
     */
    [key: string]: Metafield
  }
}
