## 增加的 npm 包：

```javascript
{
  "@babel/plugin-proposal-class-properties": "^7.5.0",
  "clean-webpack-plugin": "^3.0.0",
  "friendly-errors-webpack-plugin": "^1.7.0",
  "gulp": "^4.0.2",
  "less": "^3.9.0",
  "less-loader": "^5.0.0",
  "mini-css-extract-plugin": "^0.7.0",
  "optimize-css-assets-webpack-plugin": "^5.0.3",
  "url-loader": "^2.0.1",
  "webpack-merge": "^4.2.1"
}
```

## 修改的文件：

- `containers/gui.jsx` ReactModal.setAppElemen
- `container/library-item.jsx` 更改 cdn 地址
- `containers/modal.jsx` 去除 pushState

- `components/gui/gui.jsx` 更改 menubar,去除教程
- `components/gui/gui.css`
- `components/library-item/library-item.jsx` 增加 title
- `components/monitor/list-monitor.jsx`
- `components/monitor/monitor.css` 修改样式
- `components/question/question.jsx`
- `components/question/question.css` 修改样式
- `components/spinner/spinner.css` 修改样式

- `lib/default-project` 修改默认项目（替换文件夹下的文件）
- `lib/libraries` 增加素材
- `lib/libraries/decks/index.jsx` 去除教程素材配置
- `lib/analytice.js` 去除 react-ga
- `lib/app-state-hoc.jsx` 将 store 暴露到全局
- `lib/hash-parser-hoc.jsx` 去除 hash 部分
- `lib/project-fetcher-hoc.jsx` 更改 cdn 地址
- `lib/storage.js` 更改 cdn 地址
- `lib/vm-manager-hoc.jsx` 增加加载缓存项目

## 打包注意事项：

- 打包时会会把打包后的文件复制到开发环境，注意修改路径
- 打包文件夹为 release
- 打包后会删除 static 文件，文件太大了。web 端的项目手动复制过去，注意编辑器更新时可能有文件更新，需要再复制一次
- 打包后修改 package.json 中的版本号
- 提交到 msater 分支：npm run release

## 报错

### 1

错误内容：`SyntaxError: Invalid or unexpected token`

错误地址：`scratch-blocks/scratch_msgs.js` `Blockly.ScratchMsgs.locales["ckb"]`

解决：忽略这个类型的报错

可能缺少阿拉伯语言导致报错，或是爬虫导致的报错

### 2

错误内容：`TypeError: Cannot read property 'length' of undefined`

错误地址：`scratch-vm/src/blocks/scratch3_looks.js` 460 行 `if (util.stackFrame.startedThreads.length === 0)`

解决：增加容错处理

### 3

错误内容：`Failed to execute 'getImageData'`

错误地址：`node_modules/scratch-render/src/SVGSkin.js` getImageData

解决：升级版本后修复，待观察

# change log

2019.11.27 更新 scratch
