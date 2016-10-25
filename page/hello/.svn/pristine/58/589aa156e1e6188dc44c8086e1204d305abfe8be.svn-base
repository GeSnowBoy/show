/**
 * 微信分享工具库
 *
 * 依赖:
 * 1. http://res.wx.qq.com/open/js/jweixin-1.0.0.js
 * 2. jquery或zepto
 */
window.wxshare = (function() {
  var opts = {
    title: '微信分享标题',
    desc: '微信分享描述',
    link: '微信分享链接',
    imgUrl: '微信分享图片',
    timelineText: null,
    timelineLink: null,
    timelineImgUrl: null,
    friendTitle: null,
    friendDesc: null,
    friendLink: null,
    friendImgUrl: null,
    onSuccess: null,
    onCancel: null
  };
  var isReady = false;

  function config(optsArg) {
    $.extend(opts, optsArg);
    // console.log('[config] optsArg:', optsArg, ', opts:', opts);

    if (!isReady) {
      getSign();
      return;
    }

    if (!window.wx) return;
    var wx = window.wx;

    wx.onMenuShareTimeline({
      title: opts.timelineText || opts.desc,
      link: opts.timelineLink || opts.link,
      imgUrl: opts.timelineImgUrl || opts.imgUrl,
      success: function() {
        window._hmt && window._hmt.push(['_trackEvent', 'wxshare', 'Timeline', '分享到朋友圈成功']);
        if (opts.onSuccess) {
          opts.onSuccess();
        }
      },
      cancel: function() {
        window._hmt && window._hmt.push(['_trackEvent', 'wxshare', 'Timeline', '分享到朋友圈取消']);
        if (opts.onCancel) {
          opts.onCancel();
        }
      }
    });

    wx.onMenuShareAppMessage({
      title: opts.friendTitle || opts.title,
      desc: opts.friendDesc || opts.desc,
      link: opts.friendLink || opts.link,
      imgUrl: opts.friendImgUrl || opts.imgUrl,
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function() {
        window._hmt && window._hmt.push(['_trackEvent', 'wxshare', 'AppMessage', '分享给好友成功']);
        if (opts.onSuccess) {
          opts.onSuccess();
        }
      },
      cancel: function() {
        window._hmt && window._hmt.push(['_trackEvent', 'wxshare', 'AppMessage', '分享给好友取消']);
        if (opts.onCancel) {
          opts.onCancel();
        }
      }
    });

    wx.onMenuShareQQ(opts);
    wx.onMenuShareWeibo(opts);
    wx.onMenuShareQZone(opts);
  }

  function getSign() {
    var me = this;
    if (me.success) return;
    if (me.running) return;
    me.running = true;

    var url = location.href.split('#')[0];
    url = encodeURIComponent(url);

    $.ajax({
      url: 'http://bdaladdin.duapp.com/wxshare/api/',
      data: {
        url: url
      },
      dataType: 'jsonp',
      success: function(data) {

        if (data.status != 'ok') {
          return;
        }

        if (!window.wx) return;
        var wx = window.wx;

        // console.log('[getSign]', data);
        var debug = (window.location.search.indexOf('__wxdebug__=1') !== -1);
        wx.config({
          debug: debug,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
          ]
        });
        wx.ready(function() {
          isReady = true;
          config(opts);
        });
        me.success = true;
      },
      complete: function() {
        me.running = false;
      }
    });
  }

  return {
    config: config
  };

})();
