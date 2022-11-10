---
sidebar_position: 2
description: JavaScript Design Patterns – Explained with Examples
title: JavaScript 设计模式
---

## 什么是设计模式

设计模式这个概念是由一本名为《设计模式：可复用面向对象软件的基础》的书推广而来，这本书在 1994 年由四个 C++工程师编写的。

这本书探讨了面向对象的编程的能力和陷阱，并介绍了 23 种可以用来解决编程问题的模式。

这些模式并不是算法或者具体的实现。它们更像是想法、观点和抽象，辅助你去解决一些特定问题。

根据要素的不同模式的实现也各不相同，重要的是模式背后的概念，它可以帮助我们更好地解决问题。

话虽如此，但是请记住，这些模式建立在 C++的 OOP 的基础之上，当使用更现代的编程语言如 JavaScript 时，模式可能不等效，甚至给代码添加了不必要的样本。

不过把这些模式当作一般的编程知识来了解没有坏处。

旁注：如果你不熟悉编程范式或者 OOP，推荐你阅读我最近写的这两篇文章。😉

设计模式的简介就到这里。设计模式可以被分为三大类：创建、结构、行为范例。让我们逐个了解。🧐

## 创建范例 (Creational Design Patterns)

创建范例包括不同的创建对象的机制。

### 单例模式 (Singleton Pattern)

单例模式确保对象的类只有一个不可更改实例。简言之，单例模式包含一个不能被复制和修改的对象。当你希望应用遵循“真理的单点性”的观点时，这个模式就能发挥作用。

比方说，我们想在一个单一对象中包含应用程序的所有配置，而且禁止对该对象进行任何复制或修改。

可以通过对象字面量和类这两种方法来实现：

```js title="使用对象的字面量"
const Config = {
  start: () => console.log('App has started'),
  update: () => console.log('App has updated'),
}

// 通过冻结对象来限制增加新的属性或者修改已有属性
Object.freeze(Config)

Config.start() // "App has started"
Config.update() // "App has updated"

Config.name = 'Robert' // 尝试添加一个新的键
console.log(Config) // 添加失败： { start: [Function: start], update: [Function: update] }
```

```js title="使用类"
class Config {
  constructor() {}
  start() {
    console.log('App has started')
  }
  update() {
    console.log('App has updated')
  }
}

const instance = new Config()
Object.freeze(instance)
```

### 工厂方法 (Factory Method Pattern)

工厂方法提供创建对象的接口，对象被创建后可以修改。这样做的好处是，创建对象的逻辑集中在一个地方，这样简化了代码，使得代码更易组织。

这种模式被大量应用。可以通过类和工厂函数（返回对象的函数）来实现：

```js title="使用类"
class Alien {
  constructor(name, phrase) {
    this.name = name
    this.phrase = phrase
    this.species = 'alien'
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!')
  sayPhrase = () => console.log(this.phrase)
}

const alien1 = new Alien('Ali', "I'm Ali the alien!")
console.log(alien1.name) // 输出："Ali"
```

```js title="使用工厂函数"
function Alien(name, phrase) {
  this.name = name
  this.phrase = phrase
  this.species = 'alien'
}

Alien.prototype.fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!')
Alien.prototype.sayPhrase = () => console.log(this.phrase)

const alien1 = new Alien('Ali', "I'm Ali the alien!")

console.log(alien1.name) // 输出 "Ali"
console.log(alien1.phrase) // 输出 "I'm Ali the alien!"
alien1.fly() // 输出 "Zzzzzziiiiiinnnnnggggg"
```

### 抽象工厂 (Abstract Factory Pattern)

抽象工厂允许在不指定具体类的情况下生成一系列相关的对象。当你想要创建仅共享某些属性和方法的对象时，抽象工厂模式就可以派上用场。

它的工作方式是给客户端提供一个可以交互的抽象工厂。抽象工厂通过特定逻辑调用具体工厂，具体工厂返回最终的对象。

这样做给工厂模式添加了一个抽象层，我们通过仅和单个工厂函数或者类交互来创建各种不同类型的对象。

让我们来看几个例子。假设我们是汽车公司，我们除了生产小汽车以外，还生产摩托车和卡车。

