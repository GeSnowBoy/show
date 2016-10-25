app.pages[3] = (function() {
  timer = 12;
  var page = {
    init: init,
    onLoad: onLoad,
    onLeave: onLeave,
    dependingTask:'p3',
    isFlipReady: false,
    hasBranch: true,
  };

  function init() {
    initEvents();
  }

  function initEvents() {

  }
  
  function onLoad() {
    setTimeout(function() {
      girlToMain(app.timer,3);
    }, 500);
    setTimeout(function(){
      page.isFlipReady = true;
    },1000);
  }
  function girlToMain(timer,id) {
    var times = timer / 2 * 1000;
    $('.p'+ id +'-gonglu').addClass('pN-gonglu-active');
    $('.p'+ id +'man').addClass('pNman');
    // $('.p'+ id +'Woman').addClass('pNWoman');
    $('.p'+ id +'-nvshen').addClass('pN-nvshen-active');
    $('.p'+ id +' .girlRun').addClass('active');
    $('.p'+ id +'-yue').addClass('pN-yue');
    $('.p'+ id +'-road').addClass('pN-road-active');
    $('.p'+ id +' .girlRun').animate({
      'left': '100%'
    }, timer * 1000, 'linear', function() {
      app.showPage(6);
      setTimeout(function(){
        $('.p3').remove();
      },100);
    });
    // setTimeout(function(){
    //   $('.p'+ id +'-text1').removeClass('pN-textAni');
    // },1000);
  }
  function onLeave() {
    page.isFlipReady = false;
  }

  return page;
})();
