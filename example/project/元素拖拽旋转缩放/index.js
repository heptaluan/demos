
var magicBox, parentBox, rotateHandler, resizeHandlers;

// 测试用，事件绑定建议使用委托形式
const test = document.querySelectorAll('.test')
for (let i = 0; i < test.length; i++) {
  test[i].addEventListener('mousedown', function () {

    let { left, top, width, height } = this.style

    let opts = {
      left: Number.parseInt(left),
      top: Number.parseInt(top),
      width: Number.parseInt(width),
      height: Number.parseInt(height),
      rotate: Number.parseInt(/\(([^()]+)\)/g.exec(this.style.transform)[1]),
      scale: 1
    }

    initSelectElement(this, opts);
  })
}

// 点击其他位置隐藏拖拽框
document.querySelector('.wrap-box').addEventListener('mousedown', function (e) {
  if (e.target.classList.contains('wrap-box')) {
    document.querySelector('.magic-box').style.display = 'none'
    e.preventDefault()
  }
})

// 初始化操作
function initSelectElement(target, opts) {

  // 获取元素
  magicBox = document.querySelector('.magic-box');
  parentBox = document.querySelector('.wrap-box')
  dragElement = document.querySelector('.magic-box .draggable');
  rotateHandler = document.querySelector('.magic-box .rotate');
  resizeHandlers = Array.prototype.slice.call(document.querySelectorAll('.magic-box .resizable-handle'), 0);

  const offectDiffValue = {
    top: parentBox.top,
    left: parentBox.left
  }

  // 初始化之后显示拖拽框体
  magicBox.style.display = 'block'

  // 设置盒子初始值
  draw(magicBox, opts);

  // 设置鼠标默认位置
  setCursorStyle(0);

  // 绑定拖拽事件
  bindMoveEvents({
    dragElement: target,
    magicBox: magicBox,
    target: target,
    opts: opts,
    callback: function () {
      console.log(`拖拽停止`)
    }
  });

  // 绑定旋转事件
  bindRotateEvents({
    node: rotateHandler,
    box: magicBox,
    parentBox: parentBox,
    target: target,
    opts: opts,
    callback: function () {
      console.log(`旋转停止`)
    }
  });

  // 绑定缩放事件
  resizeHandlers.map(function (resizeElement) {
    bindResizeEvents({
      node: resizeElement,
      magicBox: magicBox,
      parentBox: parentBox,
      target: target,
      opts: opts,
      offectDiffValue: offectDiffValue,
      callback: function () {
        console.log(`缩放停止`)
      }
    });
  });
}

// 绑定拖拽事件
function bindMoveEvents(options) {
  const { dragElement, magicBox, target, opts, callback } = options
  const originLeft = opts.left
  const originTop = opts.top
  dragElement.onmousedown = function () {
    var event = window.event,
      deltaX = event.pageX / opts.scale - opts.left,
      deltaY = event.pageY / opts.scale - opts.top;
    document.onmousemove = function () {
      var event = window.event
      opts.left = event.pageX / opts.scale - deltaX;
      opts.top = event.pageY / opts.scale - deltaY;

      draw(magicBox, opts);
      draw(target, opts);
    }
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
      if (originLeft !== opts.left || originTop !== opts.top) {
        callback && callback(opts)
      }
    }
  }
  dragElement.ondragstart = function (event) {
    event.preventDefault();
    return false;
  }
}

// 绑定旋转事件
function bindRotateEvents(options) {
  const { node, box, parentBox, target, opts, callback } = options
  node.onmousedown = function () {
    // 旋转开始
    var event = window.event,
      point = getConterPoint(box),
      prevAngle = Math.atan2(event.pageY - parentBox.offsetTop - point.top, event.pageX - parentBox.offsetLeft - point.left) - opts.rotate * Math.PI / 180;

    document.onmousemove = function () {
      // 旋转
      var event = window.event,
        angle = Math.atan2(event.pageY - parentBox.offsetTop - point.top, event.pageX - parentBox.offsetLeft - point.left);
      opts.rotate = Math.floor((angle - prevAngle) * 180 / Math.PI);
      draw(box, opts);
      draw(target, opts);
    }
    document.onmouseup = function () {
      // 旋转结束
      document.onmousemove = null;
      document.onmouseup = null;
      setCursorStyle(opts.rotate);
      callback && callback()
    }
  }
  node.ondragstart = function (event) {
    event.preventDefault();
    return false;
  }
}

