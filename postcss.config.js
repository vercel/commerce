module.exports = {
  plugins: [
<<<<<<< HEAD
    "tailwindcss",
    "postcss-nesting",
    "postcss-flexbugs-fixes",
=======
    'tailwindcss',
    'postcss-flexbugs-fixes',
>>>>>>> f2108ca97faf54a18680b608356012700971c450
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
  ],
}
