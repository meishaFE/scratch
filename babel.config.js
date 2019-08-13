module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties', // es6 class定义转换
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-proposal-object-rest-spread',
    [
      'react-intl',
      {
        messagesDir: './translations/messages/'
      }
    ]
  ],
  presets: [
    ['@babel/preset-env', { targets: { browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8'] } }],
    '@babel/preset-react'
  ]
};
