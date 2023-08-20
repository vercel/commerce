export function copyText(text: string) {
  navigator.clipboard.writeText(text);
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getKeyByValue<O extends object>(object: O, value: O[keyof O]) {
  return Object.keys(object).find(key => object[key as keyof O] === value);
}
