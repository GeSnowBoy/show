app.pages[4] = (function() {
  var FRAMES = 150;

  var RADIUS_PERCENT = 0.3;
  var JUMP_X_DIS = 20;
  var JUMP_HEIGHT_PERCENT = 0.55;
  var WIDTH;
  var HEIGHT;
  var CENTER_X;
  var RADIUS;
  var CIRCLE_START_X;
  var JUMP_START_X;
  var JUMP_END_X;
  var CIRCEL_TOP_PERCENT;
  var BASE_Y;
  var GIRL_HEIGHT2;
  var GIRL_WIDTH2;
  var FIX_END_X;
  var HEIGHT_FIX;
  var JUMP_HEIGHT;

  var page = {
    TIME: 6000,
    FRAMES: FRAMES,
    render: render,
    init: init,
    onLoad: onLoad,
    onLeave: onLeave,
    dependingTask: 'p4',
    isFlipReady: false,
    hasBranch: true,
  };

  function init() {
    initEvents();
  }

  function initEvents() {

  }

  function initSize() {
    WIDTH = $(window).width();
    HEIGHT = $(window).height();
    CENTER_X = WIDTH / 2;
    RADIUS = HEIGHT * RADIUS_PERCENT;
    CIRCLE_START_X = CENTER_X - RADIUS;
    JUMP_START_X = CENTER_X - RADIUS - JUMP_X_DIS;
    JUMP_END_X = CENTER_X + RADIUS + JUMP_X_DIS;
    CIRCEL_TOP_PERCENT = 0.22;
    BASE_Y = HEIGHT * (RADIUS_PERCENT * 2 + CIRCEL_TOP_PERCENT);
    GIRL_HEIGHT2 = HEIGHT * 0.22 * 0.75;
    GIRL_WIDTH2 = WIDTH * 0.0952 * 0.5;
    FIX_END_X = CENTER_X + GIRL_WIDTH2 * 3;
    HEIGHT_FIX = GIRL_WIDTH2 * 0.2;
    JUMP_HEIGHT = RADIUS * JUMP_HEIGHT_PERCENT;
  }

  function girlToMain() {
    $('.p4-bg').addClass("pNbg-active");
    $('.p4-bg1').addClass("pN-gonglu-active");
    $('.p4-wds.text-describe').addClass("active");
    $('.roadP4').addClass('active');
    // $('.p4 .girlRun').animate({
    //   'left': '100%'
    // }, timer * 1000, 'linear', function() {
    //   $('.p4 .girlRun').removeClass('active');
    //   $('.roadP4').addClass('animatePause');
    //   console.log('到达');
    //   // app.showPage(6);
    //   // setTimeout(function(){
    //   //   $('.p4').remove();
    //   // },800);
    // });
  }

  function RemovegirlToMain(){
    $('.p4-bg').removeClass("pNbg-active");
    $('.p4-bg1').removeClass("pN-gonglu-active");
    $('.roadP4').removeClass('active');
  }
  function onLoad() {
    setTimeout(function() {
      girlToMain(app.timer);
    }, 500);
    setTimeout(function() {
      page.isFlipReady = true;
      app.animatePage(4);
    }, 1000);
  }

  function onLeave() {
    page.isFlipReady = false;
    RemovegirlToMain();
  }
 


  var $girl = $('.p4 .girlRun');

  function calcLeftJumpY(x) {
    if (x < CIRCLE_START_X) {
      var xdis = (x - JUMP_START_X);
      var ydis = (JUMP_HEIGHT / JUMP_X_DIS) * xdis;
      return BASE_Y - ydis;
    } else {
      var xdis = CENTER_X - x;
      var ydis = Math.sqrt(RADIUS * RADIUS - xdis * xdis);
      return BASE_Y - JUMP_HEIGHT - ydis;
    }
  }

  function calcY(x) {
    var y = BASE_Y;
    if (JUMP_START_X <= x && x <= JUMP_END_X) {
      if (x <= CENTER_X) {
        y = calcLeftJumpY(x);
      } else {
        y = calcLeftJumpY(CENTER_X - (x - CENTER_X));
      }

      if (CIRCLE_START_X <= x && x <= FIX_END_X) {
        y += HEIGHT_FIX;
      }
    }
    return y;
  }

  function render(frameId) {
    if (frameId === 0) {
      initSize();
    }

    var left = frameId / FRAMES * WIDTH;
    var top = calcY(left);
    $girl.css({
      left: left - GIRL_WIDTH2,
      top: top - GIRL_HEIGHT2
    });
    if (frameId >= FRAMES) {
      onEnd();
    }
  }

  function onEnd() {
    console.log('p4完毕');
    app.showPage(6);
    setTimeout(function(){
      $('.p4').remove();
    },800);
  }

  // debug
  function mark(x, y) {
    var $mark = $('<div class="p4-mark"></div>');
    $mark.css({
      position: 'absolute',
      width: 10,
      height: 10,
      backgroundColor: 'red',
      zIndex: 10000,
      left: x, 
      top: y
    });
    $('.p4').append($mark);
  }

  // mark(JUMP_START_X, BASE_Y);
  // mark(CIRCLE_START_X, BASE_Y - RADIUS);

  return page;
})();
