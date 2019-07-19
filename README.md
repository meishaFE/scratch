增加的 npm 包：
```javascript
{
  "@babel/plugin-proposal-class-properties": "^7.5.0",
  "friendly-errors-webpack-plugin": "^1.7.0",
  "less": "^3.9.0",
  "less-loader": "^5.0.0",
  "mini-css-extract-plugin": "^0.7.0",
  "optimize-css-assets-webpack-plugin": "^5.0.3",
  "url-loader": "^2.0.1",
}
```

修改的文件：

- `components/gui/gui.jsx` 更改 menubar
- `lib/analytice.js` 去除 react-ga
- `lib/app-state-hoc.jsx` 将store暴露到全局 