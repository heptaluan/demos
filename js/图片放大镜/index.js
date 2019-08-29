(function () {

  // 获取元素
  var div = document.getElementById('div');
  var small = getByCls(div, 'small_pic')[0];
  var big = getByCls(div, 'big_pic')[0];
  var img = big.getElementsByTagName('img')[0];
  var layer = small.getElementsByTagName('span')[1];

  // 添加移入事件
  small.onmousemove = function (e) {

    e = e || event;
    this.style.cursor = 'move';
    layer.style.display = big.style.display = 'block';

    // 设置移动框的位置
    var t = e.clientY - div.offsetTop - layer.clientHeight / 2;
    var l = e.clientX - div.offsetLeft - layer.clientWidth / 2;

    // 让其只在 div 内运动
    if (t < 0) {
      t = 0;
    } else if (t > div.clientHeight - layer.clientHeight) {
      t = div.clientHeight - layer.clientHeight;
    }
    if (l < 0) {
      l = 0;
    } else if (l > div.clientWidth - layer.clientWidth) {
      l = div.clientWidth - layer.clientWidth;
    }

    // 获取大图相对比例
    var scaleX = l / (div.clientHeight - layer.clientHeight);
    var scaleY = t / (div.clientWidth - layer.clientWidth);

    layer.style.top = t + 'px';
    layer.style.left = l + 'px';

    img.style.left = -scaleX * (img.clientWidth - big.clientWidth) + 'px';
    img.style.top = -scaleY * (img.clientHeight - big.clientHeight) + 'px';
  }

  // 添加移出
  small.onmouseout = function () {
    layer.style.display = big.style.display = 'none';
  }

  // 获取 Class
  function getByCls(obj, cls) {
    if (obj.getElementsByClassName) {
      return obj.getElementsByClassName(cls);
    } else {
      var res = [],
        reg = new RegExp('^|\\s+' + cls + '\\s+|$'),
        all = obj.all;
      for (var i = 0; i < all.length; i++) {
        if (reg.test(all[i].className)) {
          res.push(all[i]);
        }
      }
      return res;
    }
  }

}());