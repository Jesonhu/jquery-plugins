// ==================================================
// hoverBorder 插件.
//
// @desc jQuery 插件；使用的元素必须原生是块级元素。例如 div 等。设置为块级元素的行内元素无效。
// @author Jesonhu(github)
// @update 2019/02/26
// @inspire http://www.jq22.com/jquery-info15784
// @version v0.1.0
// ==================================================

;(function(win, doc, jQuery) {
  const pluginsName = 'hoverBorder';
  const Plugins = function(el, options) {
    this.initData(el, options);
  }
  Plugins.prototype = {
    construtor: Plugins,
    plugin: function() {
      const self = this;
      return this._$el.each((index, item) => {
        const type = self.options['type'];
        const _$item = $(item);
        switch (type) {
          case 'num3':
            self.theme3(_$item);
            break;
        }
      });
    },
    initData(el, options) {
      this.defaultOptions = {
        type: 'num1',
        color: '#ff0000',
        speed: 300
      }
      this.options = $.extend({}, this.defaultOptions, options);
      this._self = $(el);
      this._$el = $(el);

      const _self = this._self;
      const _options = this.options;
      this._w = _self.innerWidth();
      this._h = _self.innerWidth();
      this._becurr = `background: ${_options.color}; position: absolute; border-radius: 0px; opahide;`;

      this._selfTop = null;
      this._selfBottom = null;
      this._selfLeft = null;
      this._selfRight = null;
      this._selfTopBottom = null;
      this._selfLeftRight = null;
      this._setBorderSize = 0;
      this._setBorderPos = 0;
      this._isHasBorder = false,
      this._diff = 0, // 3.5
      this._defaultBorderWidth = 4,
      this._selfAll;

      this.initBorderSet();
      this.initElementStyle();
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
          this._setBorderPos = numBorderWid;
        } else {
          this._setBorderSize = numBorderWid;
          this._setBorderPos = numBorderWid;
        }
      } else { // 无边框
        _isHasBorder = false;
        _setBorderSize = _defaultBorderWidth;
        _setBorderPos = 0;
      }
    },
    initElementStyle() {
      const $el = this._$el;
      $el.css({
        'position': 'relative',
        'boxSizing': 'border-box'
      });
    },
    theme3(_self) {
      console.log('_self', _self);
      _self.on('mouse');
    },
    than() {

    }
  }

  $.fn[pluginsName] = function(options) {
    const plugins = new Plugins(this, options);
    return plugins.plugin();
  }
})(window, document, jQuery);