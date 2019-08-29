
window.onload = function () {
  
  imgLocation('container', 'box');

  var imgData = {
    'data': [
      { 'src': '../../images/01.jpg' },
      { 'src': '../../images/02.jpg' },
      { 'src': '../../images/03.jpg' },
      { 'src': '../../images/04.jpg' },
      { 'src': '../../images/05.jpg' },
      { 'src': '../../images/06.jpg' },
      { 'src': '../../images/07.jpg' },
      { 'src': '../../images/08.jpg' },
      { 'src': '../../images/09.jpg' },
      { 'src': '../../images/10.jpg' },
    ]
  };

  window.onscroll = function () {
    if (checkFlag()) {
      var cparent = document.getElementById('container');
      for (var i = 0; i < imgData.data.length; i++) {
        var ccontent = document.createElement('div');
        ccontent.className = 'box';
        cparent.appendChild(ccontent);
        var boximg = document.createElement('div');
        boximg.className = 'box_img';
        ccontent.appendChild(boximg);
        var img = document.createElement('img');
        img.src = imgData.data[i].src;
        boximg.appendChild(img);
      }
      imgLocation('container', 'box');
    }
  }
};

function checkFlag() {
  var cparent = document.getElementById('container');
  var ccontent = getChildElement(cparent, 'box');
  var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;

  if (lastContentHeight < scrollTop + pageHeight) {
    return true;
  }
}

function imgLocation(parent, content) {
  // 将 parent 下多有的 content 全部取出
  var cparent = document.getElementById(parent);
  var ccontent = getChildElement(cparent, content);
  var imgWidth = ccontent[0].offsetWidth;
  var num = Math.floor(document.documentElement.clientWidth / imgWidth);
  cparent.style.cssText = 'width:' + imgWidth * num + 'px;margin:0 auto';

  var BoxHeightArr = [];
  for (var i = 0; i < ccontent.length; i++) {
    if (i < num) {
      BoxHeightArr[i] = ccontent[i].offsetHeight;
    } else {
      var minheight = Math.min.apply(null, BoxHeightArr);
      var minIndex = getminheightLocation(BoxHeightArr, minheight);
      ccontent[i].style.position = 'absolute';
      ccontent[i].style.top = minheight + 'px';
      ccontent[i].style.left = ccontent[minIndex].offsetLeft + 'px';
      BoxHeightArr[minIndex] = BoxHeightArr[minIndex] + ccontent[i].offsetHeight;
    }
  }

}

function getminheightLocation(BoxHeightArr, minHeight) {
  for (var i in BoxHeightArr) {
    if (BoxHeightArr[i] == minHeight) {
      return i;
    }
  }
}

function getChildElement(parent, content) {
  var contentArr = [];
  var allContent = parent.getElementsByTagName('*');

  for (var i = 0; i < allContent.length; i++) {
    if (allContent[i].className == content) {
      contentArr.push(allContent[i]);
    }
  }
  return contentArr;
}
