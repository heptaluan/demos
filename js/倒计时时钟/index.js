window.onload = function () {

  var oCountDown = document.getElementById('countdown');
  var aInput = oCountDown.getElementsByTagName('input')[0];
  var timer = null;

  aInput.onclick = function () {
    // className 为空以后就开始计时，否则就停止
    this.className == '' ? (timer = setInterval(updateTime, 1000), updateTime()) : (clearInterval(timer));
    // 点击切换图片
    this.className = this.className == '' ? 'cancel' : '';
  }

  // 数字补零
  function format(a) {
    return a.toString().replace(/^(\d)$/, '0$1')
  }

  function updateTime() {
    var aSpan = oCountDown.getElementsByTagName('span');
    // 去掉分钟前面的 0 然后 *60 转换成秒数
    // 在加上秒数去掉前面的 0 就是总秒数
    var oRemain = aSpan[0].innerHTML.replace(/^0/, '') * 60 + parseInt(aSpan[1].innerHTML.replace(/^0/, ''));
    // 如果到 0 了就停止
    if (oRemain <= 0) {
      clearInterval(timer);
      return
    }

    // 总秒数--，然后转换成分钟赋给 span
    oRemain--;
    aSpan[0].innerHTML = format(parseInt(oRemain / 60));
    oRemain %= 60;
    aSpan[1].innerHTML = format(parseInt(oRemain));
  }
}