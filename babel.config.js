module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8'] } }],
    '@babel/preset-react'
  ],

  plugins: [
    '@babel/plugin-proposal-class-properties', // es6 class定义转换
    // '@babel/plugin-syntax-dynamic-import', // 按需加载
    // '@babel/plugin-transform-async-to-generator', // 将 es7 中的 async 转成 generator
    // '@babel/plugin-proposal-object-rest-spread', // ...语法的支持
    ['react-intl', { messagesDir: './translations/messages/' }],

    // antd按需加载
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]
  ]
};
