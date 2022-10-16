---
sidebar_position: 2
title: 一行代码实现CSS布局
description: 一行代码实现CSS布局
---

## 01. 超级居中- grid 中的 `place-items: center`

```html
<div class="parent blue">
  <div
    class="box coral"
    contenteditable
  >
    :)
  </div>
</div>
```

```css
.ex1 .parent {
  display: grid;
  place-items: center;
}
```

## 02. 煎饼结构式子 `flex:0 1 <baseWidth>`

- flex 简写代表：flex: `<flex-grow>`  `<flex-shrink>`  `<flex-basis>`

```html
<div class="parent white">
  <div class="box green">1</div>
  <div class="box green">2</div>
  <div class="box green">3</div>
</div>
```

```css
.ex2 .parent {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.ex2 .box {
  flex: 1 1 150px; /*  拉伸: 撑满 */
  flex: 0 1 150px; /*  不拉伸, 三列居中 */
  margin: 5px;
}
```

## 03. 侧边栏布局 `gird-template-columns:minmax(<min>,<max>)`

- 简单说明
  此演示对网格布局利用了 minmax 函数。我们在这里做的是将最小侧边栏大小设置为 150px ，但在更大的屏幕上，让它伸展出 25% 。侧边栏将始终占据其父级水平空间的 25%，直到 25% 变得小于 150px 。

```html
<div class="parent">
  <div
    class="section yellow"
    contenteditable
  >
    Min: 150px / Max: 25%
  </div>
  <div
    class="section purple"
    contenteditable
  >
    This element takes the second grid position (1fr), meaning it takes up the
    rest of the remaining space.
  </div>
</div>
```

```css
.ex3 .parent {
  display: grid;
  grid-template-columns: minmax(150px, 25%) 1fr;
}
```

## 04. 煎饼堆栈布局`grid-template-rows:auto 1fr auto`

```html
<div class="parent">
  <header
    class="blue section"
    contenteditable
  >
    Header
  </header>
  <main
    class="coral section"
    contenteditable
  >
    Main
  </main>
  <footer
    class="purple section"
    contenteditable
  >
    Footer Content
  </footer>
</div>
```

```css
.ex4 .parent {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
```

## 05. 圣杯布局`grid-template:auto 1fr auto / auto 1fr auto`

- 说明
  属性和值对为：grid-template: auto 1fr auto / auto 1fr auto 。第一个和第二个以空格分隔的列表之间的斜线是行和列之间的分隔符。

```html
<div class="parent">
  <header class="pink section">Header</header>
  <div
    class="left-side blue section"
    contenteditable
  >
    Left Sidebar
  </div>
  <main
    class="section coral"
    contenteditable
  >
    Main Content
  </main>
  <div
    class="right-side yellow section"
    contenteditable
  >
    Right Sidebar
  </div>
  <footer class="green section">Footer</footer>
</div>
```

```css
.ex5 .parent {
  display: grid;
  grid-template: auto 1fr auto / auto 1fr auto;
}

.ex5 header {
  padding: 2rem;
  grid-column: 1 / 4;
}

.ex5 .left-side {
  grid-column: 1 / 2;
}

.ex5 main {
  grid-column: 2 / 3;
}

.ex5 .right-side {
  grid-column: 3 / 4;
}

.ex5 footer {
  grid-column: 1 / 4;
}
```

## 06. \***\*12 跨网格 `grid-template-columns: repeat(12, 1fr)`**

- 说明
  接下来我们有另一个经典布局：12 跨网格。您可以使用 repeat() 函数在 CSS 中快速编写网格。对网格模板列使用 repeat(12, 1fr); 将为每个 1fr 提供 12 列。
  使用 span 关键字。使用 span ，您可以设置起始线，然后设置从该起点跨越的列数。在这种情况下，grid-column: 1 / span 12 将等效于 grid-column: 1 / 13 ，而 grid-column: 2 / span 6 将等效于 grid-column: 2 / 8 。

```html
<div class="parent white">
  <div class="span-12 green section">Span 12</div>
  <div class="span-6 coral section">Span 6</div>
  <div class="span-4 blue section">Span 4</div>
  <div class="span-2 yellow section">Span 2</div>
</div>
```

```css
.ex6 .parent {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

.ex6 .span-12 {
  grid-column: 1 / span 12;
}

.ex6 .span-6 {
  grid-column: 1 / span 6;
}

.ex6 .span-4 {
  grid-column: 4 / span 4;
}

.ex6 .span-2 {
  grid-column: 3 / span 2;
}

/* centering text */
.ex6 .section {
  display: grid;
  place-items: center;
  text-align: center;
}
```

## 07. \***\*RAM `(Repeat, Auto, MinMax): grid-template-columns(auto-fit, minmax(<base>, 1fr))`**

```html
<div class="parent white">
  <div class="box pink">1</div>
  <div class="box purple">2</div>
  <div class="box blue">3</div>
  <div class="box green">4</div>
</div>
```

```css
.ex7 .parent {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
```

## 08. 排列布局 \***\*`justify-content: space-between`\*\***

```html
<div class="parent white">
  <div class="card yellow">
    <h3>Title - Card 1</h3>
    <p contenteditable>Medium length description with a few more words here.</p>
    <div class="visual pink"></div>
  </div>
  <div class="card yellow">
    <h3>Title - Card 2</h3>
    <p contenteditable>
      Long Description. Lorem ipsum dolor sit, amet consectetur adipisicing
      elit.
    </p>
    <div class="visual blue"></div>
  </div>
  <div class="card yellow">
    <h3>Title - Card 3</h3>
    <p contenteditable>Short Description.</p>
    <div class="visual green"></div>
  </div>
</div>
```

```css
.ex8 .parent {
  height: auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}

.ex8 .visual {
  height: 100px;
  width: 100%;
}

.ex8 .card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-between;
}

.ex8 h3 {
  margin: 0;
}
```

## 09. **Clamping My Style `clamp(<min>, <actual>, <max>)`**

```html
<div class="parent white">
  <div class="card purple">
    <h1>Title Here</h1>
    <div class="visual yellow"></div>
    <p>
      Descriptive Text. Lorem ipsum dolor sit, amet consectetur adipisicing
      elit. Sed est error repellat veritatis.
    </p>
  </div>
</div>
```

```css
.ex9 .parent {
  display: grid;
  place-items: center;
}

.ex9 .card {
  width: clamp(23ch, 50%, 46ch);
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.ex9 .visual {
  height: 125px;
  width: 100%;
}
```

## 10. \***\*保持宽高比 `aspect-ratio: <width> / <height>`**

```html
<div class="parent white">
  <div class="card blue">
    <h1>Video Title</h1>
    <div class="visual green"></div>
    <p>Descriptive text for aspect ratio card demo.</p>
  </div>
</div>
```

```css
.ex10 .parent {
  display: grid;
  place-items: center;
}

.ex10 .visual {
  aspect-ratio: 16 / 9;
}

.ex10 .card {
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
```

:::info 原网址

https://1linelayouts.glitch.me/

:::
