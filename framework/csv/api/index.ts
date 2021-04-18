import type { CommerceAPIConfig } from '@commerce/api'

import { CSV_URL } from '../const'

if (!CSV_URL) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_CSV_URL is missing and it's required to access your store`
  )
}

export interface CSVConfig extends CommerceAPIConfig {}

export class Config {
  private config: CSVConfig

  constructor(config: CSVConfig) {
    this.config = config
  }

  getConfig(userConfig: Partial<CSVConfig> = {}) {
    return Object.entries(userConfig).reduce<CSVConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<CSVConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const config = new Config({
  locale: 'en-US',
})

export function getConfig(userConfig?: Partial<CSVConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<CSVConfig>) {
  return config.setConfig(newConfig)
}
