(function() {
  var browser = (function() {
    var ua = navigator.userAgent.toLowerCase();
    var b = {
      ua: ua,
      isAndroid: /Android/i.test(ua),
      isIos: /iPhone|iPad|iPod/i.test(ua),
      isBlackberry: /BlackBerry/i.test(ua),
      isWindowsPhone: /IEMobile/i.test(ua),
    };
    b.isMoblie = b.isAndroid || b.isIos || b.isBlackberry || b.isWindowsPhone;
    b.isPC = !b.isMoblie;
    return b;
  })();
  if (browser.isPC) {
    app.flagForStart = true;
    return;
  }
  var landscapeTip;

  function createLandscapeTip() {
    if (!landscapeTip) {
      landscapeTip = document.createElement('div');
      landscapeTip.style.background = 'black';
      landscapeTip.style.position = 'fixed';
      landscapeTip.style.width = '100%';
      landscapeTip.style.height = '100%';
      landscapeTip.style.left = 0;
      landscapeTip.style.top = 0;
      landscapeTip.style.textAlign = 'center';
      landscapeTip.style.zIndex = 1000000;
      landscapeTip.style.overflow = 'hidden';
      landscapeTip.innerHTML = '<div  style="position: absolute; top: 50%;   left: 50%; -webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)"><img style="height:150px" src="data:image/png;base64,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"/><br><div style="height: 1.6rem; color: white; font-size: 18px; text-align: center;">横屏浏览,体验更佳</div></div>';
      document.body.appendChild(landscapeTip);
    }
  }

  function showLandscapeTip() {
    if (landscapeTip) {
      landscapeTip.style.display = 'block';
    }
  }

  function hideLandscpeTip() {
    if (landscapeTip) {
      landscapeTip.style.display = 'none';
    }
  }

  function updateOrientation() {
    var orientation = window.orientation;
    switch (orientation) {
      case 90:
      case -90:
        orientation = 'landscape';
        app.flagForStart = true;
        hideLandscpeTip();
        break;
      default:
        orientation = 'portrait';
        showLandscapeTip();
        break;
    }
  }

  function initOrientationChange() {
    createLandscapeTip();
    window.addEventListener('orientationchange', updateOrientation, false);
    landscapeTip.addEventListener('touchstart', function(e) {
      e.preventDefault();
    }, false);
    updateOrientation();
    // showLandscapeTip(); // debug
  }
  initOrientationChange();

})();
