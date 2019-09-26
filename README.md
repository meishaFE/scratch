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
  "clean-webpack-plugin": "^3.0.0",
  "gulp": "^4.0.2",
}
```

修改的文件：

- `containers/gui.jsx` ReactModal.setAppElemen
- `container/library-item.jsx` 更改cdn地址
- `containers/modal.jsx` 去除pushState

- `components/gui/gui.jsx` 更改 menubar,去除教程
- `components/monitor` 修改样式
- `components/question` 修改样式

- `lib/default-project` 修改默认项目（替换文件夹下的文件）
- `lib/libraries` 增加素材
- `lib/analytice.js` 去除 react-ga
- `lib/app-state-hoc.jsx` 将store暴露到全局 
- `lib/hash-parser-hoc.jsx` 去除 hash 部分
- `lib/project-fetcher-hoc.jsx` 更改cdn地址
- `lib/storage.js` 更改cdn地址
- `lib/vm-manager-hoc.jsx` 增加加载缓存项目

打包注意事项：

- 打包时会会把打包后的文件复制到开发环境，注意修改路径
- 打包文件夹为 release
- 打包后会删除 static 文件，文件太大了。web端的项目手动复制过去，注意编辑器更新时可能有文件更新，需要再复制一次
- 打包后修改 package.json 中的版本号
- 提交到 msater 分支：npm run release