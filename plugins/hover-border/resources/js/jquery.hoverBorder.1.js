// ==================================================
// blockHover 插件.
//
// @desc jQuery 插件；使用的元素必须原生是块级元素。例如 div 等。设置为块级元素的行内元素无效。
// @author Jesonhu(github)
// @update 2019/02/26
// @inspire http://www.jq22.com/jquery-info15784
// @version v0.1.0
// ==================================================
;(function(win, doc, $) {
  const pluginsName = 'hoverBorder';
  $.fn[pluginsName] = function(options) {
    const _self = $(this),
          _w = _self.innerWidth(),
          _h = _self.innerHeight(),
          _defaultOptions = {
            type: 'num1',
            color: '#ff0000',
            speed: 300
          },
          _options = $.extend({}, _defaultOptions, options),
          becurr = `background: ${_options.color}; position: absolute; border-radius: 0px; opahide;`;

    let _selfTop,
        _selfBottom,
        _selfLeft,
        _selfRight,
        _selfTopBottom,
        _selfLeftRight,
        _setBorderSize,
        _setBorderPos,
        _isHasBorder = false,
        _diff = 0, // 3.5
        _defaultBorderWidth = 4,
        _selfAll;
    
    initData(_self);
    
    console.log('_self', _self);
    
    switch(_options.type) {
      case 'num3':
        theme3();
        break;
    }

    function initData($this) {
      initBorderSet($this);
      initElementStyle($this);
    }

    function initBorderSet(_self) {
      const numBorderWid = parseInt(_self.css('borderWidth'));
      // 有边框
      if (numBorderWid > 0 ) {
        _isHasBorder = true;
        // 小于或等于 4px
        if (numBorderWid <= _defaultBorderWidth) {
          _setBorderSize = _defaultBorderWidth;
          _setBorderPos = numBorderWid;
        } else {
          _setBorderSize = numBorderWid;
          _setBorderPos = numBorderWid;
        }
      } else { // 无边框
        _isHasBorder = false;
        _setBorderSize = _defaultBorderWidth;
        _setBorderPos = 0;
      }
    }

    function initElementStyle($this) {
      $this.css({
        'position': 'relative',
        'boxSizing': 'border-box'
      });
    }

    /**
     * 创建动画需要的全部元素. 
     */
    function Than(_self) {
      const obj = {};
      obj.id = Number(new Date().getTime()) + Math.random() * 10;
      /**
       * 将元素当前的动画停止并设置为可见. 
       */
      obj.thsn = function() {
        _selfTop = _self.find('.divTop').stop().show();
        _selfRight = _self.find('.divRight').stop().show();
        _selfBottom = _self.find('.divBottom').stop().show();
        _selfLeft = _self.find('.divLeft').stop().show();
        _selfTopBottom = _self.find('.divTop, .divBottom').stop().show();
        _selfLeftRight = _self.find('.divLeft, .divRight').stop().show();
        _selfAll = _self.find('.divTop, .divBottom, .divLeft, .divRight').stop().show();
      }
      return obj;
    }
    /**
     * Theme3
     * 
     * @desc
     * top:    left -> right
     * right:  up -> down
     * bottom: right -> left
     * left:   down -> up
     *  
     */
    function theme3() {
      let bPos;
      let divTop;
      let divBottom;
      let divLeft;
      let divRight;

      bPos = _setBorderPos;
      // element has border
      if (_isHasBorder) {
        divTop = `<div style="${becurr} left:-${bPos}px; top: -${bPos}px; height: ${_setBorderSize}px;" class="divTop">`;
        divBottom = `<div style="${becurr} right:-${bPos}px; bottom: -${bPos}px; height: ${_setBorderSize}px;" class="divBottom">`;
        divLeft = `<div style="${becurr} left: -${bPos}px; bottom:-${bPos}px; width: ${_setBorderSize}px;" class="divLeft">`;
        divRight = `<div style="${becurr} right: -${bPos}px; top:-${bPos}px; width: ${_setBorderSize}px;" class="divRight">`;
      } else {
        divTop = `<div style="${becurr} left:-${bPos}px; top: 0px; height: ${_setBorderSize}px;" class="divTop">`;
        divBottom = `<div style="${becurr} right:-${bPos}px; bottom: 0px; height: ${_setBorderSize}px;" class="divBottom">`;
        divLeft = `<div style="${becurr} left: 0px; bottom:-${bPos}px; width: ${_setBorderSize}px;" class="divLeft">`;
        divRight = `<div style="${becurr} right: 0px; top:-${bPos}px; width: ${_setBorderSize}px;" class="divRight">`;
      }
      
      // Notice: hover 的拆分
      // @see http://www.runoob.com/jquery/event-hover.html
      _self.on('mouseenter', function() {
        const el = $(this);
        const than = new Than(el);
        el.append(divTop, divBottom, divLeft, divRight);
        than.thsn();
        _selfTopBottom.animate({
          width: _w + _diff
        }, options.speed);
        _selfLeftRight.animate({
          height: _h + _diff
        }, options.speed);
      });
      _self.on('mouseleave', function() {
        _selfTopBottom.animate({
          width: 0
        }, options.speed);
        _selfLeftRight.animate({
          height: 0
        }, options.speed, function() {
          _selfAll.remove();
        });
      });
    }
  }
})(window, document, jQuery);