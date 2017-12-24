function changeHomeBg(event) {
  $("#home").css("background", $(event.target).val());
}
function changeHomeBgImg(event) {
  console.log($(event.target).val());
  $("#home").css({ backgroundImage: $(event.target).val() });
}

(function($) {
  //   $(window).on("scroll",function(){
  //     // console.log(( $("#isIn").offset().top - $(this).scrollTop() ) > $(this).height());
  //     console.log($("#second").offset().top - $(this).scrollTop())
  // });
  var $cwbx = $("#cwbx");
  setInterval(function() {
    if ($cwbx.hasClass("active")) {
      $(".navigation").show();
    } else {
      $(".navigation").hide();
    }
  }, 10);

  ("use strict");
  $("img.lazyload").lazyload({
    effect: "fadeIn"
  });
  $(".js-silder").silder({
    auto: true, //自动播放，传入任何可以转化为true的值都会自动轮播
    speed: 25, //轮播图运动速度
    sideCtrl: true, //是否需要侧边控制按钮
    defaultView: 0, //默认显示的索引
    interval: 3000, //自动轮播的时间，以毫秒为单位，默认3000毫秒
    activeClass: "active" //小的控制按钮激活的样式，不包括作用两边，默认active
  });

  $(".myVideo").each(function() {
    var sourceFile = $(this).attr("data-src");
    $(this).attr("src", sourceFile);
    var video = this.parentElement;
    video.load();
    video.play();
  });
  
  // $("#myVideo2").each(function() {
  //   var sourceFile = $(this).attr("data-src");
  //   $(this).attr("src", sourceFile);
  //   var video = this.parentElement;
  //   video.load();
  //   video.play();
  // });
  // PRE loader
  $(window).load(function() {
    $(".preloader").fadeOut(500); // set duration in brackets
  });
  // $.ajax({
  //   url: "http://localhost:8001/articals",
  //   type: "get",
  //   dataType: 'json',
  //   success: function(data){
  //     console.log(data)
  //     var $ul = $("#articals ul")
  //     for(var i=0;i<data.data.length;i++){
  //       var v = data.data[i]
  //       $ul.append("<li><a target='_blank' href="+ v.url +">"+v.title+"</a></li>")

  //     }
  //   },
  //   error: function(){
  //     console.log("articals 请求错误")
  //   }
  // })

  //Navigation Section
  $(".navbar-collapse a").on("click", function() {
    $(".navbar-collapse").collapse("hide");
  });

  var $controlDoms = $(".navigation a");
  var activeDom = null;

  $(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
    var that = this;
    $controlDoms.each(function(i, v) {
      if (activeDom) {
        activeDom.removeClass("active");
        if ($($(v).attr("href")).offset().top - $(that).scrollTop() < 200) {
          $(v)
            .parent()
            .addClass("active");
          activeDom = $(v).parent();
        }
        activeDom.addClass("active");
      }
    });
  });

  $(".navigation a").bind("click", function(event) {
    var $anchor = $(this);
    activeDom.removeClass("active");
    activeDom = $(event.target).parent();
    activeDom.addClass("active");

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top - 70
        },
        500
      );
    event.preventDefault();
  });
  // Smoothscroll js
  $(function() {
    $(".custom-navbar a, #home a").bind("click", function(event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top
          },
          500
        );
      event.preventDefault();
    });
  });
  $(".slogan-text").textillate({
    selector: ".texts",
    loop: false,
    minDisplayTime: 2000,
    initialDelay: 0,
    autoStart: true,
    in: {
      effect: "flipInY",
      delayScale: 1.5,
      delay: 50,
      callback: function() {}
    },
    out: {
      effect: "hinge",
      delayScale: 1.5,
      delay: 50,
      sync: false,
      shuffle: false,
      reverse: false,
      callback: function() {}
    },
    callback: function() {
      // $('.purpose1').textillate({in:{}})
    },
    // set the type of token to animate (available types: 'char' and 'word')
    type: "word"
  });

  // WOW Animation js
  new WOW({ mobile: false }).init();
})(jQuery);

