(function () {
  var bar = document.getElementById('bar');
  var sub = document.getElementById('sub');
  var div = sub.getElementsByTagName('div');

  sub.style.width = w_width() - 80 + 'px';
  div[0].style.right = 914 + w_width() / 2 - 1102 + 'px';
  div[1].style.right = 184 + w_width() / 2 - 1096 + 'px';

  act(sub, 'width', 0, function () {
    act(sub, 'width', w_width() - 80, function () {
      bar.style.display = 'block';
      bar.style.right = w_width() - 105 + 'px';
    });
  });

  drag(bar, sub);

  var startX = 0;
  function drag(obj, sub) {
    obj.onmousedown = function (e) {
      e = e || event;
      startX = e.clientX - obj.offsetLeft;

      document.onmousemove = function (e) {
        e = e || event;
        var x = e.clientX - startX;
        x = w_width() - x;

        obj.style.right = x - 25 + 'px';
        sub.style.width = x + 'px';
      }
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      }
      return false;
    }
  }

  function css(obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    } else {
      return getComputedStyle(obj, null)[attr];
    }
  }

  function act(obj, attr, target, fn) {
    obj.timer && clearInterval(obj.timer);

    obj.timer = setInterval(function () {
      var cur = parseInt(css(obj, attr));
      var speed = (target - cur) / 8;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      var stop = true;

      if (cur != target) {
        stop = false
        obj.style[attr] = cur + speed + 'px';
      }
      if (stop) {
        clearInterval(obj.timer);
        obj.timer = null;
        fn && fn();
      }

    }, 30);
  }

  function w_width() {
    return document.documentElement.clientWidth || document.body.clientWidth;
  }

  function w_height() {
    return document.documentElement.clientHeight || document.body.clientHeight;
  }

}());