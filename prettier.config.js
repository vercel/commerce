/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: true,
  arrowParens: 'always',
  trailingComma: 'none',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  proseWrap: 'never',
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss']
};