```js title=""
// 每个汽车种类有一个类或者“具体工厂”
class Car {
  constructor() {
    this.name = 'Car'
    this.wheels = 4
  }
  turnOn = () => console.log('Chacabúm!!')
}

class Truck {
  constructor() {
    this.name = 'Truck'
    this.wheels = 8
  }
  turnOn = () => console.log('RRRRRRRRUUUUUUUUUMMMMMMMMMM!!')
}

class Motorcycle {
  constructor() {
    this.name = 'Motorcycle'
    this.wheels = 2
  }
  turnOn = () => console.log('sssssssssssssssssssssssssssssshhhhhhhhhhham!!')
}

// 抽象工厂作为单一交互点和客户端交互
// 接受特定汽车类型作为参数，调用对应类型的具体工厂
const vehicleFactory = {
  createVehicle: function (type) {
    switch (type) {
      case 'car':
        return new Car()
      case 'truck':
        return new Truck()
      case 'motorcycle':
        return new Motorcycle()
      default:
        return null
    }
  },
}

const car = vehicleFactory.createVehicle('car') // Car { turnOn: [Function: turnOn], name: 'Car', wheels: 4 }
const truck = vehicleFactory.createVehicle('truck') // Truck { turnOn: [Function: turnOn], name: 'Truck', wheels: 8 }
const motorcycle = vehicleFactory.createVehicle('motorcycle') // Motorcycle { turnOn: [Function: turnOn], name: 'Motorcycle', wheels: 2 }
```

### 构造器 (Builder Pattern)

构造器模式分“步骤”创建对象。通常我们通过不同的函数和方法向对象添加属性和方法。

构造器的好处在于通过不同实体分开创建属性和方法。

通过类或者构造函数创建的实例通常继承了所有的属性和方法，但是如果使用构造器，我们可以只应用我们需要的“步骤”来创建对象，这样就更灵活。

