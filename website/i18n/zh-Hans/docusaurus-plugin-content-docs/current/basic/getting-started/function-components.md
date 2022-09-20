---
id: function_components
title: 函数组件
---

声明一个函数组件可以使用一个普通的箭头函数，它接收一个 props 变量作为参数，并返回一个 JSX 元素。

```tsx
// 定义 props 的类型，你可以在“为组件的 Props 设定类型” 中查看更多相关的例子。
type AppProps = {
  message: string;
}; /* 如果也需要导出这个类型的话，请使用 “interface”。 */

// 声明一个函数组件最简单的方式；返回值的类型是推断出来的。
const App = ({ message }: AppProps) => <div>{message}</div>;

// 你可以选择指定返回值的类型，这样的话如果你不小心返回了其他类型，程序就会报错。
const App = ({ message }: AppProps): JSX.Element => <div>{message}</div>;

// 你也可以直接以内联的方式给出 props 的类型，这样省去了给类型起名字的麻烦，但是看起来会有些重复
const App = ({ message }: { message: string }) => <div>{message}</div>;
```

> 提示：你可以使用[Paul Shen 开发的 VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=paulshen.paul-typescript-toolkit) 来实现类型解构声明的自动化 (包括一个[键盘快捷键](https://twitter.com/_paulshen/status/1392915279466745857?s=20)).

<details>

<summary><b>为什么不鼓励 <code>React.FC</code> 这种写法？为什么不使用 <code>React.FunctionComponent</code> 或 <code>React.VoidFunctionComponent</code> 呢？</b></summary>

你也许在很多 React+TypeScript 代码仓库中见到过如下的代码：

```tsx
const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
```

然而，如今大家的共识是[不太推荐](https://github.com/facebook/create-react-app/pull/8177)使用 `React.FunctionComponent` (或是它的简写 `React.FC` )。当然这是一个无足轻重的意见，不过如果你认可这种共识，你可以使用[jscodeshift 的 codemod](https://github.com/gndelia/codemod-replace-react-fc-typescript) 来移除代码仓库里所有的 `React.FC` 。

使用 React.FC 与使用 “普通函数” 的一些不同点：

- `React.FunctionComponent` 对于返回值的类型是明确的，而普通函数是自动推导的的（除非额外注明）。

- 对于 `displayName`、`propTypes` 和 `defaultProps` 这些静态属性，它提供了类型检查和自动补全。

- 值得一提的是在同时使用 `defaultProps` 和 `React.FunctionComponent` 时，存在一些已知的问题。点击这里可以查看[问题的详情](https://github.com/typescript-cheatsheets/react/issues/87)。我们也为 `defaultProps` 提供了单独的一个章节，供你查看。

- 在 [React 18 类型更新](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210)之前, `React.FunctionComponent` 中对于 `children` 提供了一个隐含的定义（参见下文），这一点广受争议并且也是 [`React.FC` 被从 Create React App TypeScript template 中移除](https://github.com/facebook/create-react-app/pull/8177) 的原因之一。

```tsx
// 在 React 18 类型更新之前
const Title: React.FunctionComponent<{ title: string }> = ({
  children,
  title,
}) => <div title={title}>{children}</div>;
```

<details>
<summary>（已废弃的写法）<b>使用 <code>React.VoidFunctionComponent</code> 或 <code>React.VFC</code> </b></summary>

在 [@types/react 16.9.48](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/46643) 中，增加了 `React.VoidFunctionComponent` 和 `React.VFC` 用来提供输入 `children` 时的补全。
然而，请注意 `React.VFC` 和 `React.VoidFunctionComponent` [在 React 18 中已被废弃](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/59882)，因此这个临时的解决方案在 React 18 或更新版本中已不再需要，也不推荐使用。

请使用普通的函数组件或是 `React.FC` 。

```ts
type Props = { foo: string };

// 现在可以这么写，但是未来可能会报错
const FunctionComponent: React.FunctionComponent<Props> = ({
  foo,
  children,
}: Props) => {
  return (
    <div>
      {foo} {children}
    </div>
  ); // OK
};

// 现在就会报错，未来会彻底废弃
const VoidFunctionComponent: React.VoidFunctionComponent<Props> = ({
  foo,
  children,
}) => {
  return (
    <div>
      {foo}
      {children}
    </div>
  );
};
```

</details>

- _在未来_， props 可能会自动被标记为 `只读` 的，不过如果 props 对象在参数列表中被解构，这就没什么意义了。

在大多数情况下，使用不同的语法并没有很大的区别，但是你可能更喜欢使用 `React.FunctionComponent` ，因为它具有更明确的类型定义。

</details>

<details>
<summary><b>小陷阱</b></summary>

下面的写法是错误的：

**条件渲染**

```tsx
const MyConditionalComponent = ({ shouldRender = false }) =>
  shouldRender ? <div /> : false; // don't do this in JS either
const el = <MyConditionalComponent />; // throws an error
```

原因在于由于编译器的限制，函数组件只能返回 JSX 表达式或 `null`，否则会出现一个难以令人理解的报错，报错内容是其他类型不能分配给 `Element`。

**Array.fill**

```tsx
const MyArrayComponent = () => Array(5).fill(<div />);
const el2 = <MyArrayComponent />; // throws an error
```

不幸的是，仅仅通过注解函数类型是没有用的，如果你真的需要返回 React 支持的其他类型，你需要显式地指明：

```tsx
const MyArrayComponent = () => Array(5).fill(<div />) as any as JSX.Element;
```

[参见 @ferdaber 的评论](https://github.com/typescript-cheatsheets/react/issues/57).

</details>
