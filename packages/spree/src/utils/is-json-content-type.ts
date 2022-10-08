const isJsonContentType = (contentType: string): boolean =>
  contentType.includes('application/json') ||
  contentType.includes('application/vnd.api+json')

export default isJsonContentType