$(document).ready(function() {
  (function($) {
    $(".tab ul.tabs")
      .addClass("active")
      .find("> li:eq(0)")
      .addClass("current");

    $(".tab ul.tabs li a").click(function(g) {
      var tab = $(this).closest(".tab"),
        index = $(this)
          .closest("li")
          .index();

      tab.find("ul.tabs > li").removeClass("current");
      $(this)
        .closest("li")
        .addClass("current");

      tab
        .find(".tab_content")
        .find("div.tabs_item")
        .not("div.tabs_item:eq(" + index + ")")
        .slideUp();
      tab
        .find(".tab_content")
        .find("div.tabs_item:eq(" + index + ")")
        .slideDown();

      g.preventDefault();
    });
  })(jQuery);
  // $(".tabs_item_upslider").unslider({
  //   arrows: true,
  //   fluid: true,
  //   dots: true,
  //   keys: true,
  //   speed: 500,               //  The speed to animate each slide (in milliseconds)
  //   delay: 3000,              //  The delay between slide animations (in milliseconds)
  //   complete: function () { },
  // });
  // $(".unslider-arrow.next").html(">")
  // $(".unslider-arrow.prev").html("<")
  // setInterval(function(){
  //    $(".unslider-arrow.next").click()
  // }, 5000)
  $("#dowebok").easyFader({
    slideDur: 5000
  });
  $("#dowebok1").easyFader({
    slideDur: 5000
  });
  // $('#dowebok').pbTouchSlider({
  //   slider_Wrap: '#dowebokWrap1'
  // });
  $("#dowebok img").click(function() {
    window.open($(this).data("href"));
  });
  $("a[rel=popover]").popover({
    html: true,
    trigger: "click",
    placement: $(this).data("placement"),
    content: function() {
      return '<img src="' + $(this).data("img") + '" />';
    }
  });
});

jQuery(document).ready(function($) {
  var sliderContainers = $(".cd-slider-wrapper");

  if (sliderContainers.length > 0) initBlockSlider(sliderContainers);

  function initBlockSlider(sliderContainers) {
    sliderContainers.each(function() {
      var sliderContainer = $(this),
        slides = sliderContainer.children(".cd-slider").children("li"),
        sliderPagination = createSliderPagination(sliderContainer);

      sliderPagination.on("click", function(event) {
        event.preventDefault();
        var selected = $(this),
          index = selected.index();
        updateSlider(index, sliderPagination, slides);
      });

      sliderContainer.on("swipeleft", function() {
        var bool = enableSwipe(sliderContainer),
          visibleSlide = sliderContainer.find(".is-visible").last(),
          visibleSlideIndex = visibleSlide.index();
        if (!visibleSlide.is(":last-child") && bool) {
          updateSlider(visibleSlideIndex + 1, sliderPagination, slides);
        }
      });

      sliderContainer.on("swiperight", function() {
        var bool = enableSwipe(sliderContainer),
          visibleSlide = sliderContainer.find(".is-visible").last(),
          visibleSlideIndex = visibleSlide.index();
        if (!visibleSlide.is(":first-child") && bool) {
          updateSlider(visibleSlideIndex - 1, sliderPagination, slides);
        }
      });
    });
  }

  function createSliderPagination(container) {
    var wrapper = $('<ol class="cd-slider-navigation"></ol>');
    container
      .children(".cd-slider")
      .find("li")
      .each(function(index) {
        var dotWrapper =
            index == 0 ? $('<li class="selected"></li>') : $("<li></li>"),
          dot = $('<a href="#0"></a>').appendTo(dotWrapper);
        dotWrapper.appendTo(wrapper);
        var dotText = index + 1 < 10 ? "0" + (index + 1) : index + 1;
        dot.text(dotText);
      });
    wrapper.appendTo(container);
    return wrapper.children("li");
  }

  function updateSlider(n, navigation, slides) {
    navigation
      .removeClass("selected")
      .eq(n)
      .addClass("selected");
    slides
      .eq(n)
      .addClass("is-visible")
      .removeClass("covered")
      .prevAll("li")
      .addClass("is-visible covered")
      .end()
      .nextAll("li")
      .removeClass("is-visible covered");

    //fixes a bug on Firefox with ul.cd-slider-navigation z-index
    navigation
      .parent("ul")
      .addClass("slider-animating")
      .on(
        "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function() {
          $(this).removeClass("slider-animating");
        }
      );
  }

  function enableSwipe(container) {
    return container.parents(".touch").length > 0;
  }
});
