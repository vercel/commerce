module.exports = {
  extends: ['next', 'prettier', 'plugin:tailwindcss/recommended'],
  plugins: ['unicorn', 'prettier', 'tailwindcss', 'unused-imports'],
  rules: {
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all'
      }
    ],
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase'
      }
    ],
    "prettier/prettier": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "no-template-curly-in-string": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ]
  },
  "settings": {
    "tailwindcss": {
      "config": "./tailwind.config.js",
      "callees": ["cx"]
    },
    "tailwindcss/classnames-order": [
      true,
      {
        "callees": ["cx"],
        "config": "./tailwind.config.js"
      }
    ]
  }
};