// 绑定缩放事件
function bindResizeEvents(options) {
  const { node, magicBox, parentBox, offectDiffValue, target, opts, callback } = options
  let that = this
  let _locked
  node.onmousedown = function () {
    // 缩放开始
    var event = window.event;

    // 不采用坐标进行计算，直接使用 tips
    var tip = (event.target).getAttribute('tips')
    event.preventDefault();

    var { left, top, width, height, rotate } = opts;
    var oPoint = {
      left,
      top,
      rotate,
      width: Number(width),
      height: Number(height)
    }

    // 鼠标初始位置
    var start_x = event.pageX
    var start_y = event.pageY

    var ex = event.pageX - offectDiffValue.left
    var ey = event.pageY - offectDiffValue.top

    // 计算初始状态旋转后的 rect
    var transformedRect = transform({
      left,
      top,
      width,
      height
    }, rotate);

    // 取得旋转后的八点坐标
    var { point } = transformedRect;

    // 对角线点的索引即为缩放基点索引
    var { opposite } = that.getPointAndOpposite(point, tip)
    var baseIndex = opposite.index;
    var oppositeX = opposite.point['left'];
    var oppositeY = opposite.point['top'];
    var offsetWidth = Math.abs(ex - oppositeX);
    var offsetHeight = Math.abs(ey - oppositeY);

    document.onmousemove = function () {
      var event = window.event;

      if (event.shiftKey || event.metaKey) {
        _locked = true
      } else {
        _locked = false
      }

      var end_x = event.pageX;
      var end_y = event.pageY;
      var dx = end_x - start_x;
      var dy = end_y - start_y;
      var _angle = rotate;
      if (_angle) {
        var r = Math.sqrt(dx * dx + dy * dy), theta = Math.atan2(dy, dx) - _angle * Math.PI / 180.0;
        dx = r * Math.cos(theta);
        dy = r * Math.sin(theta);
      }

      var equalScale = 1
      var widthScale = 1
      var heightScale = 1
      var scale = {
        left: 1,
        top: 1
      };

      if (tip == 0) {
        widthScale = (width - dx) / width;
        heightScale = (height - dy) / height;
      } else if (tip == 2) {
        widthScale = (width + dx) / width;
        heightScale = (height - dy) / height;
      } else if (tip == 4) {
        widthScale = (width + dx) / width;
        heightScale = (height + dy) / height;
      } else if (tip == 6) {
        widthScale = (width - dx) / width;
        heightScale = (height + dy) / height;
      }

      if ([1, 7].indexOf(baseIndex) >= 0) {
        widthScale = (width + dx) / width;
        heightScale = (height + dy) / height;
      }

      if ([3, 5].indexOf(baseIndex) >= 0) {
        widthScale = (width - dx) / width;
        heightScale = (height - dy) / height;
      }

      if (offsetWidth > offsetHeight) {
        equalScale = widthScale;
      } else {
        equalScale = heightScale;
      }

      widthScale = widthScale < 0.15 ? 0.15 : widthScale
      heightScale = heightScale < 0.15 ? 0.15 : heightScale
      equalScale = equalScale < 0.15 ? 0.15 : equalScale

      if ([0, 2, 4, 6].indexOf(baseIndex) >= 0) {
        if (_locked) {
          scale.left = scale.top = equalScale;
        } else {
          scale.left = widthScale;
          scale.top = heightScale;
        }
      } else if ([1, 5].indexOf(baseIndex) >= 0) {
        if (_locked) {
          scale.left = scale.top = equalScale;
        } else {
          scale.top = heightScale;
        }
      } else if ([3, 7].indexOf(baseIndex) >= 0) {
        if (_locked) {
          scale.left = scale.top = equalScale;
        } else {
          scale.left = widthScale;
        }
      }

      var newRect = getNewRect(oPoint, scale, transformedRect, baseIndex);
      opts.left = newRect.left;
      opts.top = newRect.top;
      opts.width = newRect.width;
      opts.height = newRect.height;
      draw(magicBox, opts);
      draw(target, opts);
    }
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
      callback && callback()
    }
  }
}

