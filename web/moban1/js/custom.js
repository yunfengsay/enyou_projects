(function ($) {

  "use strict";

  // PRE loader
  $(window).load(function () {
    $('.preloader').fadeOut(1000); // set duration in brackets    
  });


  //Navigation Section
  $('.navbar-collapse a').on('click', function () {
    $(".navbar-collapse").collapse('hide');
  });

  $(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
  });


  // Smoothscroll js
  $(function () {
    $('.custom-navbar a, #home a').bind('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 49
      }, 500);
      event.preventDefault();
    });
  });
  $('.slogan-text').textillate({
    selector: '.texts',
    loop: false,
    minDisplayTime: 2000,
    initialDelay: 0,
    autoStart: true,
    in: {
      effect: 'flipInY',
      delayScale: 1.5,
      delay: 50,
      callback: function () { }
    },
    out: {
      effect: 'hinge',
      delayScale: 1.5,
      delay: 50,
      sync: false,
      shuffle: false,
      reverse: false,
      callback: function () { }
    },
    callback: function () { 
      // $('.purpose1').textillate({in:{}})
    },
    // set the type of token to animate (available types: 'char' and 'word')
    type: 'word'
  });

  // WOW Animation js
  new WOW({ mobile: true }).init();

})(jQuery);
