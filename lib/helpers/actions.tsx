export function copyText(text: string) {
  navigator.clipboard.writeText(text);
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
