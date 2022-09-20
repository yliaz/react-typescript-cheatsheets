---
id: setup
title: 开始在 React 中使用 TypeScript
---

## 前提条件

1. 对 [React](https://reactjs.org) 已经有了很好的理解
2. 熟悉 [TypeScript 类型](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) ([2ality 的教程](http://2ality.com/2018/04/type-notation-typescript.html) 很有帮助。如果你以前从未使用过 TypeScript, 可以看看这个 [chibicode 的教程](https://ts.chibicode.com/todo/)。)
3. 已经阅读了 [React 官方文档中 TypeScript 的部分](https://reactjs.org/docs/static-type-checking.html#typescript).
4. 已经阅读了 [TypeScript Playground 中关于 React 的部分](http://www.typescriptlang.org/play/index.html?jsx=2&esModuleInterop=true&e=181#example/typescript-with-react) (可选：逐一浏览了 [playground](http://www.typescriptlang.org/play/index.html) 中的 40 个例子)

这份指南默认你使用的是最新版本的 TypeScript 和 React。关于老版本的相关提示会放在 `details` （详情）标签中。

## VS Code 扩展插件

- refactoring help（重构助手） https://marketplace.visualstudio.com/items?itemName=paulshen.paul-typescript-toolkit
- R+TS Code Snippets（React + TS 代码提示） (有好几个...)
  - https://marketplace.visualstudio.com/items?itemName=infeng.vscode-react-typescript
  - https://www.digitalocean.com/community/tutorials/the-best-react-extension-for-vs-code
- TypeScript official extension（TypeScript 官方扩展） https://code.visualstudio.com/docs/languages/typescript

## React + TypeScript 入门包

在线的：

- [TypeScript Playground with React](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQNwCwAUKJLHAN5wCuqWAyjMhhYANFx4BRAgSz44AXzhES5Snhi1GjLAA8W8XBAB2qeAGEInQ0KjjtycABsscALxwAFAEpXAPnaM4OANjeABtA0sYUR4Yc0iAXVcxPgEhdwAGT3oGAOTJaXx3L19-BkDAgBMIXE4QLCsAOhhgGCckgAMATQsgh2BcAGssCrgAEjYIqwVmutR27MC5LM0yuEoYTihDD1zAgB4K4AA3H13yvbAfbs5e-qGRiYspuBmsVD2Aekuz-YAjThgMCMcCMpj6gxcbGKLj8MTiVnck3gAGo4ABGTxyU6rcrlMF3OB1H5wT7-QFGbG4z6HE65ZYMOSMIA) 仅当你需要调试类型 (或提交 issue) 时使用, 不适合运行代码
- [CodeSandbox](http://ts.react.new) - 云端的 IDE, 启动超快
- [Stackblitz](https://stackblitz.com/edit/react-typescript-base) - 云端 IDE, 启动超快

本地开发的：

- [Next.js](https://nextjs.org/docs/basic-features/typescript): `npx create-next-app -e with-typescript` 会在当前的文件夹中创建一个项目
- [Create React App](https://facebook.github.io/create-react-app/docs/adding-typescript): `npx create-react-app name-of-app --template typescript` 会创建一个新的文件夹
- [Vite](https://vitejs.dev/): `npm create vite@latest my-react-ts-app -- --template react-ts`
- [Meteor](https://guide.meteor.com/build-tool.html#typescript): `meteor create --typescript name-of-my-new-typescript-app`
- [Ignite](https://github.com/infinitered/ignite#use-ignite-andross-infinite-red-andross-boilerplate) 针对 React Native: `ignite new myapp`
- [TSDX](https://tsdx.io/): `npx tsdx create mylib` 针对创建 React+TS _工具库_. (未来：[TurboRepo](https://twitter.com/jaredpalmer/status/1346217789942591488))

<details>
<summary><b>其他的工具</b></summary>

这些工具不太成熟，但值得一试：

- [Snowpack](<https://www.snowpack.dev/#create-snowpack-app-(csa)>): `npx create-snowpack-app my-app --template app-template-react-typescript`
- [Docusaurus v2](https://v2.docusaurus.io/docs/installation) 附带 [TypeScript 支持](https://v2.docusaurus.io/docs/typescript-support)
- [Parcel](https://v2.parceljs.org/languages/typescript/)
- [JP Morgan's `modular`](https://github.com/jpmorganchase/modular): CRA + TS + Yarn 工作环境工具包. `yarn create modular-react-app <project-name>`

手动设置：

- [Basarat 的教程](https://github.com/basarat/typescript-react/tree/master/01%20bootstrap) 针对 **手动设置** React + TypeScript + Webpack + Babel 的项目
- 值得一提的是，确保你已经安装了 `@types/react` 和 `@types/react-dom` ([如果你对于类型必须的项目了解地不多，可以查看这个链接](https://definitelytyped.org/))
- 也有许多现成的 React + TypeScript 模版, 参见 [我们整理的其他资源列表](https://react-typescript-cheatsheet.netlify.app/docs/basic/recommended/resources/).

</details>

## 视频教程

推荐你看看这个 7 集的 React TypeScript 系列教程，教程中介绍了如何在 React 中使用 TypeScript。

<a href="https://www.youtube.com/watch?v=PL1NUl7fQ2I&list=PLG-Mk4wQm9_LyKE5EwoZz2_GGXR-zJ5Ml">
    <img
        width="200px"
        alt="react typescript course video series"
        src="https://i.imgur.com/IIG0Xu9.jpeg"
    />
</a>
