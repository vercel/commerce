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
