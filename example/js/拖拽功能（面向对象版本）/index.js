window.onload = function () {
  new Drag('div1');
  new LimDrag('div2');
};

function Drag(id) {
  var _this = this;
  this.oDiv = document.getElementById(id);
  this.oDiv.onmousedown = function (ev) {
    _this.fnDown(ev);
    return false;
  };
}

Drag.prototype.fnDown = function (ev) {
  var oEvent = ev || event;
  var _this = this;

  this.disX = oEvent.clientX - this.oDiv.offsetLeft;
  this.disY = oEvent.clientY - this.oDiv.offsetTop;

  document.onmousemove = function (ev) {
    _this.fnMove(ev);
  };

  document.onmouseup = function () {
    _this.fnUp();
  };
}

Drag.prototype.fnMove = function (ev) {
  var oEvent = ev || event;
  this.oDiv.style.left = oEvent.clientX - this.disX + 'px';
  this.oDiv.style.top = oEvent.clientY - this.disY + 'px';
}

Drag.prototype.fnUp = function () {
  document.onmousemove = null;
  document.onmouseup = null;
}

function LimDrag(id) {
  Drag.call(this, id);
}

for (var i in Drag.prototype) {
  LimDrag.prototype[i] = Drag.prototype[i];
}

LimDrag.prototype.fnMove = function (ev) {
  var oEvent = ev || event;
  var l = oEvent.clientX - this.disX;
  var t = oEvent.clientY - this.disY;

  if (l < 0) {
    l = 0;
  }
  else if (l > document.documentElement.clientWidth - this.oDiv.offsetWidth) {
    l = document.documentElement.clientWidth - this.oDiv.offsetWidth;
  }

  if (t < 0) {
    t = 0;
  }
  else if (t > document.documentElement.clientHeight - this.oDiv.offsetHeight) {
    t = document.documentElement.clientHeight - this.oDiv.offsetHeight;
  }

  this.oDiv.style.left = l + 'px';
  this.oDiv.style.top = t + 'px';
};