(function () {

  var dog = {
    $: function (id) {
      return document.querySelector(id);
    },
    on: function (el, type, handler) {
      el.addEventListener(type, handler, false);
    },
    off: function (el, type, handler) {
      el.removeEventListener(type, handler, false);
    }
  }

  function Slider() {
    var args = arguments[0];
    for (var i in args) {
      this[i] = args[i];
    }
    this.init();
  }

  Slider.prototype = {
    init: function () {
      this.getDom();
      this.dragBar(this.handler);
    },

    getDom: function () {
      this.slider = dog.$('#' + this.id);
      this.handler = dog.$('.handler');
      this.bg = dog.$('.drag_bg');
    },

    dragBar: function (handler) {

      var that = this,
        startX = 0,
        lastX = 0,
        doc = document,
        width = this.slider.offsetWidth,
        max = width - handler.offsetWidth,

        drag = {
          down: function (e) {
            that.slider.classList.add('unselect');
            startX = e.clientX - handler.offsetLeft;
            dog.on(doc, 'mousemove', drag.move);
            dog.on(doc, 'mouseup', drag.up);
            return false;
          },

          move: function (e) {
            lastX = e.clientX - startX;
            lastX = Math.max(0, Math.min(max, lastX));
            if (lastX >= max) {
              handler.classList.add('handler_ok_bg');
              that.slider.classList.add('slide_ok');
              dog.off(handler, 'mousedown', drag.down);
              drag.up();
            }
            that.bg.style.width = lastX + 'px';
            handler.style.left = lastX + 'px';
          },

          up: function () {
            that.slider.classList.remove('unselect');
            if (lastX < width) {
              that.bg.style.width = 0;
              handler.style.left = 0;
            }
            dog.off(doc, 'mousemove', drag.move);
            dog.off(doc, 'mouseup', drag.up);
          }
        }

      dog.on(handler, 'mousedown', drag.down);
    }
  }

  var defaults = {
    id: 'slider'
  }

  new Slider(defaults);

}());