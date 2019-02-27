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
    this.init(el, options);
  }
  Plugin.prototype = {
    constructor: Plugin,
    init(el, options) {
      this.initData(el, options);
    },
    
    initData(el, options) {
      this.initOptions(options);
      this.initPosData(el);
      this.initView(el);
      this.initEvent();
    },
    initOptions(options) {
      this._defaultOptions = {
        from: 'top',
        speed: 250,
        percent: 0.4,
      }
      this._options = $.extend({}, this._defaultOptions, options);
    },
    initPosData(el) {
      this._$el = $(el);
      this._$hoverWrap = this._$el.find('.hover-wrap');
      const from = this._options.from;
      let n;
      switch (from) {
        case 'top':
          this.pos1 = 'top';
          this.pos2 = 'left';
          this.size1 = 'height';
          this.size2 = 'width';
          this.movePos = 'top';
          n = this.moveSize = parseFloat(this._$el.height()) * this._options.percent
          this.movePosValue = 'translate(0, -'+ n +'px)';
          break;
        case 'bottom':
          this.pos1 = 'bottom';
          this.pos2 = 'left';
          this.size1 = 'height';
          this.size2 = 'width';
          this.movePos = 'bottom';
          n = this.moveSize = parseFloat(this._$el.height()) * this._options.percent
          this.movePosValue = 'translate(0, '+ n +'px)';
          break;
        case 'left':
          this.pos1 = 'left';
          this.pos2 = 'top';
          this.size1 = 'width';
          this.size2 = 'height';
          this.movePos = 'left';
          n = this.moveSize = parseFloat(this._$el.width()) * this._options.percent
          this.movePosValue = 'translate(-'+ n +'px, 0)';
          break;
        case 'right':
          this.pos1 = 'right';
          this.pos2 = 'top';
          this.size1 = 'width';
          this.size2 = 'height';
          this.movePos = 'right';
          n = this.moveSize = parseFloat(this._$el.width()) * this._options.percent
          this.movePosValue = 'translate('+ n +'px, 0)';
          break;
      }
    },
    initEvent() {
      this.evnetHandle();
    },
    initView(el) {
      /** 文字容器所在的比例 */
      const n = this.moveSize;
      const pos1 = this.pos1;
      const pos2 = this.pos2;
      const size1 = this.size1;
      const size2 = this.size2;
      const movePosValue = this.movePosValue;
      this._$el.css({
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer'
      });
      this._$hoverWrap.css({
        position: 'absolute',
        zIndex: 999999,
        [pos1]: '-' + n + 'px',
        [pos2]: 0,
        [size1]: n + 'px',
        [size2]: '100%'
      });

      // this._$hoverWrap.css({
      //   position: 'absolute',
      //   zIndex: 999999,
      //   [pos1]: 0,
      //   [pos2]: 0,
      //   [size1]: n + 'px',
      //   [size2]: '100%',
      //   'transform': movePosValue
      // })
    },
    get options() {
      return this._options;
    },
    evnetHandle() {
      const $el = this._$el;
      const $hoverWrap = this._$hoverWrap;
      const movePos = this.movePos;
      const movePosValue = this.movePosValue;
      const speed = this._options.speed;
      const n = this.moveSize;

      
      $el.on('mouseenter', function() {
        // Notice: want use transform but frustrating. jquery does't support animate with transform
        // @see https://blog.csdn.net/zjsfdx/article/details/80813535
        // $hoverWrap.stop().animate({
        //   'transform': 'translate(0, 0)'
        // }, speed);

        $hoverWrap.stop().animate({
          [movePos]: 0,
        }, speed);
      });
      $el.on('mouseleave', function() {
        // $hoverWrap.stop().animate({
        //   transform: movePosValue
        // }, speed);

        $hoverWrap.stop().animate({
          [movePos]: '-'+ n + 'px',
        }, speed);
      });
    }
  }

  // jQuery 作为插件方式使用
  $.fn[pluginName] = function(options) {
    const $this = $(this);
    return $this.each((index, item) => {
      const $item = $(item);
      const plugin = new Plugin($item, options);
      // console.log(plugin);
    });
  }

})(window, document, jQuery);