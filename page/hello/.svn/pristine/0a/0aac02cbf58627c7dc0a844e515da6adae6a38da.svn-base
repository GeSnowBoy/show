$(function() {

  var interval = 1;


  function initCommenEvent() {

    $('.btn-prev').click(function() {
      if (app.audios && app.audios.aClick) {
        app.audios.aClick.play();
      }
      if (app.pages[app.currentPage - 1]) {
        app.showPage(app.currentPage - 1);
        // return false;
      }
    });
    $('.btn-next').click(function() {
      if (app.audios && app.audios.aClick) {
        app.audios.aClick.play();
      }
      if (app.pages[app.currentPage + 1]) {
        app.showPage(app.currentPage + 1);
      }
    });
    $('.btn-touchable').on('touchstart', function() {
      $(this).addClass('touched');
      if (app.audios && app.audios.aClick) {
        app.audios.aClick.play();
      }
    });
    $('.btn-touchable').on('touchend', function() {
      $(this).removeClass('touched');
    });

    // $("body").swipe({
    //   swipeUp: function(event, direction, distance, duration, fingerCount) {
    //     if (app.pages[app.currentPage + 1]) {
    //       app.showPage(app.currentPage + 1);
    //     }
    //   },
    //   swipeDown: function(event, direction, distance, duration, fingerCount) {
    //     if (app.pages[app.currentPage - 1]) {
    //       app.showPage(app.currentPage - 1);
    //       // return false;
    //     }
    //   }
    // });
  }
  /***********************************/
  function loading(showPageId, branch) {
    var processNum = 0;
    var fakePreload = function() {
      interval = setInterval(function() {
        processNum += 1.0 + 0 | Math.random() * 3;
        if (processNum >= 79) {
          processNum = 79;
          clearInterval(interval);
        }
        setProcess(processNum);
      }, 150);
    };
    var setProcess = function(n) {
      $('.p0-process').text(n + '%');
    };

    $('.cssloader').hide();
    $('.p0').show();
    fakePreload();

    app.loader.init({
      manifest: [{
        id: 'p1',
        selector: '.p1 img',
        imgs:[
        'img/p1bg.jpg',
        'img/girl_run.png',
        'img/p1_woman.png',
        'img/p1_shan.png',
        'img/p1_zhen.gif',
        'img/p1_jiqi.png',
        'img/p1_jiqiguang.png'
        ]
      }, {
        id: 'p2',
        selector: '.p2 img',
        imgs:['img/p2bg.jpg']
      }, {
        id: 'p3',
        selector: '.p3 img',
        imgs:['img/p3bg.jpg']
      }, {
        id: 'p4',
        selector: '.p4 img',
        imgs:['img/p4bg.jpg']
      }, {
        id: 'p5',
        selector: '.p5 img',
        imgs:['img/iphone_white.png','img/iphone_black.png','img/women_eye.jpg']
      }, {
        id: 'p6',
        selector: '.p6 img',
        imgs:['img/p6bg.jpg']
      }, {
        id: 'p7',
        selector: '.p7 img',
        imgs:['img/girl_run1.png']
      }],
      onAllFrontImgLoaded: function(e) {
        // console.log('onAllFrontImgLoaded',e);
        clearInterval(interval);
        processNum = 80;

        interval = setInterval(function() {
          processNum += 3;
          if (processNum >= 100) {
            processNum = 100;
            clearInterval(interval);
            app.showPage(showPageId, branch);
          }
          setProcess(processNum);
        }, 20);
      },
      // onFrontProcessChange: function(e) {
      // $('.p0-process').text(parseInt(e.percent * 100) + '%');
      // }
    });
    app.loader.showPageNo = showPageId;
    app.loader.start('p' + showPageId);
  }

  /************************************/

  function initApp() {
    app.initPages();
    loading(1);
    app.common.initContentBox($('.content'), 5, 3);
    initCommenEvent();
    app.bgm && app.bgm.init();
  }

  initApp();
});