// 重绘视图
function draw(el, ops) {
  css(el, {
    left: ops.left + 'px',
    top: ops.top + 'px',
    width: ops.width + 'px',
    height: ops.height + 'px',
    transform: 'rotate(' + ops.rotate + 'deg)'
  });
}

// 获取 css 属性
function css(node, ops) {
  for (var index in ops) {
    node['style'][index] = ops[index];
  }
}

// 设置鼠标样式
function setCursorStyle(angle) {
  var cursorsArr = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']
  var domListIndex = cursorsArr.slice()

  // 以 45 度为基准，依次将数组顺序往后移动
  var steps = Math.round(angle / 45);
  if (steps < 0) steps += 8
  while (steps > 0) {
    cursorsArr.push(cursorsArr.shift())
    steps--
  }

  // 获取需要操作的元素数组
  const domList = {}
  for (var item of domListIndex) {
    domList[item] = document.querySelector('.' + item)
  }

  // 赋值
  var i = 0
  for (var dir in domList) {
    domList[dir].setAttribute('style', ('cursor:' + cursorsArr[i] + '-resize'))
    i++
  }
}

// 获取点的鼠标手势
function getNewCursorArray(degree) {
  const cursorStyleArray = ['ns-resize', 'nesw-resize', 'ew-resize', 'nwse-resize', 'ns-resize', 'nesw-resize', 'ew-resize', 'nwse-resize'];

  const ARR_LENGTH = 8;
  const STEP = 45;

  let startIndex = 0;

  if (degree) {
    startIndex = Math.floor(degree / STEP);
    if (degree % STEP > (STEP / 2)) {
      startIndex += 1;
    }
  }

  if (startIndex > 1) {
    const len = ARR_LENGTH - startIndex;
    return (cursorStyleArray.slice(startIndex, startIndex + len))
      .concat(cursorStyleArray.slice(0, startIndex));
  }

  return cursorStyleArray;
}

// 取得 rect 中心点
function getConterPoint(box) {
  return {
    left: box.offsetLeft + box.offsetWidth / 2,
    top: box.offsetTop + box.offsetHeight / 2
  };
}

// 取得鼠标释放点在 rect 八点坐标中的对应点及其对角线点
function getPointAndOpposite(point, tip) {
  let oppositePoint = {};
  let currentPoint = {};

  let currentIndex = 0;
  let oppositeIndex = 0;

  point.forEach((target, index) => {
    if (index == tip) {
      currentPoint = target;
      currentIndex = index;
      // console.log(index)
      let offset = 4;
      let oIndex = index - offset;
      if (oIndex < 0) {
        oIndex = index + offset;
      }
      oppositePoint = point.slice(oIndex, oIndex + 1)[0];
      oppositeIndex = oIndex;
    }
  });

  return {
    current: {
      index: currentIndex,
      point: currentPoint
    },
    opposite: {
      index: oppositeIndex,
      point: oppositePoint
    }
  };
}

// 根据缩放基点和缩放比例取得新的 rect
function getNewRect(oPoint, scale, oTransformedRect, baseIndex) {
  var scaledRect = getScaledRect({
    left: oPoint.left,
    top: oPoint.top,
    width: oPoint.width,
    height: oPoint.height,
    scale: scale
  });

  var transformedRotateRect = transform(scaledRect, oPoint.rotate);

  // 计算到平移后的新坐标
  var translatedX = oTransformedRect.point[baseIndex].left - transformedRotateRect.point[baseIndex].left + transformedRotateRect.left;
  var translatedY = oTransformedRect.point[baseIndex].top - transformedRotateRect.point[baseIndex].top + transformedRotateRect.top;

  // 计算平移后元素左上角的坐标
  var newX = translatedX + transformedRotateRect.width / 2 - scaledRect.width / 2;
  var newY = translatedY + transformedRotateRect.height / 2 - scaledRect.height / 2;

  // 缩放后元素的高宽
  var newWidth = scaledRect.width;
  var newHeight = scaledRect.height;

  return {
    left: newX,
    top: newY,
    width: newWidth,
    height: newHeight
  };
}

