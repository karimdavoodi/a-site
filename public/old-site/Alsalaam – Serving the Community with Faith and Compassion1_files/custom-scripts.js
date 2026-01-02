jQuery(document).ready(function ($) {
  'use strict';

  //===== Width =====//
  var width = window.innerWidth;

  //===== Wow Animation Setting =====//
  if ($(".wow").length > 0) {
    var wow = new WOW({
      boxClass:     'wow',      // default
      animateClass: 'animated', // default
      offset:       0,          // default
      mobile:       true,       // default
      live:         true        // default
    }); 

    wow.init();
  }

  //===== Side Menu =====//
  $('.rspn-mnu-btn').on('click', function () {
    $('.rsnp-mnu').addClass('slidein');
    return false;
  });
  $('.rspn-mnu-cls').on('click', function () {
    $('.rsnp-mnu').removeClass('slidein');
  });
  $('.rsnp-mnu li.menu-item-has-children > a').on('click', function () {
    $(this).parent().siblings('li').children('ul').slideUp();
    $(this).parent().siblings('li').removeClass('active');
    $(this).parent().children('ul').slideToggle();
    $(this).parent().toggleClass('active');
    return false;
  });

  //===== Select =====//
  if ($('.slc-wrp > select').length > 0) {
    $('.slc-wrp > select').selectpicker();
  }

  //===== Touchspin =====//
  if ($('.qty').length > 0) {
    $('.qty').TouchSpin();
  } 

  //===== Counter Up =====//
  if ($.isFunction($.fn.counterUp)) {
    $('.counter').counterUp({
      delay: 10,
      time: 2000
    });
  }

  //===== Audio Player =====//
  if ($.isFunction($.fn.musicPlayer)) {
    $(".plyr").musicPlayer({
      elements: ['artwork', 'information', 'controls', 'progress', 'time', 'volume'], // ==> This will display in  the order it is inserted
    });
  }
 
  //===== LightBox =====//
  if ($.isFunction($.fn.fancybox)) {
    $('[data-fancybox],[data-fancybox="gallery"]').fancybox({});
  }

  //===== Scrollbar =====//
  if ($('.rsnp-mnu').length > 0) {
    var ps = new PerfectScrollbar('.rsnp-mnu');
  }
  
  if(width < 851) {
    
    //===== Responsive Carousel =====//
    if ($.isFunction($.fn.slick)) {
      $('.res-caro').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        centerPadding: '0',
        focusOnSelect: true,
        responsive: [
        {
          breakpoint: 851,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
          }
        },
        {
          breakpoint: 771,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            centerMode: true,
            arrows: false,
            dots: false,
          }
        }
        ]
      });

      $('.res-caro2').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        centerPadding: '0',
        focusOnSelect: true,
        responsive: [
        {
          breakpoint: 851,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
          }
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            centerMode: true,
            arrows: false,
            dots: false,
          }
        }
        ]
      });
    }
  }

  //===== Slick Carousel =====//
  if ($.isFunction($.fn.slick)) {
	  

    //=== Featured Area Carousel ===//
	$(window).on('load', function() {
		$('.feat-caro').slick({
		  arrows: false,
		  initialSlide: 0,
		  infinite: true,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  fade: true,
		  autoplay: false,
		  autoplaySpeed: 6000,
		  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
		 speed: 1500,
		  draggable: true,
		  dots: true,
		  pauseOnDotsHover: true,
		  pauseOnFocus: false,
		  pauseOnHover: false,
		  prevArrow:"<button type='button' class='slick-prev'><i class='fas fa-chevron-right'></i></button>",
		  nextArrow:"<button type='button' class='slick-next'><i class='fas fa-chevron-left'></i></button>",
		  responsive: [
		  {
			breakpoint: 981,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
			}
		  },
		  {
			breakpoint: 851,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
			}
		  },
		  {
			breakpoint: 770,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
			}
		  },
		  {
			breakpoint: 576,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
			}
		  }
		  ]
		});
    });

    //=== Featured Area Carousel 2 ===//
    $('.feat-caro2').slick({
      arrows: false,
      initialSlide: 0,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      autoplay: false,
      autoplaySpeed: 6000,
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
      speed: 1500,
      draggable: true,
      dots: true,
      pauseOnDotsHover: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      prevArrow:"<button type='button' class='slick-prev'><i class='fas fa-chevron-right'></i></button>",
      nextArrow:"<button type='button' class='slick-next'><i class='fas fa-chevron-left'></i></button>",
      responsive: [
      {
        breakpoint: 981,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 851,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      ]
    });

    //=== Products Carousel ===//
    $('.prod-caro').slick({
      arrows: true,
      initialSlide: 0,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      autoplay: false,
      autoplaySpeed: 5000,
      speed: 1000,
      draggable: true,
      dots: false,
      pauseOnDotsHover: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      prevArrow:"<button type='button' class='slick-prev'><i class='fas fa-chevron-right'></i></button>",
      nextArrow:"<button type='button' class='slick-next'><i class='fas fa-chevron-left'></i></button>",
      responsive: [
      {
        breakpoint: 981,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 851,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      ]
    });

    //====== Services Carousel =====//
    $('.serv-caro').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      centerPadding: '0',
      focusOnSelect: true,
      vertical: false,
      prevArrow:"<button type='button' class='slick-prev'><i class='fas fa-chevron-right'></i></button>",
      nextArrow:"<button type='button' class='slick-next'><i class='fas fa-chevron-left'></i></button>",
      responsive: [
      {
        breakpoint: 1605,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1370,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1210,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 851,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      ]
    });

    //====== Event Carousel =====//
    $('.event-caro').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      centerPadding: '0',
      focusOnSelect: true,
      vertical: true,
      prevArrow:"<button type='button' class='slick-prev'><i class='fas fa-chevron-up'></i></button>",
      nextArrow:"<button type='button' class='slick-next'><i class='fas fa-chevron-down'></i></button>",
      responsive: [
      {
        breakpoint: 981,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: true,
          dots: false,
          arrows: true
        }
      },
      {
        breakpoint: 851,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: true,
          dots: false,
          arrows: true
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: true,
          dots: false,
          arrows: true
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: false,
          dots: true,
          arrows: false
        }
      }
      ]
    });

    //====== Course Carousel =====//
    $('.course-caro').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      centerPadding: '0',
      focusOnSelect: true,
      vertical: false,
      prevArrow:"<button type='button' class='slick-prev'><i class='fas fa-chevron-right'></i></button>",
      nextArrow:"<button type='button' class='slick-next'><i class='fas fa-chevron-left'></i></button>",
      responsive: [
      {
        breakpoint: 1605,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1370,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1210,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 851,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      ]
    });

    //====== Team Carousel 2 =====//
    $('.team-caro2').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      centerPadding: '0',
      focusOnSelect: true,
      vertical: false,
      prevArrow:"<button type='button' class='slick-prev'><i class='fas fa-chevron-right'></i></button>",
      nextArrow:"<button type='button' class='slick-next'><i class='fas fa-chevron-left'></i></button>",
      responsive: [
      {
        breakpoint: 1605,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          arrows: true,
        }
      },
      {
        breakpoint: 1370,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          arrows: true,
        }
      },
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          arrows: true,
        }
      },
      {
        breakpoint: 981,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          arrows: true,
        }
      },
      {
        breakpoint: 851,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        }
      }
      ]
    });

    //===== Shop Detail Carousel =====//
    $('.shop-detail-caro').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      // slide: 'li',
      fade: false,
      asNavFor: '.shop-detail-nav-caro'
    });

    $('.shop-detail-nav-caro').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.shop-detail-caro',
      dots: false,
      arrows: true,
      // slide: 'li',
      centerMode: false,
      vertical: true,
      centerPadding: '0px',
      focusOnSelect: true,
      prevArrow:"<button type='button' class='slick-prev'><i class='fas fa-chevron-up'></i></button>",
      nextArrow:"<button type='button' class='slick-next'><i class='fas fa-chevron-down'></i></button>",
      responsive: [{
      breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
      breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          vertical: false,
        }
      },
      {
      breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false
        }
      }]
    });

    //====== Post Carousel =====//
    $('.post-caro').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      centerPadding: '0',
      focusOnSelect: true,
      vertical: false,
      prevArrow:"<button type='button' class='slick-prev'><i class='flaticon-arrow-pointing-to-left'></i></button>",
      nextArrow:"<button type='button' class='slick-next'><i class='flaticon-arrow-pointing-to-right'></i></button>",
      responsive: [
      {
        breakpoint: 1605,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true
        }
      },
      {
        breakpoint: 981,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true
        }
      },
      {
        breakpoint: 851,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false
        }
      }
      ]
    });

  }

}); //===== Document Ready Ends =====//

//===== Window Load =====//
jQuery(window).on('load',function ($) {
  'use strict';
  
  jQuery("#preloader").fadeOut(300);

});

//===== Sticky Header =====//
jQuery(window).on('scroll',function ($) {
  'use strict';

  var menu_height = jQuery('header').innerHeight();
  var scroll = jQuery(window).scrollTop();
  if (scroll >= menu_height) {
    jQuery('body').addClass('sticky');
  } else {
    jQuery('body').removeClass('sticky');
  }

});//===== Window onScroll Ends =====//