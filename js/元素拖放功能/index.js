window.onload = function () {

  var box = document.getElementById('box');
  var con = document.getElementById('con');
  var lis = document.getElementsByTagName('li');

  for (var i = 0; i < lis.length; i++) {
    lis[i].draggable = true;
    lis[i].flag = false;
    lis[i].ondragstart = function () {
      this.flag = true;
    }
    lis[i].ondragend = function () {
      this.flag = false;
    }
  }

  box.ondragenter = function (e) {
    e.preventDefault();
  }

  box.ondragover = function (e) {
    e.preventDefault();
  }

  box.ondragleave = function (e) {
    e.preventDefault();
  }

  box.ondrop = function (e) {
    for (var i = 0; i < lis.length; i++) {
      if (lis[i].flag) {
        box.appendChild(lis[i]);
      }
    }
    e.preventDefault();
  }

  con.ondragenter = function (e) {
    e.preventDefault();
  }

  con.ondragover = function (e) {
    e.preventDefault();
  }

  con.ondragleave = function (e) {
    e.preventDefault();
  }

  con.ondrop = function (e) {
    for (var i = 0; i < lis.length; i++) {
      if (lis[i].flag) {
        con.appendChild(lis[i]);
      }
    }
    e.preventDefault();
  }

}