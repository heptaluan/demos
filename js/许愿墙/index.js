(function ($) {

  $(function () {
    init();
  });

  var box;

  // 随机颜色
  function randColor() {
    return "rgb(" + Math.ceil(255 * Math.random()) + "," + Math.ceil(255 * Math.random()) + "," + Math.ceil(255 * Math.random()) + ")";
  }

  //创建许愿页
  var createItem = function (text) {
    $('<div class="item"><p>' + text + '</p><a href="#">关闭</a></div>').css({ 'background': randColor() }).appendTo(box).drag();
  };

  // 初始化
  var init = function () {

    box = $('#box');

    // 绑定关闭事件
    box.on('click', 'a', function () {
      $(this).parent().remove();
    });

    var tests = ['1111', '2222', '3333', '4444', '5555'];
    //创建 div，i 对应 index，v 对应内容
    $.each(tests, function (i, v) {
      createItem(v);
    });

    // 绑定输入框
    $('#input').keydown(function (e) {
      var $this = $(this);
      if (e.keyCode == '13') {
        var value = $this.val();
        if (value) {
          createItem(value);
          $this.val('');
        }
      }
    });

  };

  // 拖拽函数
  $.fn.drag = function () {

    var $this = $(this);
    var parent = $this.parent();

    var pw = parent.width();
    var ph = parent.height();
    var thisWidth = $this.width() + parseInt($this.css('padding-left'), 10) + parseInt($this.css('padding-right'), 10);
    var thisHeight = $this.height() + parseInt($this.css('padding-top'), 10) + parseInt($this.css('padding-bottom'), 10);

    var x, y, positionX, positionY;
    var isDown = false;

    var randY = parseInt(Math.random() * (ph - thisHeight), 10);
    var randX = parseInt(Math.random() * (pw - thisWidth), 10);

    parent.css({
      "position": "relative",
      "overflow": "hidden"
    });

    $this.css({
      "cursor": "move",
      "position": "absolute"
    }).css({
      top: randY,
      left: randX
    }).mousedown(function (e) {
      // mousedown 的时候，当前 div 的 zIndex 为 1，其余的为 0
      parent.children().css({
        "zIndex": "0"
      });
      $this.css({
        "zIndex": "1"
      });
      // 然后设置允许拖拽，设置其的 position
      isDown = true;
      x = e.pageX;
      y = e.pageY;
      positionX = $this.position().left;
      positionY = $this.position().top;
      return false;
    });


    $(document).mouseup(function (e) {
      isDown = false;
    }).mousemove(function (e) {
      var xPage = e.pageX;
      var moveX = positionX + xPage - x;

      var yPage = e.pageY;
      var moveY = positionY + yPage - y;
      // 判断边界
      if (isDown == true) {
        $this.css({
          "left": moveX,
          "top": moveY
        });
      } else {
        return;
      }
      if (moveX < 0) {
        $this.css({
          "left": "0"
        });
      }
      if (moveX > (pw - thisWidth)) {
        $this.css({
          "left": pw - thisWidth
        });
      }
      if (moveY < 0) {
        $this.css({
          "top": "0"
        });
      }
      if (moveY > (ph - thisHeight)) {
        $this.css({
          "top": ph - thisHeight
        });
      }
    });
  };

})(jQuery);