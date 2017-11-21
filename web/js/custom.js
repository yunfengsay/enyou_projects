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
  $(".tabs_item_upslider").unslider({
    arrows: true,
    fluid: true,
    dots: true,
    keys: true, 
    speed: 500,               //  The speed to animate each slide (in milliseconds)
    delay: 3000,              //  The delay between slide animations (in milliseconds)
    complete: function() {},
  });
  // WOW Animation js
  new WOW({ mobile: true }).init();

})(jQuery);

$(document).ready(function() { 
  
    (function ($) { 
      $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
      
      $('.tab ul.tabs li a').click(function (g) { 
        var tab = $(this).closest('.tab'), 
          index = $(this).closest('li').index();
        
        tab.find('ul.tabs > li').removeClass('current');
        $(this).closest('li').addClass('current');
        
        tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
        tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
        
        g.preventDefault();
      } );
    })(jQuery);
  
  });