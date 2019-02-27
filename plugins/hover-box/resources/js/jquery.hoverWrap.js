// ==================================================
// hoverWrap 插件.
//
// @desc 鼠标放上去，说明文字从边界处显示.
// @author Jesonhu(github)
// @update 2019/02/27
// @version v0.1.0
// ==================================================
;(function(win, doc, $) {
  const pluginName = 'hoverWrap';
  const Plugin = function(el, options) {

  }
  Plugin.prototype = {
    constructor: Plugin,
    init() {

    },
    initData() {

    },
    initEvent() {

    }
  }

  // jQuery 作为插件方式使用
  $.fn[pluginName] = function(options) {
    const $this = $(this);
    return $this.each((index, item) => {
      const $item = $(item);
      new Plugin($item, options);
    });
  }

})(window, document, jQuery);