这个概念和对象组合相关， 我在[这篇文章](https://www.freecodecamp.org/news/object-oriented-javascript-for-beginners/#object-composition)讨论过这个话题。

```js
// 声明一个对象
const bug1 = {
  name: 'Buggy McFly',
  phrase: "Your debugger doesn't work with me!",
}

const bug2 = {
  name: 'Martiniano Buggland',
  phrase: "Can't touch this! Na na na na...",
}

// 这些函数将对象作为参数，并为对象添加方法
const addFlyingAbility = (obj) => {
  obj.fly = () => console.log(`Now ${obj.name} can fly!`)
}

const addSpeechAbility = (obj) => {
  obj.saySmthg = () =>
    console.log(`${obj.name} walks the walk and talks the talk!`)
}

// 最后传入对象作为参数，调用构造器函数
addFlyingAbility(bug1)
bug1.fly() // 输出: "Now Buggy McFly can fly!"

addSpeechAbility(bug2)
bug2.saySmthg() // 输出: "Martiniano Buggland walks the walk and talks the talk!"
```

### 原型 (Prototype Pattern)

原型允许把一个对象作为蓝图创建另一个对象，新对象继承原对象的属性和方法。

如果你已经使用过一段时间的 JavaScript，你应该对[原型继承](https://www.freecodecamp.org/news/prototypes-and-inheritance-in-javascript/)有一定了解。

原型链继承的结果和使用类相似，只是更为灵活，因为属性和方法可以不通过同一个类在对象之间共享。

```js
// 声明一个有两个方法的原型对象
const enemy = {
  attack: () => console.log('Pim Pam Pum!'),
  flyAway: () => console.log('Flyyyy like an eagle!'),
}

// 声明另外一个对象，这个对象将继承原型
const bug1 = {
  name: 'Buggy McFly',
  phrase: "Your debugger doesn't work with me!",
}

// 使用setPrototypeOf设置对象的原型
Object.setPrototypeOf(bug1, enemy)

// 使用getPrototypeOf来确认我们是否设置成功
console.log(Object.getPrototypeOf(bug1)) // { attack: [Function: attack], flyAway: [Function: flyAway] }

console.log(bug1.phrase) // Your debugger doesn't work with me!
console.log(bug1.attack()) // Pim Pam Pum!
console.log(bug1.flyAway()) // Flyyyy like an eagle!
```

## 结构范例 (Structural Design Patterns)

结构范例将对象和类组合成更大的结构。

### 适配器 (Adapter Pattern)

适配器允许两个接口不兼容的对象相互交互。

假设你的应用程序调用一个 API 并会返回一个 XML，然后将结果发送给另一个 API 来处理信息，但是处理信息的 API 期待的是 JSON 格式。因为格式不兼容，所以你不能直接发送信息，需要先适配结果。😉

我们可以举一个更简单的例子来具象化这个概念。假设我们有一个以城市为元素的数组，以及一个可以返回拥有最多人口城市的函数。数组中的城市人口以百万为单位计数，但是有一个新城市的人口单位不是百万：

```js
// 城市数组
const citiesHabitantsInMillions = [
  { city: 'London', habitants: 8.9 },
  { city: 'Rome', habitants: 2.8 },
  { city: 'New york', habitants: 8.8 },
  { city: 'Paris', habitants: 2.1 },
]

// 待添加的新城市
const BuenosAires = {
  city: 'Buenos Aires',
  habitants: 3100000,
}

// 适配器函数将城市的人口属性转换成统一的计数单位
const toMillionsAdapter = (city) => {
  city.habitants = parseFloat((city.habitants / 1000000).toFixed(1))
}

toMillionsAdapter(BuenosAires)

// 将新城市添加到数组
citiesHabitantsInMillions.push(BuenosAires)

// 函数返回人口最多的城市
const MostHabitantsInMillions = () => {
  return Math.max(...citiesHabitantsInMillions.map((city) => city.habitants))
}

console.log(MostHabitantsInMillions()) // 8.9
```

### 装饰 (Decorator Pattern)

装饰通过增加一个修饰对象来包裹原来的对象，从而给原来的对象添加新的行为。如果你熟悉 React 或者高阶组件（HOC），你内心的小铃铛可能会叮当一下。

从技术上讲，React 中的组件是函数而不是对象。但如果你仔细思索 React 上下文（React Context）或者 Memo 是怎么运作的，你会发现我们将组件作为子组件传入 HOC 后，子组件可以访问某些功能。

在下面的例子里中 ContextProvider 组件接受子组件作为 prop：

```js
import { useState } from 'react'
import Context from './Context'

const ContextProvider: React.FC = ({ children }) => {
  const [darkModeOn, setDarkModeOn] = useState(true)
  const [englishLanguage, setEnglishLanguage] = useState(true)

  return (
    <Context.Provider
      value={{
        darkModeOn,
        setDarkModeOn,
        englishLanguage,
        setEnglishLanguage,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
```

```js title="然后我们包裹整个应用："
export default function App() {
  return (
    <ContextProvider>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<></>}>
            <Header />
          </Suspense>

          <Routes>
            <Route
              path='/'
              element={
                <Suspense fallback={<></>}>
                  <AboutPage />
                </Suspense>
              }
            />

            <Route
              path='/projects'
              element={
                <Suspense fallback={<></>}>
                  <ProjectsPage />
                </Suspense>
              }
            />

            <Route
              path='/projects/helpr'
              element={
                <Suspense fallback={<></>}>
                  <HelprProject />
                </Suspense>
              }
            />

            <Route
              path='/projects/myWebsite'
              element={
                <Suspense fallback={<></>}>
                  <MyWebsiteProject />
                </Suspense>
              }
            />

            <Route
              path='/projects/mixr'
              element={
                <Suspense fallback={<></>}>
                  <MixrProject />
                </Suspense>
              }
            />

            <Route
              path='/projects/shortr'
              element={
                <Suspense fallback={<></>}>
                  <ShortrProject />
                </Suspense>
              }
            />

            <Route
              path='/curriculum'
              element={
                <Suspense fallback={<></>}>
                  <CurriculumPage />
                </Suspense>
              }
            />

            <Route
              path='/blog'
              element={
                <Suspense fallback={<></>}>
                  <BlogPage />
                </Suspense>
              }
            />

            <Route
              path='/contact'
              element={
                <Suspense fallback={<></>}>
                  <ContactPage />
                </Suspense>
              }
            />
          </Routes>
        </ErrorBoundary>
      </Router>
    </ContextProvider>
  )
}
```

接着，我们使用 useContext 钩子，使得应用内所有组件都可以获得定义在 Context 的状态（state）：

```js
const AboutPage: React.FC = () => {

    const { darkModeOn, englishLanguage } = useContext(Context)

    return (...)
}

export default AboutPage
```

这个例子可能不是书的作者在写这个模式时想到的确切实现，但我相信想法是一样的：把一个对象放在另一个对象中，这样它就可以访问某些功能。;)

### 外观模式 (Facade Pattern)

外观模式给库、框架以及其他复杂的类集提供简化的接口。

嗯……我们可以举的例子非常多，不是吗？React 本身以及各种各样的软件开发相关的库就是基于这个模式。特别是当你思考[声明式编程](https://www.freecodecamp.org/news/an-introduction-to-programming-paradigms/#declarative-programming)，会发现这个范式就是使用抽象的方法对开发者隐藏复杂性。

JavaScript 中的 map、sort、reduce 和 filter 函数都是很好的例子，这些函数的背后其实是我们的老朋友 for 循环。

另一个例子是一些 UI 库，如：MUI。正如以下示例所展现的这样，库提供了组件，组件带来了内置特性和功能，帮助我们更快、更轻松地构建代码。

这些代码最后都会编译成简单的 HTML 元素，这是浏览器唯一能理解的东西。组件只是采用了抽象的办法，使得我们的编码过程更容易。

一个外观模式......

```js
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align='right'>Calories</TableCell>
            <TableCell align='right'>Fat&nbsp;(g)</TableCell>
            <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
            <TableCell align='right'>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component='th'
                scope='row'
              >
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.fat}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
```

### 代理 (Proxy Pattern)

代理模式为另一个对象提供替代或者占位符。这个想法是控制对原始对象的访问，当请求到达实际的原始对象之前或者之后再执行某种操作。

如果你熟悉 ExpressJS 的话，这个概念就不陌生。Express 是用于开发 NodeJS API 的框架，其中一个功能就是中间件的使用。中间件是我们可以在请求到达终点之前、之中和之后执行的一段代码。

让我们看一个例子。是一个验证身份令牌的函数，不用太关注验证是如何实现的，但是要注意函数接受令牌作为参数，一旦验证完毕就会调用 next()函数。

```js
const jwt = require('jsonwebtoken')

module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token === null)
    return res.status(401).send(JSON.stringify('No access token provided'))

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send(JSON.stringify('Wrong token provided'))
    req.user = user
    next()
  })
}
```

这个函数就是一个中间件，我们可以 API 中的任意终点使用这个中间件。只需要将其添加在终点地址之后，终点的函数声明之前：

```js
router.get('/:jobRecordId', authenticateToken, async (req, res) => {
  try {
    const job = await JobRecord.findOne({ _id: req.params.jobRecordId })
    res.status(200).send(job)
  } catch (err) {
    res.status(500).json(err)
  }
})
```

如果没有提供令牌或者提供了错误的令牌，中间件就会返回相应的错误响应。如果提供了有效令牌，中间件将调用 next()函数，然后将执行终点函数。

我们可以在终点内部编写相同的代码来验证令牌，这样就用不着中间件了，但使用了抽象的方法，我们可以在不同的终点复用中间件。😉

同样这个例子可能不是作者的确切想法，但我相信这是一个有效的例子。我们控制对象的访问，以便我们可以在特定时刻执行操作。

## 行为范式 (Behavioral Design Patterns)

行为范式控制不同对象之间的通讯。

### 责任链 (Chain of Responsibility Pattern)

责任链将请求通过处理链传递，链条上的每一个处理程序决定要么处理请求，要么将请求传递给链条上的下一个处理程序。

我们可以使用之前示例来演示这个模式，因为 Express 的中间件就是一种处理程序，要么处理请求，要么将其传递给下一个处理程序。

如果你想要另一个示例，可以考虑任何需要通过步骤来一步一步实现信息处理的系统。在每个步骤中，不同的实体负责执行操作，并且只有在满足特定条件时，信息才会传递给另一个实体。

需要使用 API 的前端应用程序就是很好的例子：

- 有一个负责渲染 UI 的函数
- 一旦渲染，另一个函数向 API 终点发出请求
- 如果终点响应符合预期，则将信息传递给另一个函数，该函数以给定方式对数据进行排序并存储在变量中
- 一旦变量存储了所需的信息，另一个函数负责在 UI 中呈现它。

可以看到这里有许多不同的实体协作执行任务。每个都负责该任务的一个“步骤”，这有助于代码模块化和关注点分离。👌👌

### 迭代器 (Iterator Pattern)

迭代器用于遍历集合的元素。这在现代编程语言中显得微不足道，但并非如此。

JavaScript 内置函数（for、forEach、for...of、for...in、map、reduce、filter 等）就是手边可以拿来遍历数据结构的方法。

遍历算法以及更为复杂的树和图这样的数据结构使用的代码也是迭代器的例子。

### 观察者 (Observer Pattern)

观察者模式允许你定义一个订阅机制来通知多个对象它们正在观察的对象发生的任何事件。基本上，这就像在给定对象上有一个事件侦听器，当该对象执行我们正在侦听的操作时，我们会采取一些行动。

React 的 useEffect 钩子就是一个很好的例子。useEffect 在我们声明的那一刻执行给定的函数。

钩子分为两个主要部分：可执行函数和依赖数组。如果数组为空，如下例所示，每次渲染组件时都会执行该函数。

```js title="如果在依赖数组中声明任何变量，则该函数将仅在这些变量发生变化时执行"
useEffect(() => {
  console.log('The component has rendered')
}, [])
```

```js
useEffect(() => {
  console.log('var1 has changed')
}, [var1])
```

也可以将 JavaScript 的事件监听器视为观察者模式。另外，响应式编程和库如 RxJS，用来处理异步信息和事件的方法也是这个模式。

总结
如果你想了解更多相关信息，推荐观看这个视频或访问[这个网站: refactoring](https://refactoring.guru/)，你可以找到每个模式的配图详细介绍。

希望你享受阅读这篇文章，并有所收获。我们下篇文章见！✌️

## 转载出处

:::info 原文出处
[JavaScript 设计模式 - freecodecamp](https://chinese.freecodecamp.org/news/javascript-design-patterns-explained/)
:::
