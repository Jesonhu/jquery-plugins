## 使用方式
+ step1: 引入 jQuery and jquery.hoverWrap.js
+ step2: 调用
```html
<div class="wrap wrap1">
  <img class="block" src="./resources/img/test.jpg" alt="">
  <div class="hover-wrap">
    默认从顶部出现1
  </div>
</div>

<div class="wrap wrap2">
  <img class="block" src="./resources/img/test.jpg" alt="">
  <div class="hover-wrap">
    默认从顶部出现2
  </div>
</div>

<div class="wrap wrap3">
  <img class="block" src="./resources/img/test.jpg" alt="">
  <div class="hover-wrap">
      从底部出现
  </div>
</div>

<div class="wrap wrap4">
  <img class="block" src="./resources/img/test.jpg" alt="">
  <div class="hover-wrap">
      从左侧出现
  </div>
</div>

<div class="wrap wrap5">
  <img class="block" src="./resources/img/test.jpg" alt="">
  <div class="hover-wrap">
    从右侧出现
  </div>
</div>

<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
<script src="./resources/js/jquery.hoverWrap.js"></script>
<script>
  $(function() {
    const hoverWrap1 = $('.wrap1, .wrap2').hoverWrap();

    $('.wrap3').hoverWrap({
      from: 'bottom'
    });

    $('.wrap4').hoverWrap({
      from: 'left'
    });

    $('.wrap5').hoverWrap({
      from: 'right'
    });
  });
</script>
```

## 参数说明
|属性|类型|说明|默认值|可选值|
|--|--|--|:--:|:--:|
|`from`|String|可选，动画元素开始出现的边界|'top'| 'top'、'bottom'、'left'、'right' |
| `speed` | Number | 可选，动画持续的时间| 250ms | - |
| `percent` | Number | 可选，动画元素占插件选择器元素的百分比| 0.4 | - |

## 属性说明
|属性|类型|说明|默认值|可选值|
|--|--|--|:--:|:--:|
|`movePos`| String | 动画元素开始出现的位置，与出现的方向保持一致。从上边出现值为 `top`, 从下边出现值为 `bottom`, 从左边出现值为 `left`, 从右边出现值为 `right`| - | - |
|`movePosValue`|String| 未使用，使用 `transform` 方式时的值。| - | - |
| `moveSize` | Number | 动画元素移动的距离，通过 `宽或高 * 百分比` 获得 | - | - |
| `options` | Object object | `get` 时返回 `_options` 的值 | - | - |
| `pos1` | String|需要发生变化(动画过渡)的 `css属性`，与出现的方向保持一致，例如：从 `top` 出现时，值为 `top`| - | - |
| `pos2` | String| 设置位置时需要用的 `css属性`, 与出现的方向有关。例如：从 `top` 出现时，值可为 `left` 或 `right`，这里选择了 `left` ( 由于使用了定位，当从 `top` 方向出现时，可以通过设置 `left` 或 `right` 让动画元素出现的位置符合预期 ) | - | - |
| `size1` | String | 动画元素撑起来的 `css属性`，与 `size2` 属性相反。 当从 `top`、`bottom` 方向出现时值为 `height`; 从 `left`、`right` 出现时，值为 `width` | - | - |
| `size2` | String | 需要 `100%` 的 `css 属性`，当从 `top`、`bottom`方向出现时值为 `width`; 从 `left`、`right` 出现时，值为 `height`| - | - |
| `_$el` | jQuery object |使用插件时选择器指定的元素. | - | - |
| `_$hoverWrap`| jQuery object | 需要进行动画的元素. | - | - |
| `_defaultOptions`| Object object | 默认的配置属性 | `{from: "top", speed: 250, percent: 0.4}` | - |
| `_options` | Object object | 插件使用的配置属性 | - | - | 

## Tips: 
+ 必须给 `添加插件效果的元素` 添加一个子元素。且必须包含类名 `hover-wrap`.
+ `添加插件效果的元素` 的 `css属性` 会被设置为 `position: relative; overflow: hidden; cursor: pointer;`
+ `动画效果元素` 会被添加一个层级 `z-index` 值为 `999999`
