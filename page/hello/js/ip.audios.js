app.audios = (function() {
  var ROOT = app.root;

  function myAudio(src, loop) {
    var audio = new Audio();
    audio.src = ROOT + src;
    audio.volume = 1;
    audio.autoplay = false;
    audio.loop = true;
    if (loop != 1) {
      audio.loop = false;
    }
    audio.addEventListener('ended', continueBgm);
    return audio;
  }

  function continueBgm(event) {
    if (app.bgm && (!$('#icon-bgm').hasClass('tag-music-off'))) {
      // app.bgm.pause();
      app.bgm.play();
    }
  }

  aClick = new myAudio('media/click.mp3');

  function initAudios() {
    // $.each(app.audios, function(key, value) {
    //   console.log("Key: " + key + ", Value: ");
    //   // app.audios.aCrow.play();
    // });
  }

  return {
    init: initAudios,
    aClick: aClick,
  };
})();
