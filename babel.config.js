module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8'] } }],
    '@babel/preset-react'
  ],

  plugins: [
    '@babel/plugin-proposal-class-properties', // es6 class定义转换
    ['react-intl', { messagesDir: './translations/messages/' }]
  ]
};
