app.pages[1] = (function() {
  var page = {
    TIME: 4000,
    FRAMES: 500,
    init: init,
    onLoad: onLoad,
    onLeave: onLeave,
    render: render,
    dependingTask: 'p1',
    isFlipReady: false, //标志页面是否可以翻页, 当页面所有动画运行完之后设置为true,离开页面后再重置为false
    hasBranch: false, //标志页面内是否有分支,默认为false,
  };
  var flog = true;

  function init() {
    initEvents();
  }

  function initEvents() {}

  function moiveStart() {
    p1addImgNei();
    p1addImgWai();
    app.bgm && app.bgm.play();
    setTimeout(function() {
      girlToMain(app.timer, 1);
    }, 500);

  }

  function onLoad() {
    var timerForStart = setInterval(function() {
      if (app.flagForStart) {
        clearInterval(timerForStart);
        moiveStart();
      }
    }, 20);
    setTimeout(function() {
      page.isFlipReady = true;
      // app.animatePage(1);
    }, 1000);
  }

  function p1addImgNei() {
    var htmls = '';
    htmls += '<img class="p1-woman" src="img/p1_woman.png">';
    htmls += '<img class="pN-shan" src="img/p1_shan.png">';
    htmls += '<img class="p1-touying dp-n" src="img/p1_zhen.gif">';
    $('.p1-gonglu-nei').append(htmls);
    console.log('p1 填图内');
  }

  function p1addImgWai() {
    var htmls = '';
    htmls += '<img class="p1-jiqi" src="img/p1_jiqi.png">';
    htmls += '<img class="p1-jiqiguang dp-n" src="img/p1_jiqiguang.png?v=1">';
    htmls += '<img class="p1-jiqiguang p1-jiqiguang1 dp-n" src="img/p1_jiqiguang.png?v=1">';
    $('.p1-gonglu-wai').append(htmls);
    console.log('p1 填图外');
  }

  function girlToMain(timer, id) {
    var times = timer / 2 * 1000;
    $('.p' + id + '-jiqiguang').delay(2000).fadeIn(function() {
      $('.p' + id + '-jiqiguang1').addClass('pN-guang');
      $('.p1-touying').fadeIn();
    });
    $('.p' + id + '-gonglu').addClass('pN-gonglu-active');
    $('.p' + id + 'bg').addClass('pNbg-active');
    $('.p' + id + ' .girlRun').addClass('active');
    $('.p' + id + '-road').addClass('pN-road-active');
    $('.p' + id + ' .girlRun').animate({
      'left': '100%'
    }, timer * 1000, 'linear', function() {
      app.showPage(2);
      setTimeout(function() {
        $('.p1').remove();
      }, 100);

    });
    // setTimeout(function() {
    //   $('.p' + id + '-text1').removeClass('pN-textAni');
    // }, 1000);
    // setTimeout(function() {
    //   $('.p' + id + '-text2').removeClass('pN-textAni');
    // }, 2500);
    setTimeout(function() {
      $('.p' + id + '-woman').css({ "top": "17%" });
    }, times);
  }

  function onLeave() {
    page.isFlipReady = false;
  }

  function render(frameId) {
    // console.log('render#' + frameId);
  }

  return page;
})();
