## 使用方式
+ step1: 引入 jQuery and jquery.hoverBorder.js
+ step2: 调用
```
<!-- element -->
<div class="wrap wrap1 hover-border">
  <img class="block" src="./resources/img/test.jpg" alt="">
</div>
<div class="wrap wrap2 hover-border">
</div>

<div class="wrap wrap3">
  <img class="block" src="./resources/img/test.jpg" alt="">
</div>

<!-- script -->
$('.hover-border').hoverBorder({
  type: 'num3',
  color: 'green'
});
$('.wrap3').hoverBorder({
  type: 'num3'
});
```

## 参数说明
|属性|类型|说明|默认值|可选值|
|--|--|--|:--:|:--:|
|type| String | 可选，边框出现的风格，目前只支持 `num3` | 'num3' | 'num1 ... numn ' |
| color | String | 可选，边框的颜色 | #ff0000 | - |
| speed | Number | 可选，边框动画持续时间 | 300 | - |


[example](../index.html)



## 边框属性设置说明
+ 有边框

|情景|_setBorderSize|_setBorderPos|
|--|:--:|--|
|边框宽度小于或等于 `4px`| _defaultBorderWidth = 4px |- 当前边框的宽度|
|边框宽度大于 `4px`|当前边框的宽度|- 当前边框的宽度|

+ 无边框

|情景|_setBorderSize|_setBorderPos|
|--|:--:|--|
|无边框| _defaultBorderWidth = 4px |0|




