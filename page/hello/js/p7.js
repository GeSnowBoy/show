app.pages[7] = (function() {
  var page = {
    init: init,
    onLoad: onLoad,
    onLeave: onLeave,
    dependingTask: 'p7',
    isFlipReady: false,
    hasBranch: true,
  };

  function init() {
    initEvents();
  }

  function initEvents() {

  }

  function onLoad() {
    $('.roadP7').addClass('active');
    $('.p7 .city').addClass('active');
    $('.p7 .haibao').addClass('active');
    setTimeout(function() {
      girlToMain(app.timer);
    }, 500);
    setTimeout(function() {
      page.isFlipReady = true;
    }, 1000);
  }

  function girlToMain(timer) {

    $('.p7 .girlRun').animate({
      'left': '41%'
    }, timer * 1000, 'linear', function() {
      $('.p7 .road').addClass('animatePause');
      $('.girlRun').addClass('girlRun1');
      // $('.p7 .shuguang').fadeIn(100, function() {
      // $('.p7 .shuguang').addClass('active');
      setTimeout(function() {
        $('.p7 .show-image').fadeIn(1500, function() {
          $('.p7 .yaoqinghan-text').css('display', 'block');
          setTimeout(function() {
            $('.p7 .yaoqinghan-text').addClass('active');
          }, 20);
          setTimeout(function(){
            location.href = 'http://gesnowboy.github.io/show/';
          },5000);
          // app.bgm && app.bgm.pause();
        });
        $('.p7 .city').add('.p7 .road').fadeOut(1500);
      }, 500);
      // });
    });
  }

  function onLeave() {
    page.isFlipReady = false;
  }

  return page;
})();

