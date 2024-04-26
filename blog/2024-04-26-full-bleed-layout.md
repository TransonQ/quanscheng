---
title: full-bleed 布局
authors: [qsc]
tags: [css,grid]
---

## full-bleed图例

![full-bleed](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404262238250.png)

## 代码

```html
<main class="wrapper">
  <h1>Some Heading</h1>
  <p>Some content and stuff</p>

  <div class="full-bleed">
    <img src="https://picsum.photos/1200/300"/>
  </div>

  <p>Some content and stuff</p>
</main>
```

```css
.wrapper {
  display: grid;
  /** 定义 grid 为三列 */
  grid-template-columns:
    1fr
    min(65ch, calc(100% - 64px))
    1fr;
  height: 100%;
}
.wrapper > * {
  /** 每个子元素都放在第二列的格子中;
      第一列和第三列的格子是空的;
      这样就达到了整体居中的效果.
  */
  grid-column: 2;
}

.full-bleed {
  width: 100%;
  /** 从第1 到第3 列，不包含第四列，因为这个写法是按照索引的，左闭右开 */
  grid-column: 1 / 4;
  
  display:grid;
  place-items:center;
}
.full-bleed > img{
  width:100%;
  max-width:900px;
  min-width:500px;
}
```

![效果图](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404262243244.png)

> 文章来源：[Full-Bleed Layout Using CSS Grid](https://www.joshwcomeau.com/css/full-bleed/)