// 取得缩放指定倍数后的坐标
function getScaledRect(params, baseIndex) {
  // params    rect
  // baseIndex 基点索引
  var { left, top, width, height, scale } = params;
  var offset = {
    left: 0,
    top: 0
  };
  var deltaXScale = scale.left - 1;
  var deltaYScale = scale.top - 1;
  var deltaWidth = width * deltaXScale;
  var deltaHeight = height * deltaYScale;
  var newWidth = width + deltaWidth;
  var newHeight = height + deltaHeight;
  var newX = left - deltaWidth / 2;
  var newY = top - deltaHeight / 2
  if (baseIndex) {
    var points = [{ left, top }, { left: left + width, top }, { left: left + width, top: top + height }, { left, top: top + height }];
    var newPoints = [{ left: newX, top: newY }, { left: newX + newWidth, top: newY }, { left: newX + newWidth, top: newY + newHeight }, { left: newX, top: newY + newHeight }];
    offset.left = points[baseIndex].left - newPoints[baseIndex].left;
    offset.top = points[baseIndex].top - newPoints[baseIndex].top;
  }
  return {
    left: newX + offset.left,
    top: newY + offset.top,
    width: newWidth,
    height: newHeight
  }
}

// 获取旋转指定角度后的 rect
function transform(options, angle) {
  // options rect
  // angle   旋转角度
  var left = options.left;
  var top = options.top;
  var width = options.width;
  var height = options.height;

  var r = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
  var a = Math.round(Math.atan(height / width) * 180 / Math.PI);
  var tlbra = 180 - angle - a;
  var trbla = a - angle;
  var ta = 90 - angle;
  var ra = angle;

  var halfWidth = width / 2;
  var halfHeight = height / 2;

  var middleX = left + halfWidth;
  var middleY = top + halfHeight;

  var topLeft = {
    left: middleX + r * Math.cos(tlbra * Math.PI / 180),
    top: middleY - r * Math.sin(tlbra * Math.PI / 180)
  };
  var top = {
    left: middleX + halfHeight * Math.cos(ta * Math.PI / 180),
    top: middleY - halfHeight * Math.sin(ta * Math.PI / 180),
  };
  var topRight = {
    left: middleX + r * Math.cos(trbla * Math.PI / 180),
    top: middleY - r * Math.sin(trbla * Math.PI / 180)
  };
  var right = {
    left: middleX + halfWidth * Math.cos(ra * Math.PI / 180),
    top: middleY + halfWidth * Math.sin(ra * Math.PI / 180),
  };
  var bottomRight = {
    left: middleX - r * Math.cos(tlbra * Math.PI / 180),
    top: middleY + r * Math.sin(tlbra * Math.PI / 180)
  };
  var bottom = {
    left: middleX - halfHeight * Math.sin(ra * Math.PI / 180),
    top: middleY + halfHeight * Math.cos(ra * Math.PI / 180),
  }
  var bottomLeft = {
    left: middleX - r * Math.cos(trbla * Math.PI / 180),
    top: middleY + r * Math.sin(trbla * Math.PI / 180)
  };
  var left = {
    left: middleX - halfWidth * Math.cos(ra * Math.PI / 180),
    top: middleY - halfWidth * Math.sin(ra * Math.PI / 180),
  }

  var minX = Math.min(topLeft.left, topRight.left, bottomRight.left, bottomLeft.left);
  var maxX = Math.max(topLeft.left, topRight.left, bottomRight.left, bottomLeft.left);
  var minY = Math.min(topLeft.top, topRight.top, bottomRight.top, bottomLeft.top);
  var maxY = Math.max(topLeft.top, topRight.top, bottomRight.top, bottomLeft.top);

  return {
    point: [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left],
    width: maxX - minX,
    height: maxY - minY,
    left: minX,
    right: maxX,
    top: minY,
    bottom: maxY
  }
}