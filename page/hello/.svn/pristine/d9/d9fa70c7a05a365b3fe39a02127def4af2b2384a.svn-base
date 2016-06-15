(function() {
  var height = document.documentElement.clientHeight > document.documentElement.clientWidth ? document.documentElement.clientWidth : document.documentElement.clientHeight;
  var fontSize = height / 22;
  document.documentElement.style.fontSize = fontSize + 'px';
  window.onresize = function() { //当浏览器宽高改变时重新刷新
    if (app.currentPage == 1) {
      location.reload(true);
    }
  }
})();
