function init() {

  var dest = document.getElementById('show');

  dest.addEventListener('dragover', function (ev) {
    ev.stopPropagation();
    ev.preventDefault();
  }, false);

  dest.addEventListener('dragend', function (ev) {
    ev.stopPropagation();
    ev.preventDefault();
  }, false);

  dest.addEventListener('drop', function (ev) {

    ev.stopPropagation();
    ev.preventDefault();

    // 返回拖拽的文件列表对象
    var file = ev.dataTransfer.files[0];

    // 创建 FileReader 对象并调用其方法
    var reader = new FileReader();

    if (file.type.substr(0, 5) == 'image') {
      reader.onload = function (event) {
        dest.style.background = 'url(' + event.target.result + ') no-repeat center';
        dest.innerHTML = '';
      };
      reader.readAsDataURL(file);
    } else if (file.type.substr(0, 4) == 'text') {
      reader.readAsText(file);
      reader.onload = function (f) {
        dest.innerHTML = '<pre>' + this.result + '</pre>';
        dest.style.background = 'white';
      }
    } else {
      dest.innerHTML = '暂不支持此类文件的预览';
      dest.style.background = 'white';
    }
  }, false);

}

// 设置页面属性，不执行默认处理（拒绝被拖放）        
document.ondragover = function (e) { e.preventDefault(); };
document.ondrop = function (e) { e.preventDefault(); }
window.onload = init;    