import * as Bowser from 'bowser'

export function isDesktop(): boolean {
  const browser = Bowser.getParser(window.navigator.userAgent)
  return browser.getPlatform().type === 'desktop'
}

export function isMobile(): boolean {
  const browser = Bowser.getParser(window.navigator.userAgent)
  return browser.getPlatform().type === 'mobile'
}

export function isTablet(): boolean {
  const browser = Bowser.getParser(window.navigator.userAgent)
  return browser.getPlatform().type === 'tablet'
}
