$(function () {

  var h = $('.box').innerHeight();
  var origin = [];

  // 生成图形
  for (var i = 0; i < 14; i++) {
    $('.box').append('<div class="column"><span class="t"></span><span class="h"></span></div>');
  }

  // 随机赋值
  $('.box .column').each(function (index) {
    var height = Math.ceil(Math.random() * h);
    $(this).css({
      'height': height,
      'left': 7 * index + '%',
    }).addClass('column' + (index + 1))
    origin.push(this)
  });

  // 绑定点击事件
  var arr = origin;
  $('#bubble').on('click', function () {
    bubbleSort(arr, 0)
  });

  //排序
  function bubbleSort(arr, index) {
    var l = arr.length;
    if (index == l) {
      return;
    }

    // 每比较完一次，就把当前的 index 赋予 i，下次就从 i 开始继续排序
    var i = index;
    sort(arr, index, i);

    function sort(arr, index, i) {
      // index 依次去跟 i 比较
      if (i == l - 1) {
        index++;
        bubbleSort(arr, index);
        return;
      };

      i++;

      if (arr[index].offsetHeight > arr[i].offsetHeight) {

        var temp = arr[i];
        arr[i] = arr[index];
        arr[index] = temp;

        var tem = arr[i].offsetLeft;
        arr[i].style.left = arr[index].offsetLeft + 'px';
        arr[index].style.left = tem + 'px';

        setTimeout(function () {
          sort(arr, index, i);
        }, 500)

      } else {
        sort(arr, index, i);
      }
    }
  }

})