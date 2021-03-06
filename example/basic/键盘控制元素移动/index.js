window.onload = function () {

  var oBox = document.getElementById('box')
  var bLeft = bTop = bRight = bBottom = bCtrlKey = false

  setInterval(function () {

    if (bLeft) {
      oBox.style.left = oBox.offsetLeft - 10 + 'px'
    } else if (bRight) {
      oBox.style.left = oBox.offsetLeft + 10 + 'px'
    }

    if (bTop) {
      oBox.style.top = oBox.offsetTop - 10 + 'px'
    } else if (bBottom) {
      oBox.style.top = oBox.offsetTop + 10 + 'px'
    }

    // 防止溢出
    limit()

  }, 30)

  document.onkeydown = function (event) {

    var event = event || window.event
    bCtrlKey = event.ctrlKey

    switch (event.keyCode) {
      case 37:
        bLeft = true
        break
      case 38:
        if (bCtrlKey) {
          var oldWidth = oBox.offsetWidth
          var oldHeight = oBox.offsetHeight

          oBox.style.width = oBox.offsetWidth * 1.5 + 'px'
          oBox.style.height = oBox.offsetHeight * 1.5 + 'px'

          oBox.style.left = oBox.offsetLeft - (oBox.offsetWidth - oldWidth) / 2 + 'px'
          oBox.style.top = oBox.offsetTop - (oBox.offsetHeight - oldHeight) / 2 + 'px'

          break
        }
        bTop = true
        break
      case 39:
        bRight = true
        break
      case 40:
        if (bCtrlKey) {
          var oldWidth = oBox.offsetWidth
          var oldHeight = oBox.offsetHeight

          oBox.style.width = oBox.offsetWidth * 0.75 + 'px'
          oBox.style.height = oBox.offsetHeight * 0.75 + 'px'

          oBox.style.left = oBox.offsetLeft - (oBox.offsetWidth - oldWidth) / 2 + 'px'
          oBox.style.top = oBox.offsetTop - (oBox.offsetHeight - oldHeight) / 2 + 'px'

          break
        }
        bBottom = true
        break
      case 49:
        bCtrlKey && (oBox.style.background = 'green')
        break
      case 50:
        bCtrlKey && (oBox.style.background = 'yellow')
        break
      case 51:
        bCtrlKey && (oBox.style.background = 'blue')
        break
    }

    return false
  }

  document.onkeyup = function (event) {
    switch ((event || window.event).keyCode) {
      case 37:
        bLeft = false
        break
      case 38:
        bTop = false
        break
      case 39:
        bRight = false
        break
      case 40:
        bBottom = false
        break
    }
  }

  // 防止溢出
  function limit() {
    var doc = [document.documentElement.clientWidth, document.documentElement.clientHeight]
    oBox.offsetLeft <= 0 && (oBox.style.left = 0)
    oBox.offsetTop <= 0 && (oBox.style.top = 0)
    doc[0] - oBox.offsetLeft - oBox.offsetWidth <= 0 && (oBox.style.left = doc[0] - oBox.offsetWidth + 'px')
    doc[1] - oBox.offsetTop - oBox.offsetHeight <= 0 && (oBox.style.top = doc[1] - oBox.offsetHeight + 'px')
  }
}