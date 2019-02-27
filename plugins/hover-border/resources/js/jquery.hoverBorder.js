// ==================================================
// hoverBorder 插件.
//
// @desc jQuery 插件；使用的元素必须原生是块级元素。例如 div 等。设置为块级元素的行内元素无效。
// @author Jesonhu(github)
// @update 2019/02/27
// @inspire http://www.jq22.com/jquery-info15784
// @version v0.1.0
// ==================================================

;(function(win, doc, jQuery) {
  const pluginName = 'hoverBorder';
  const Plugin = function(el, options) {
    this.init(el, options);
  }
  Plugin.prototype = {
    construtor: Plugin,
    init(el, options) {
      const self = this;
      this.initData(el, options)
        .then(res => {
          self.initEvent();
        }).catch(err => {
          console.log(err);
        });
    },
    initData(el, options) {
      const self = this;
      return new Promise((resolve, reject) => {
        self.defaultOptions = {
          type: 'num1',
          color: '#ff0000',
          speed: 300
        }
        self.options = $.extend({}, self.defaultOptions, options);
        self._$el = $(el);

        const _$el = self._$el;
        const _options = self.options;
        self._w = 0;
        self._h = 0;
        self._becurr = `background: ${_options.color}; position: absolute; border-radius: 0px; opahide;`;

        self._$bTop = null;
        self._$bBottom = null;
        self._$bLeft = null;
        self._$bRight = null;
        self._$bTopBottom = null;
        self._$bLeftRight = null;
        self._$bAll = null;

        self._setBorderSize = 0;
        self._setBorderPos = 0;
        self._isHasBorder = false,
        self._diff = 0, // 3.5
        self._defaultBorderWidth = 4,

        self.initElementStyle();
        self.initBorderSet();

        resolve();

      })
    },
    initBorderSet() {
      const $el = this._$el;
      const numBorderWid = parseInt($el.css('borderWidth'));
      // 有边框
      if (numBorderWid > 0 ) {
        this._isHasBorder = true;
        // 小于或等于 4px
        if (numBorderWid <= this._defaultBorderWidth) {
          this._setBorderSize = this._defaultBorderWidth;
        } else {
          this._setBorderSize = numBorderWid;
        }
        this._setBorderPos = numBorderWid;
      } else { // 无边框
        this._isHasBorder = false;
        this._setBorderSize = this._defaultBorderWidth;
        this._setBorderPos = 0;
      }
    },
    initElementStyle() {
      const $el = this._$el;
      $el.css({
        position: 'relative',
        boxSizing: 'border-box',
        cursor: 'pointer'
      });
    },
    initEvent() {
      const type = this.options['type'];
      const self = this;
      switch (type) {
        case 'num3':
          self.theme3();
      }
    },
    theme3() {
      const self = this;
      const _diff = self._diff;
      const options = self.options;
      const $el = self._$el;
      const becurr = self._becurr;
      let bPos;
      let bSize;

      bPos = self._setBorderPos;
      bSize = self._setBorderSize;
      // element has border
      if (this._isHasBorder) {
        this.divTop = `<div style="${becurr} left:-${bPos}px; top: -${bPos}px; height: ${bSize}px;" class="divTop">`;
        this.divBottom = `<div style="${becurr} right:-${bPos}px; bottom: -${bPos}px; height: ${bSize}px;" class="divBottom">`;
        this.divLeft = `<div style="${becurr} left: -${bPos}px; bottom:-${bPos}px; width: ${bSize}px;" class="divLeft">`;
        this.divRight = `<div style="${becurr} right: -${bPos}px; top:-${bPos}px; width: ${bSize}px;" class="divRight">`;
      } else {
        this.divTop = `<div style="${becurr} left:-${bPos}px; top: 0px; height: ${bSize}px;" class="divTop">`;
        this.divBottom = `<div style="${becurr} right:-${bPos}px; bottom: 0px; height: ${bSize}px;" class="divBottom">`;
        this.divLeft = `<div style="${becurr} left: 0px; bottom:-${bPos}px; width: ${bSize}px;" class="divLeft">`;
        this.divRight = `<div style="${becurr} right: 0px; top:-${bPos}px; width: ${bSize}px;" class="divRight">`;
      }
      console.log('this', self._$el[0].offsetWidth);

      $el.on('mouseenter', function() {
        const $this = $(this);
        // Query: why cant't use with() or innerWidth()
        const _w = self._w = $el[0].offsetWidth;
        const _h = self._h = $el[0].offsetHeight;

        $el.append(self.divTop, self.divBottom, self.divLeft, self.divRight);

        const than = self.than();
        than.thsn();
        console.log('self', self);
        self._$bTopBottom.animate({
          width: _w + _diff + 'px'
        }, options.speed);
        self._$bLeftRight.animate({
          height: _h + _diff + 'px'
        }, options.speed);
      });

      $el.on('mouseleave', function() {
        self._$bTopBottom.animate({
          width: 0
        }, options.speed);
        self._$bLeftRight.animate({
          height: 0
        }, options.speed, function() {
          self._$bAll.remove();
        });
      });
    },
    /**
     * 创建动画需要的全部元素. 
     */
    than() {
      const obj = {};
      const $el = this._$el;
      const self = this;

      obj.id = Number(new Date().getTime()) + Math.random() * 10;
      /**
       * 将元素当前的动画停止并设置为可见. 
       */
      obj.thsn = function() {
        self._$bTop = $el.find('.divTop').stop().show();
        self._$bRight = $el.find('.divRight').stop().show();
        self._$bBottom = $el.find('.divBottom').stop().show();
        self._$bLeft = $el.find('.divLeft').stop().show();
        self._$bTopBottom = $el.find('.divTop, .divBottom').stop().show();
        self._$bLeftRight = $el.find('.divLeft, .divRight').stop().show();
        self._$bAll = $el.find('.divTop, .divBottom, .divLeft, .divRight').stop().show();
      }
      return obj;
    },
    setBorderData(_self) {
      const numBorderWid = parseInt(_self.css('borderWidth'));

      // 有边框
      if (numBorderWid > 0) {
        this._isHasBorder = true;

        // 边框尺寸小于或等于4px
        if (numBorderWid <= this._defaultBorderWidth) {
          this._setBorderSize = this._defaultBorderWidth;
          this._setBorderPos = numBorderWid;
        } else {  
          this._setBorderSize = numBorderWid;
          this._setBorderPos = numBorderWid;
        }
      } else { 
        this._isHasBorder = false;
        this._setBorderSize = this._defaultBorderWidth;
        this._setBorderPos = 0;
      }
    }
  }

  // jQuery 插件方式使用
  $.fn[pluginName] = function(options) {
    const $this = $(this);
    return $this.each((index, item) => {
      const $item = $(item);
      new Plugin($item, options);
    });
  }
})(window, document, jQuery);