app.pages[6] = (function() {
  var page = {
    init: init,
    onLoad: onLoad,
    onLeave: onLeave,
    dependingTask: 'p6',
    isFlipReady: false,
    hasBranch: true,
  };

  function init() {
    initEvents();
  }

  function initEvents() {
  }
  function flower(){
    $("canvas.snow").let_it_snow({
      speed: 2,
      interaction: false,
      size: 10,
      count: 30,
      opacity: 0,
      color: "#ffffff",
      windPower: 0,
      image: 'img/img.png'
    });
  }
  function animationAdd() {
    // $('.p6-wds.text-describe').addClass("active");
    $('.p6-man').addClass("p6man-active");
    $('.p6-tv').removeClass("p6tv-active");
    setTimeout(function(){flower()}, 3000);
  }

  function animationRemove() {
    $('.p6-man').removeClass("p6man-active");
    $('.p6-wds.text-describe').removeClass("active");
    $('.roadP6').removeClass('active');
    $('.p6-bg').removeClass("pNbg-active");
    $('.p6-box').removeClass('p6bg-active');
  }

  function girlToMain(timer) {
    $('.roadP6').addClass('active');
    $('.p6-bg').addClass("pNbg-active");
    $('.p6-box').addClass('p6bg-active');
    $('.p6-tv-box').addClass('p6bg-active');
    $('.p6 .girlRun').animate({
      'left': '100%'
    }, timer * 1000, 'linear', function() {
      app.showPage(5);
      setTimeout(function(){
        $('.p6').remove();
      },800);
    });
  }

  function onLoad() {
    setTimeout(function() {
      girlToMain(app.timer);
    }, 500);
    setTimeout(function() {
      page.isFlipReady = true;
    }, 1000);
    animationAdd();
  }

  function onLeave() {
    page.isFlipReady = false;
    animationRemove();
  }
  return page;
})();
