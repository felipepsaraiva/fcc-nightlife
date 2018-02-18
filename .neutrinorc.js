module.exports = {
  options: {
    source: 'client/src',
    output: 'client/build',
    tests: 'client/test'
  },
  use: [
    [
      '@neutrinojs/airbnb',
      {
        eslint: {
          rules: {
            'function-paren-newline': 'off'
          }
        }
      }
    ],
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'Nightlife App'
        }
      }
    ]
  ]
};
