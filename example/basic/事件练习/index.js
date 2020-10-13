var EventUtil = {
  addHandler: function (oElement, sEvent, fnHandler) {
    oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : oElement.attachEvent('on' + sEvent, fnHandler)
  },
  removeHandler: function (oElement, sEvent, fnHandler) {
    oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent('on' + sEvent, fnHandler)
  },
  addLoadHandler: function (fnHandler) {
    this.addHandler(window, 'load', fnHandler)
  }
}

EventUtil.addLoadHandler(function () {
  var aBtn = document.getElementsByTagName('input')

  // 为第一个按钮添加绑定事件
  EventUtil.addHandler(aBtn[1], 'click', function () {
    EventUtil.addHandler(aBtn[0], 'click', fnHandler)
    aBtn[0].value = '按钮可以点击了'
  })

  // 解除第一个按钮的绑定事件
  EventUtil.addHandler(aBtn[2], 'click', function () {
    EventUtil.removeHandler(aBtn[0], 'click', fnHandler)
    aBtn[0].value = '暂时不可点击的按钮'
  })

  // 事件处理函数
  function fnHandler() {
    alert('事件绑定成功！')
  }
})