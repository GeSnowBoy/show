app.dialogs = (function() {

  return {
    0: {
      init: function() {
        $('.dialog0').click(function() {
          console.log('dialog0 click');
          $(this).fadeOut(500);
        });
      }
    },
    1: {
      init: function() {
        $('.dialog1-btn-get').click(function() {
          app.showDialog(2);
          return false;
        });
      }
    },
    2: {
      init: function() {
        $('.dialog2-btn-ok').click(function() {
          $('.dialog2').fadeOut(500);
          return false;
          // 阻止事件冒泡
        });
        $('.dialog2').click(function() {
          $(this).fadeOut(500);
        });
      }
    }
  };

})();
