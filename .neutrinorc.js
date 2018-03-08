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
            'function-paren-newline': 'off',
            'no-unused-vars': 1,
            'react/forbid-prop-types': [2, { forbid: ['any'] }]
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
