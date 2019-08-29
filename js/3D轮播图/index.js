window.onload = function () {

  var out = document.getElementsByClassName('out')[0];
  var btn = document.getElementsByClassName('btn')[0];
  var str = '';

  for (var i = 0; i < 4; i++) {
    str += "<ul class='box' style='left:0;top:" + i * 87 + "px'><li> </li><li> </li><li style='background-position:0 " + (-i * 87) + "px'></li><li></li><li></li><li style='background-position:0 " + (-i * 87) + "px'></li></ul>"
  }

  out.innerHTML = str;

  var boxs = document.getElementsByClassName('box');
  var angle = 0;

  btn.onclick = function () {
    angle += 180;
    if (angle > 180) {
      angle = 0;
    }
    for (var i = 0; i < boxs.length; i++) {
      setCss3(boxs[i], { transform: 'rotateY(' + angle + 'deg)' })
      setCss3(boxs[i], { transition: 'all 2s ease ' + Math.random() * 1.5 + 's' })
    }
  }
}

// 设置 CSS3 属性
function setCss3(obj, attrObj) {
  for (var i in attrObj) {
    var newi = i;
    if (newi.indexOf('-') > 0) {
      var num = newi.indexOf('-');
      newi = newi.replace(newi.substr(num, 2), newi.substr(num + 1, 1).toUpperCase());
    }
    obj.style[newi] = attrObj[i];
    newi = newi.replace(newi.charAt(0), newi.charAt(0).toUpperCase());
    obj.style['webkit' + newi] = attrObj[i];
    obj.style['moz' + newi] = attrObj[i];
    obj.style['o' + newi] = attrObj[i];
    obj.style['ms' + newi] = attrObj[i];
  }
}