app.bgm = (function() {
  var ROOT = app.root;
  var opt = {
    'hasIcon': 'true',
    'audio': '',
    'iOn': 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAbFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8+T+BWAAAAI3RSTlMAETws8TgF6uKn9tK1liAY187DhmkK325TTUbHvK2fjncyWvMShscAAAFYSURBVFjD7dfJcoMwEEXRFiABwjaDAc9T3v//Y1ykiORt+i2y0F3B5pQohKqRVCr13zKW621hyd6J6u1xIHt3qvdERfaQMb0DsGF6IwBL9nrH877wbk/2iHv6tHjesrwzlsqc5nHBDCv4onh2sUoAhWV4OVC3ImacUbwo3kWWphsqo/d2qOUnd0VN8MJx0BaEo8YET564ELxruC70R82EIdzcsRVt8TMe0ai9mNjBO61XxEvyaNXeLKEKudarKgl1BK/88HZarytiHE7rNbHnK9HWI/5YbmpviLwMI8GbwvDhW7W3gZG1+ipMz5UnvVeHLZf1QvW2GcG7/35i04Mz4K9eNqmg9nw8W/P2Xuvr0Ghjg6WuY8zPZkBI77UNonL16j44GP2WiyspI1+o1no3fHTUeh5xs1Nyjrw8mRH1YPzyhvaiz/SrtrHCyB2GAr5/5JJKpVJ/6BsLSCpoiNaQXgAAAABJRU5ErkJggg==',
    'iOff': 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAflBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////vroaSAAAAKXRSTlMAeOUVGnXhHtxz3hH4IQQr0reolzfrUDzxw49q18qHMQ0IsJ9YDGRJQi33bi0AAAILSURBVFjD7ZbbsqIwEEUbwkVJQAREBO/Ouez//8HBVM4Qhnmhw9MU64myylVttXs3tLKy8r/TolrUV6Je1HdFt7DvtajPQ7SwD0di8yHpL7bAnq1L262gMR3A/sfIEpswoBGfAPKM57uHCXwvGH37F3quxCPwfGy2YuJDzRWGG/heTAO19qnKYcIotCb8guawYwpjL0JiTfgNI7wxhSKM4A8THuEqjEdLqdDjHwA0FXfC7XspAWl2QNE/ys8Ezc1hKclWGN+FNI8nIsn+yQkiL9WPKMyH2V4/shCeb5YSD3UgGn7VpL1QZ1la9RLiQlyEyfIdp6EvGv5xykyWH5aPXihJw89yiotdDjnxETrLtiKGyohP+s6yOtOAQkAafpZxsBQ+TM84ZFlZBXvWPqcJlS7YpXwUHIDoz4QRHuTIWZksv1ERuXLBULAST2ffCalOSqDLulvA9xChKdhOCWffHvfsp2CLPS3gk+/G1lk+1O6+AvFPwZY5LeMzBduUsbvvhd1wlz33fZTGR0Fp7jIT8V1/VbL3mbNrlsL8yV0OzeaM4+hliTWhOGHgOHpZisJ4vi6Hxc4+AZyl3HPYyNEJYCylgI3/r7s8R3fEiGJ6l5PwY4bviRH15KZs0M7xKdgk2fSmtOkMXTYZbyKUNIcEFi05c8XAldyRFxj2FS1B1p0aqLy90crKygqD34kwQDsg5OkCAAAAAElFTkSuQmCC',
    'src': ROOT + 'media/bgm.mp3'
  };

  var audio;
  var $mIcon = $('<img id="icon-bgm">');

  function initIcon() {
    if (!opt.hasIcon) {
      opt.iOn = '';
      opt.iOff = '';
      return false;
    }
    $mIcon.css({
      'position': 'fixed',
      'right': '10px',
      'top': '10px',
      'width': '40px',
      'height': '40px',
      'z-index': '1999'
    });
    $mIcon.on('click', function() {
      if (audio.paused) {
        playBgm();
      } else {
        pauseBgm();
      }
    });

    $mIcon.appendTo($('body'));

  }

  function playBgm() {
    audio.play();
    $mIcon[0].src = opt.iOn;
    $mIcon.removeClass('tag-music-off');
    $mIcon.addClass('tag-music-on');
  }

  function pauseBgm() {
    audio.pause();
    $mIcon[0].src = opt.iOff;
    $mIcon.removeClass('tag-music-on');
    $mIcon.addClass('tag-music-off');
  }

  function initAudio() {

    audio = opt.audio || new Audio();
    audio.volume = 1;
    audio.loop = true;
    audio.autoPlay = false;
    audio.src = opt.src;

    $('.p0,.p1,.dialog0').one("touchend", function() {
      if ($mIcon.hasClass('tag-music-on')) {
        playBgm();
      }
    });
    pauseBgm();
  }

  function init(options) {
    opt = $.extend(opt, options);
    initIcon();
    initAudio();
  }

  function change(src) {
    var state = audio.paused;
    src = ROOT + src;
    pauseBgm();
    audio.src = src;
    if (!state) {
      playBgm();
    }
  }
  return {
    audio: audio,
    init: init,
    change: change,
    play: playBgm,
    pause: pauseBgm
  };

}());
