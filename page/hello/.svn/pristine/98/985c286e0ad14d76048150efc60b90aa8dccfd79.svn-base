(function() {
  var app = window.app;
  app.flagForStart = 0;
  app.initPages = function() {

    $.each(app.pages, function(key, value) {
      // console.log("Key: " + key + ", Value: ", value);
      if (app.pages[key].init) {
        app.pages[key].init();
      }
    });
    $.each(app.dialogs, function(key, value) {
      // console.log("Key: " + key + ", Value: ", value);
      if (app.dialogs[key].init) {
        app.dialogs[key].init();
      }
    });
  };

  app.showPage = function(nextPage, branch) {
    console.log('showPage', nextPage);
    $('.page').fadeOut(100);
    $('.p' + nextPage).fadeIn(100);
    var cp = app.currentPage;
    // var setSlide = function(pageNum, lastTime, x, y, z) {
    //   $('.p'+ pageNum).fa
    //   $('.p' + pageNum).css({
    //     '-webkit-transition': '-webkit-transform ' + lastTime + 's',
    //     '-webkit-transform': 'translate(' + x + '%,' + y + '%)'
    //   });
    // };


    if (cp !== 0 && !app.pages[cp].isFlipReady) {
      return false;
    }
    // console.log('showPage cp nextPage', cp, nextPage);

    if (app.pages[nextPage]) {
      var dependingTask = app.pages[nextPage].dependingTask;
      if (app.isMultiLoad && !app.loader.isTaskDone(dependingTask)) {
        $('.dialog100').show();
        var task = app.loader.currentTask;
        // console.log('.....dependingTask,task',dependingTask,task.id);
        if(task.id != dependingTask ){
          task.pause();
          task = app.loader.getNextTask(dependingTask);
          task.load();
        }
        task.all = function() {
          app.showPage(nextPage);
        };
        return false;
      }
      $('.dialog100').hide();

      if (app.pages[nextPage].hasBranch) {
        if (!branch) {
          branch = 1;
        }
        $('.p' + nextPage).find('.branch').hide();
        $('.p' + nextPage + '-' + branch).show();
      }
      // if (nextPage > 1) {
      //   setSlide(nextPage, 0, 0, 0);
      //   setSlide(cp, 0, 0, 0);
      //   $('.page').fadeOut(100);
      //   $('.p' + nextPage).show();
      // }
      // if (1) { //p1 to p2
      //   setSlide(nextPage, 0.1, 100, 0);
      //   $('.p' + nextPage).show(0, function() {
      //     setSlide(nextPage, 0.1, 0, 0);
      //     setSlide(cp, 0.1, '-100', 0);
      //   });
      // } else if (nextPage == cp - 1 && nextPage >= 1) { //p2 to p1
      //   setSlide(nextPage, 0.1, 100, 0);
      //   $('.p' + nextPage).show(0, function() {
      //     setSlide(nextPage, 0.1, 0, 0);
      //     setSlide(cp, 0.1, '-100', 0);
      //   });
      // }else {
      //   $('.page').fadeOut(500);
      //   $('.p' + nextPage).show();
      // }
      var selectElement = '.page:not(.p' + nextPage +')';
      $('.p' + nextPage).fadeIn(100);
      $(selectElement).fadeOut(100);

      if (app.pages[cp] && app.pages[cp].onLeave) {
        app.pages[cp].onLeave();
      }
      if (app.pages[nextPage].onLoad) {
        app.pages[nextPage].onLoad();
      }
      app.currentPage = nextPage;
      window._hmt && _hmt.push(['_trackEvent', '进入页面', '进入第' + nextPage + '页']);
    }
  };

  function now() {
    return new Date().getTime();
  }

  app.animatePage = function(pageId) {
    var page = app.pages[pageId];
    if (typeof page != 'object') {
      console.error('[animatePage] invalid pageId: ' + pageId);
      return;
    }
    if (typeof page.render != 'function') {
      console.error('[animatePage] no page.render');
      return;
    }

    var TIME = page.TIME || 4000;
    var FRAMES = page.FRAMES || 200;
    var frameId = 0;
    var startTime = now();
    var intervalId = setInterval(function() {
      frameId = Math.floor((now() - startTime) / TIME * FRAMES);
      page.render(frameId);
      if (frameId >= FRAMES) {
        clearInterval(intervalId);
        return;
      }
      ++frameId;
    }, 20);
  };
  
  app.showDialog = function(nextPage) {
    $('.dialog').fadeOut(500);
    $('.dialog' + nextPage).fadeIn(500);
  };

  // app.onPreLoad = function(callback) {
  //   window.onload = callback;
  // };
}());
