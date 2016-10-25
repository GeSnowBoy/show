 app.common = (function() {
   var windowWidth = $(window).width();
   var windowHeight = $(window).height();

   var browser = (function() {
     var ua = navigator.userAgent.toLowerCase();
     var b = {
       ua: ua,
       isAndroid: /Android/i.test(ua),
       isIos: /iPhone|iPad|iPod/i.test(ua),
       isBlackberry: /BlackBerry/i.test(ua),
       isWindowsPhone: /IEMobile/i.test(ua),
     };
     b.isMoblie = b.isAndroid || b.isIos || b.isBlackberry || b.isWindowsPhone;
     b.isPC = !b.isMoblie;
     return b;
   })();

   function initContentBox(qdom, inH, inW) {
     var pcw, pch;
     if (windowHeight / windowWidth >= inH / inW) {
       pcw = windowWidth;
       pch = windowWidth * inH / inW;
     } else {
       pcw = windowHeight * inW / inH;
       pch = windowHeight;
     }
     qdom.css({
       'width': pcw,
       'height': pch
     });
   }

   /*阻止长按出现菜单*/
   // function preventLongPressMenu(node) {
   //   var absorbEvent = function(event) {
   //     var e = event || window.event;
   //     e.preventDefault && e.preventDefault();
   //     e.stopPropagation && e.stopPropagation();
   //     e.cancelBubble = true;
   //     e.returnValue = false;
   //     return false;
   //   };
   //   node.ontouchstart = absorbEvent;
   //   node.ontouchmove = absorbEvent;
   //   node.ontouchend = absorbEvent;
   //   node.ontouchcancel = absorbEvent;
   // }


   // function getQueryString(name) {
   //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
   //   var r = decodeURI(window.location.search).substr(1).match(reg);
   //   if (r !== null) return unescape(r[2]);
   //   return null;
   // }

   // function getNow(){
   //    var now = new Date();
   //    var ms = now.getTime() % 1000;
   //    var ts = now.toLocaleTimeString() + '.' + ms;
   //    return ts;
   // }

   // function loadImg(url,callback) {
   //   var img = new Image();
   //   img.src = url;
   //   if (img.complete) {
   //     callback();
   //   } else {
   //     img.onload = function() {
   //       callback();
   //       img.onload = null;
   //     };
   //   }
   // }

  // function mathRandom(m, n) {
  //     return parseInt(Math.round(Math.random() * (n - m) + m));
  //   }


   // // ajax 模板
   // function doAjax() {
   //   $.ajax({
   //     url: 'api.php',
   //     type: 'GET',
   //     dataType: 'json',
   //     //timeout: 10000,
   //     data: {
   //       num1: num1,
   //       num2: num2
   //     },
   //     // 发送请求前
   //     beforeSend: function(xhr, settings) {
   //       $('.dialog100').show();//显示菊花
   //       // console.log('beforeSend', xhr, settings);
   //     },
   //     // 请求成功
   //     success: function(data, status, xhr) {
   //       console.log('success', data, status, xhr);
   //       if (data.code === 0) {
   //         // console.log('处理成功');
   //       } else {
   //         // console.log('处理失败');
   //       }
   //     },
   //     error: function(xhr, errorType, error) {
   //       // 请求失败
   //       // console.log('error', xhr, errorType, error);
   //     },
   //     complete: function(xhr, status) {
   //       // 请求成功或失败都执行
   //       $('.dialog100').hide();//关闭菊花
   //       // console.log('complete', xhr, status);
   //     }
   //   });
   // }

   // // 假loading
   // function doPreload(onPreload) {
   //   var process = 0;
   //   var interval = setInterval(function() {
   //     process++;
   //     $('.p0-process').text(process);
   //     if (process >= 100) {
   //       process = 100;
   //       clearInterval(interval);
   //       onPreload();
   //     }
   //   }, 25);
   // }

  // // 取整
  // function getZ(num) {
  //   var rounded;
  //   rounded = (0.5 + num) | 0;
  //   // A double bitwise not.
  //   rounded = ~~(0.5 + num);
  //   // Finally, a left bitwise shift.
  //   rounded = (0.5 + num) << 0;

  //   return rounded;
  // }


   return {
     initContentBox: initContentBox,
     browser: browser,
     // preventLongPressMenu: preventLongPressMenu,
     // getQueryString:getQueryString
   };

 }());
