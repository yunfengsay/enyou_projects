(function ($) {

  "use strict";

  // PRE loader
  $(window).load(function () {
    $('.preloader').fadeOut(500); // set duration in brackets    
  });
  $.ajax({
    url: "http://localhost:8001/articals",
    type: "get",
    dataType: 'json',
    success: function(data){
      console.log(data)
      var $ul = $("#articals ul")
      for(var i=0;i<data.data.length;i++){
        var v = data.data[i]
        $ul.append("<li><a target='_blank' href="+ v.url +">"+v.title+"</a></li>")
        
      }
    },
    error: function(){
      console.log("articals 请求错误")
    }
  })

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
    complete: function () { },
  });
  // WOW Animation js
  new WOW({ mobile: false }).init();

})(jQuery);

$(document).ready(function () {

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
    });
  })(jQuery);
  var center = [116.50922, 39.929841]
  mapboxgl.accessToken = 'pk.eyJ1IjoieXVuZmVuZ3NheSIsImEiOiJjajY2MTZqMmUxMXNjMnpuenNobzE1cTZ5In0.ODOEoaKH49HyhFEsTT4UGw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: center,
    zoom: 2
  });
  var popup = new mapboxgl.Popup()
    .setText('恩友北京');

  // create DOM element for the marker
  var el = document.createElement('div');
  el.id = 'marker';

  // create the marker
  new mapboxgl.Marker(el)
    .setLngLat(center)
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);
    map.on('style.load', function() {
  map.setLayoutProperty('country-label-lg', 'text-field', '{name_zh}');
  });

  $(".unslider-arrow.next").html(">")
  $(".unslider-arrow.prev").html("<")
});