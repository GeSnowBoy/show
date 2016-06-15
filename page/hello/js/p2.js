app.pages[2] = (function() {

  var page = {
    init: init,
    onLoad: onLoad,
    onLeave: onLeave,
    dependingTask: 'p2',
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
      girlToMain(app.timer, 2);
    }, 1000);
    setTimeout(function() {
      page.isFlipReady = true;
    }, 500);
  }

  function girlToMain(timer, id) {
    var times = timer / timer * 2000;
    $('.p' + id + '-gonglu-wai , .p' + id + '-caoyuan').addClass('pN-gonglu-active');
    $('.p' + id + '-gonglu-nei').addClass('pNbg-active');
    $('.p' + id + ' .girlRun').addClass('active');
    // $('.p'+ id +'-caoyuan').addClass('pN-gonglu-active');

    $('.p' + id + ' .girlRun').animate({
      'left': '15%',
      'top': '60%'
    }, timer * 1000 * 0.15, 'linear', function() {
      $('.p' + id + ' .girlRun').animate({
        'left': '45%',
        'top': '60%'
      }, timer * 1000 * 0.25, 'linear', function() {
        $('.p' + id + ' .girlRun').animate({
          'left': '60%',
          'top': '70%'
        }, timer * 1000 * 0.15, 'linear', function() {
          $('.p' + id + ' .girlRun').animate({
            'left': '100%',
            'top': '55%'
          }, timer * 1000 * 0.45, 'linear', function() {
            app.showPage(3);
            setTimeout(function() {
              $('.p2').remove();
            }, 100);
          });
        });
      });
    });
    // setTimeout(function(){
    //   $('.p'+ id +'-text2').removeClass('pN-textAni');
    // },1000);
    setTimeout(function() {
      // $('.p'+ id +'-man').addClass('p2-manAni');
      $('.p' + id + '-man').css({ "top": "20%" });
    }, times);
  }

  function onLeave() {
    page.isFlipReady = false;
  }

  return page;
})();
