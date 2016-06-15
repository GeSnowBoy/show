app.pages[5] = (function() {
  var page = {
    init: init,
    onLoad: onLoad,
    onLeave: onLeave,
    dependingTask: 'p5',
    isFlipReady: false,
    hasBranch: true,
  };

  function init() {
    initEvents();
  }

  function initEvents() {}

  function initIphonePosition() {
    var bgWidth = 2338;
    var bgHeight = 511;
    var cityHeight = $('.p5 .city').height();
    var cityWidth = cityHeight * bgWidth / bgHeight;
    var iphoneHeight = cityHeight * 182 / bgHeight;
    var iphoneWidth = iphoneHeight * 86 / 182;
    var iphoneWhiteLeft = cityWidth * 1510 / bgWidth;
    var iphoneBlackLeft = cityWidth * 1213 / bgWidth;

    var eyeHeight = ((cityHeight * 186 / bgHeight) >> 0) + 3;
    var eyeWidth = (eyeHeight * 115 / 186) >> 0;
    var eyeLeft = cityWidth * 1353 / bgWidth - 1;
    $('.p5 .iphoneWhite').css({
      'height': iphoneHeight,
      'width': iphoneWidth,
      'left': iphoneWhiteLeft
    });
    $('.p5 .iphoneBlack').css({
      'height': iphoneHeight,
      'width': iphoneWidth,
      'left': iphoneBlackLeft
    });
    $('.p5 .eye').css({
      'height': eyeHeight,
      'width': eyeWidth,
      'left': eyeLeft
    })
  }

  function onLoad() {
    initLoad(app.timer);
    initIphonePosition();
    setTimeout(function() {
      // $('.p5 .text-describe').addClass('active');
      page.isFlipReady = true;
    }, 1000);
  }

  function initLoad(timer) {
    $('.p5 .city').addClass('active');
    $('.p5 .road').addClass('active');
    $('.p5 .eye').addClass('active');
    setTimeout(function() {
      $('.p5 .run_car').addClass('active');
    }, 2000);
    $('.p5 .girlRun').addClass('active').animate({
      'left': '100%'
    }, timer * 1000, 'linear', animateFinish);

    function animateFinish() {
      app.showPage(7);
      setTimeout(function() {
        $('.p5').remove();
      }, 800);
    }
    // function animateFinish() {}

    

  }

  function onLeave() {
    page.isFlipReady = false;
  }

  return page;
})();
