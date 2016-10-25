// JavaScript Document
$(document).ready(function() {

  fun();
  var key = 0;
  var page = 0;
  var timer = null;
  $(".shouye").removeClass("current");
  $(window).mousewheel(function(event, delta) {

    clearInterval(timer);
    timer = setTimeout(scrollS, 1000)

    function scrollS() {
      key -= delta;
      if (key < 0) {
        key = 0;
      } else if (key > 5) {
        key = 5;
      }
      console.log(-key * 100 + "%")
      $(".big").animate({ "top": 0 * 100 + "%" }, 100)
      fun();
      page = key;
    }

  });

  function fun() {
    $(".box").eq(page).addClass("current")
    $(".box").eq(key).removeClass("current")

  }
  var r = 0;
  $(".erji").eq(1).click(function(event) {
    $(".yuan_box").fadeIn(1000)
    $(".page_img1").addClass('current');
    $(".erji").fadeOut();
    $(".qiye").fadeIn(1000).removeClass('current');
    $(".sy").fadeOut(1000).addClass("current");
    $(".lanse,.lvse,.yellowse").css('transform', 'translate(0,150px)')
  });
  $(".home a").click(function(event) {
    $(".erji").fadeIn();
    $(".page_img1").removeClass('current');
    $(".yuan_box").fadeOut(1000)
    $(".zuopin_fj").children().fadeOut(1000).addClass('current');
    $(".sy").fadeIn().removeClass("current");
    $(".shouye").fadeIn().siblings().hide();
  });
  $(".erji").eq(2).click(function(event) {
    $(".jineng").fadeIn().addClass('current').siblings().fadeOut().addClass('current');
    $(".lanse,.lvse,.yellowse").css('transform', 'translate(0,0)')
  });
  $(".erji").eq(0).click(function(event) {
    $(".shouye").fadeIn().removeClass("current").siblings().fadeOut().addClass('current')
    $(".lanse,.lvse,.yellowse").css('transform', 'translate(0,150px)')
  });
  $(".erji").eq(3).click(function(event) {
    $(".about").fadeIn().removeClass('current').siblings().fadeOut().addClass('current');
  });
  $(".home").click(function(event) {
    $(".zuopin_fj .zuopin").eq($(this).index()).fadeIn().removeClass('current').siblings().addClass('current')
  });
  var arr = ["首页", "作品", "技能", "关于", "联系我"]
  $(".erji").mouseenter(function(event) {
    $(this).append("<span>" + arr[$(this).index()] + "</span>")
  });
  $(".erji").mouseleave(function(event) {
    $(this).find("span").remove();
  });
  var arr2 = ["企业网页", "电商网站", "手机网站", "h5案例", "平面设计", "返回"]
  $(".home").mouseenter(function(event) {
    $(this).append("<span>" + arr2[$(this).index()] + "</span>")
  });
  $(".home").mouseleave(function(event) {
    $(this).find("span").remove()
  });
  var num = 0;
  setInterval(lunbo, 5000)

  function lunbo() {
    num++;
    $(".page1 .bg-img-ge").eq(num).fadeIn(700).siblings(".bg-img-ge").fadeOut(700);
    num = num % 6;
  }
  $('.nav a').click(function(e) {
    var index = $(this).index('.nav a');
    if (index != ($('.nav a').length - 1)) {
      e.preventDefault();
      clickActionWithIndex(index);
    }
  })

  function clickActionWithIndex(index) {
    // console.log(index)
    // $(".icon_" + (index + 1)).click();
    // $('.fanhui').click();
  }
});
