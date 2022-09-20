---
id: basic_type_example
title: 为组件的 Props 设定类型
---

本篇的目的是为想要熟悉 TypeScript 的 React 开发者提供一个基本的方向和参考。

## 基本 Prop 类型的例子

下面这个列表包含了在 React+TypeScript 应用中常见的一些 TypeScript 类型

```tsx
type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** 某个类型的数组！ */
  names: string[];
  /** 指定精确的字符串值，用一个联合类型将各个值连接起来 */
  status: "waiting" | "success";
  /** 任意对象，只要你不打算使用它的属性（不太常用，但是很适合先占位） */
  obj: object;
  /** 几乎等同于 `object`, 和 `Object`一模一样 */
  obj2: {};
  /** 一个对象，属性有多少写多少 (比起上面两个，更推荐用这个) */
  obj3: {
    id: string;
    title: string;
  };
  /** 对象数组！（也很常见） */
  objArr: {
    id: string;
    title: string;
  }[];
  /** 一个字典对象，每个属性必须都是同一种类型  */
  dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; // 与 dict1 等同
  /** 任意函数，只要你不打算调用它（不太推荐这么写） */
  onSomething: Function;
  /** 无参数、无返回值的函数（非常常见） */
  onClick: () => void;
  /** 具有指定参数的函数（非常常见） */
  onChange: (id: number) => void;
  /** 参数为一个事件的函数（非常常见） */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** 跟上面的一样，但是是另一种语法（非常常见） */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** 一个可选的 prop（非常非常超级无敌常见！） */
  optional?: OptionalType;
};
```

你可以看到，我们在上述的每个 prop 的注释中都使用了 TSDoc 中的 `/** comment */` 这种写法。我们非常鼓励你在可重用的组件上留下描述性的评论。关于更全面的例子和讨论，参见进阶指南中 [为组件添加注释](https://react-typescript-cheatsheet.netlify.app/docs/advanced/misc_concerns/#commenting-components) 的部分。

## 一些有用的 React Prop 的类型

当某个组件的 props 中包含另外一个 React 组件时，下面的例子非常有用。

```tsx
export declare interface AppProps {
  children?: React.ReactNode; // 最好的写法，包含了所有 React 可以渲染的东西
  childrenElement: JSX.Element; // 一个单一的 React 元素
  style?: React.CSSProperties; // 当你需要传递 style（样式）时
  onChange?: React.FormEventHandler<HTMLInputElement>; // 表单事件！其中的范型是 event.target 的类型
  // 更多相关信息参见：https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  props: Props & React.ComponentPropsWithoutRef<"button">; // 转发一个按钮元素的所有 props，但不转发它的 ref
  props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; // 转发一个 MyButtonForwardedRef 类型所有的 props，同时转发它的 ref
}
```

<details>
<summary><b>一个很小的 <code>React.ReactNode</code> 的边缘案例，仅出现于18版本之前</b></summary>

在 [React 18 类型更新](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210) 之前，下面的代码可以通过类型检查，但是运行时会报错：

```tsx
type Props = {
  children?: React.ReactNode;
};

function Comp({ children }: Props) {
  return <div>{children}</div>;
}
function App() {
  // React 18 前: 运行时报错 "Objects are not valid as a React child"（对象不能作为 React 的子节点）
  // React 18 后: 类型检查报错 "Type '{}' is not assignable to type 'ReactNode'"（不能将 ’{}‘ 类型赋给 ReactNode 类型）
  return <Comp>{{}}</Comp>;
}
```

原因是在 React 18 之前，`ReactNode` 类型包括 `ReactFragment` 类型，从而包括 `{}` 类型。

[感谢 @pomle 指明这一点](https://github.com/typescript-cheatsheets/react/issues/357)

</details>

<details>
 <summary><b>JSX.Element 和 React.ReactNode 有什么区别？</b></summary>

引用一下 [@ferdaber](https://github.com/typescript-cheatsheets/react/issues/57) 的话：一个更技术性的解释是，一个有效的 React 节点与 `React.createElement` 返回的东西是不一样的。无论一个组件最终的渲染结果是什么，`React.createElement` 总是返回一个对象，也就是 `JSX.Element` 接口，但 `React.ReactNode` 是一个组件所有可能的返回值的集合。

- `JSX.Element` -> `React.createElement` 的返回值
- `React.ReactNode` -> 返回一个组件能返回的任意值

</details>

[更多的讨论：ReactNode 与 JSX.Element 不同的地方](https://github.com/typescript-cheatsheets/react/issues/129)

[有什么要补充的吗？欢迎提一个 issue](https://github.com/typescript-cheatsheets/react/issues/new).

## Types 还是 Interfaces？

在为 Props 和 State 指定类型时，既可以使用 Types，也可以使用 Interfaces，这自然也就引出了一个问题 —— 到底该用哪一个呢？

### 简单来说

优先使用 Interface，实在没招了再使用 Type - [orta](https://twitter.com/orta/status/1356129195835973632?s=20).

### 更多建议

这里有一些大家普遍支持的规则：

- 在编写库和第三方环境的类型定义，并涉及到 API 的定义时一定要使用 `interface`，因为这将允许库的使用者可以通过 _声明合并_ 的方式来扩展类型的定义，以补充缺失的类型。

- 对于 React 组件的 Props 和 State，可以考虑使用 `type`，这样可以保证一致性，也更具有约束性。

关于这个建议的原因，参见 [TypeScript 2.7 中 Interface 和 Type alias 的对比](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c).

TypeScript 手册现在也包含了关于[Type Aliases 和 Interfaces 的区别](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)的内容。

> 注意：如果你有性能上的要求，请优先考虑使用 interface([详见微软官方关于这件事的说明](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections)) 但也需要 [慎重考虑这个问题](https://news.ycombinator.com/item?id=25201887)

Types 的联合类型很好用（例如：`type MyType = TypeA | TypeB`），而 Interfaces 很擅长定义字典类型，并对其进行 `实现` 和 `扩展`。

### Types 和 Interfaces 区别表

这是一个十分微妙的话题，不必过于纠结。下面有一个方便查询的表格：

| Aspect                           | Type | Interface |
| -------------------------------- | :--: | :-------: |
| 可以描述函数                     |  ✅  |    ✅     |
| 可以描述 constructors （构造器） |  ✅  |    ✅     |
| 可以描述元组                     |  ✅  |    ✅     |
| 接口可以进行扩展它               |  ⚠️  |    ✅     |
| Class 可以扩展它                 |  🚫  |    ✅     |
| Class 可以实现它 (`implements`)  |  ⚠️  |    ✅     |
| 可以和同类求交集                 |  ✅  |    ⚠️     |
| 可以和同类组成联合类型           |  ✅  |    🚫     |
| 可以用来创建映射类型             |  ✅  |    🚫     |
| 可以用映射类型映射过来           |  ✅  |    ✅     |
| 在错误信息和日志中展开           |  ✅  |    🚫     |
| 可以被增强                       |  🚫  |    ✅     |
| 可以递归                         |  ⚠️  |    ✅     |

⚠️ 在某些情况下

(来源：[Karol Majewski](https://twitter.com/karoljmajewski/status/1082413696075382785))

[有什么要补充的吗？欢迎提一个 issue](https://github.com/typescript-cheatsheets/react/issues/new)。
