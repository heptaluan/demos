window.onload = function () {

  // 兼容 IE 下 getElementsByClassName 不兼容
  if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (cls) {
      var ret = [];
      var els = document.getElementsByTagName('*');
      for (var i = 0, len = els.length; i < len; i++) {
        if (els[i].className === cls
          || els[i].className.indexOf(cls + ' ') >= 0
          || els[i].className.indexOf(' ' + cls + ' ') >= 0
          || els[i].className.indexOf(' ' + cls) >= 0) {
          ret.push(els[i]);
        }
      }
      return ret;
    }
  }

  var cartTable = document.getElementById('cartTable');
  var tr = cartTable.children[1].rows;
  var checkInputs = document.getElementsByClassName('check');
  var checkOnes = document.getElementsByClassName('check-one');
  var checkAllInputs = document.getElementsByClassName('check-all');
  var selectedTotal = document.getElementById('selectedTotal');
  var priceTotal = document.getElementById('priceTotal');
  var selected = document.getElementById("selected");
  var foot = document.getElementById("foot");
  var selectedViewList = document.getElementById('selectedViewList');
  var deleteAll = document.getElementById("deleteAll");

  // 计算总价，包括浮层
  function getTotal() {
    var selected = 0;
    var price = 0;
    var HTMLstr = "";
    for (var i = 0, len = tr.length; i < len; i++) {
      if (tr[i].getElementsByTagName("input")[0].checked) {
        tr[i].className = 'on';
        // 数目
        selected += parseInt(tr[i].getElementsByTagName("input")[1].value);
        // 价格
        price += parseFloat(tr[i].cells[4].innerHTML);
        HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>'
      } else {
        tr[i].className = "";
      }
    }
    selectedTotal.innerHTML = selected;
    priceTotal.innerHTML = price.toFixed(2);
    selectedViewList.innerHTML = HTMLstr;

    if (selected == 0) {
      foot.className = "foot";
    }
  }

  // 单行小计
  function getSubTotal(tr) {
    var tds = tr.cells;
    var price = parseFloat(tds[2].innerHTML);
    var count = parseInt(tr.getElementsByTagName("input")[1].value)
    var subTotal = parseFloat(price * count).toFixed(2);
    tds[4].innerHTML = subTotal;
  }

  // 全选 多选
  for (var i = 0, len = checkInputs.length; i < len; i++) {
    checkInputs[i].onclick = function () {
      if (this.className == "check-all check") {
        for (var j = 0; j < checkInputs.length; j++) {
          checkInputs[j].checked = this.checked;
        }
      }
      if (this.checked == false) {
        for (var k = 0; k < checkAllInputs.length; k++) {
          checkAllInputs[k].checked = false;
        }
      }

      if (this.className == "check-one check" && this.checked) {
        var total = 0;
        for (var n = 0; n < checkOnes.length; n++) {
          if (checkOnes[n].checked) {
            total++;
          }
        }
        if (total == checkOnes.length) {
          for (var m = 0; m < checkAllInputs.length; m++) {
            checkAllInputs[m].checked = true;
          }
        }
      }
      getTotal();
    }
  }

  // 弹出层
  selected.onclick = function () {
    if (foot.className == "foot") {
      if (selectedTotal.innerHTML != 0) {
        foot.className = "foot show"
      }
    } else {
      foot.className = "foot"
    }
  }

  // 弹出层上商品选择
  selectedViewList.onclick = function (e) {
    e = e || window.event;
    var el = e.target || e.srcElement;
    if (el.className == "del") {
      var index = el.getAttribute("index");
      var input = tr[index].getElementsByTagName("input")[0];
      input.checked = false;
      input.onclick();
    }
  }

  // 单行添加事件委托
  for (var i = 0; i < tr.length; i++) {
    tr[i].onclick = function (e) {
      e = e || window.event;
      var el = e.target || e.srcElement;
      var cls = el.className;
      var input = this.getElementsByTagName("input")[1];
      var val = parseInt(input.value);
      var reduce = document.getElementsByTagName("span")[1];
      switch (cls) {
        case "add":
          input.value = val + 1;
          reduce.innerHTML = "-";
          getSubTotal(this);
          break;
        case "reduce":
          if (val > 1) {
            input.value = val - 1;
          }
          if (input.value <= 1) {
            reduce.innerHTML = "";
          }
          getSubTotal(this);
          break;
        case "delete":
          var conf = confirm("确定要删除吗？");
          if (conf) {
            this.parentNode.removeChild(this);
          }
          break;
        default:
          break;
      }
      getTotal();
    }

    // 添加键盘事件
    tr[i].getElementsByTagName("input")[1].onkeyup = function () {
      var val = parseInt(this.value);
      var tr = this.parentNode.parentNode;
      var reduce = tr.getElementsByTagName("span")[1];
      if (isNaN(val) || val < 1) {
        val = 1;
      }
      this.value = val;

      if (val <= 1) {
        reduce.innerHTML = "";
      } else {
        reduce.innerHTML = "-";
      }
      getSubTotal(this.parentNode.parentNode);
    }
  }

  // 删除事件
  deleteAll.onclick = function () {
    if (selectedTotal.innerHTML != "0") {
      var conf = confirm("确定要删除吗？");
      if (conf) {
        for (var i = 0; i < tr.length; i++) {
          var input = tr[i].getElementsByTagName("input")[0];
          if (input.checked) {
            tr[i].parentNode.removeChild(tr[i]);
            // 回退下标，否则选择了两个的话 只能删除掉第一个
            i--;
          }
        }
      }
    }
  }

  // 进入页面的时候更新状态
  checkAllInputs[0].checked = true;
  checkAllInputs[0].onclick();
}