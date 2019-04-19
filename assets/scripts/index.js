let newLineMailto = "%0D%0A";

$(document).ready(function() {
  let mobileScreenWidthBreakpoint = 600;
  let introSlideFrequency = 6000;
  let introSlideInterval = null;

  $('#fullpage').fullpage({
    anchors: ['intro', 'about', 'shopping', 'lookbook', 'lounge', 'brands', 'location'],
    menu: '#menu',
    autoScrolling: false,
    verticalCentered: true,
    fitToSection: false,
    fixedElements: '#header',
  });

  $('#mobileMenuTrigger').click(function() {
    $('#dimOverlay').show();
    $('#menu').slideToggle();
  });

  $('#menu li > a').click(function() {
    if ($('#dimOverlay').is(':visible') === true) {
      $('#dimOverlay').hide();
      $('#menu').slideToggle();
    }
  });

  $('#fullpage').find('.content').css({
    opacity: 0,
  });

  $('#introPage').find('.content').css({
    opacity: 1.0,
  });

  $('#emailSignupPopupDismiss').click(function() {
    dismissEmailSignupPopup();
  });

  $('#mc-embedded-subscribe-form-popup').submit(function() {
    dismissEmailSignupPopup();
  });

  showEmailSignupPopup();
  plyr.setup();

  function changeSlide(pageElement, slideClassname, elementWidth, numberOfSlides, increment) {
    let slideSpeed = 1000;
    let activeSlide = pageElement.find('.' + slideClassname + '.active');
    let slideNumber = +activeSlide.attr('data-slide');
    let nextSlideNumber = mod(slideNumber + increment, numberOfSlides);
    let nextSlide = $('.' + slideClassname + '[data-slide="' +  nextSlideNumber + '"]');

    if (activeSlide.hasClass('animating') || nextSlide.hasClass('animating')) {
      return;
    }

    if (increment > 0) {
      activeSlide
      .stop(true)
      .addClass('animating')
      .removeClass('active')
      .css({
        'right': 'auto',
        'left': '0',
      })
      .animate({ 'left': '-' + elementWidth + 'px' }, slideSpeed, function() {
        $(this).removeClass('animating');
      });

      nextSlide
      .stop(true)
      .addClass('animating')
      .addClass('active')
      .css({
        'right': 'auto',
        'left': elementWidth + 'px',
      })
      .animate({ 'left': '0px' }, slideSpeed, function() {
        $(this).removeClass('animating');
      });
    } else {
      activeSlide
      .stop(true)
      .addClass('animating')
      .removeClass('active')
      .css({
        'left': 'auto',
        'right': '0',
      })
      .animate({ 'right': '-' + elementWidth + 'px' }, slideSpeed, function() {
        $(this).removeClass('animating');
      });

      nextSlide
      .stop(true)
      .addClass('animating')
      .addClass('active')
      .css({
        'left': 'auto',
        'right': elementWidth + 'px',
      })
      .animate({ 'right': '0px' }, slideSpeed, function() {
        $(this).removeClass('animating');
      });
    }
  }

  $(window).scroll(function() {
    let scrollTop = $(window).scrollTop();

    introScroll(scrollTop);
    aboutScroll(scrollTop);
    consultingScroll(scrollTop);
    // storyScroll(scrollTop);
    lookbookScroll(scrollTop);
    brandsScroll(scrollTop);
    loungeScroll(scrollTop);
    locationScroll(scrollTop);
  });

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  function pageScroll(scrollTop, page, callback, elseCallback) {
    let pageOffset = page.offset();
    let pageTop = pageOffset.top;

    let fadeInOffset = $(window).height()/2;
    let callbackOffset = $('#header').height();

    let fadeInTop = pageOffset.top - 250;
    let callbackTop = pageOffset.top - callbackOffset;
    let pageBottom = pageOffset.top + page.height();

    if (scrollTop > fadeInTop && scrollTop < pageBottom) {
      page.find('.content').css({ opacity: 1.0 });
    }

    if (scrollTop > callbackTop && scrollTop < pageBottom) {
      if (callback) {
        callback();
      }
    } else {
      if (elseCallback) {
        elseCallback();
      }
    }
  }

  function introScroll(scrollTop) {
    let page = $('#introPage');
    let pageWidth = $(window).width();

    pageScroll(scrollTop, page,
      function() {
        clearInterval(introSlideInterval);

        let indicator = $('#introIndicator');
        setIndicatorLight();
        indicatorSelect(indicator);
        hideMenuSelection();

        introSlideInterval = setInterval(function() {
          changeSlide(page, "fullscreen-bg", pageWidth, 4, 1);
        }, introSlideFrequency);
      },
      function() {
        clearInterval(introSlideInterval);
      }
    );
  }

  function aboutScroll(scrollTop) {
    let page = $('#aboutPage');

    pageScroll(scrollTop, page,
      function() {
        let anchor = $('#aboutAnchor');
        let indicator = $('#aboutIndicator');
        moveMenuSelection(anchor);
        indicatorSelect(indicator);
        setIndicatorDark();
      }
    );
  }

  // function storyScroll(scrollTop) {
  //   let page = $('#storyPage');

  //   pageScroll(scrollTop, page,
  //     function() {
  //       let anchor = $('#storyAnchor');
  //       let indicator = $('#storyIndicator');
  //       moveMenuSelection(anchor);
  //       indicatorSelect(indicator);
  //       setIndicatorLight();
  //     }
  //   );
  // }

  function lookbookScroll(scrollTop) {
    let page = $('#lookbookPage');
    let padding = 20;

    pageScroll(scrollTop, page,
      function() {
        let anchor = $('#lookbookAnchor');
        let indicator = $('#lookbookIndicator');
        moveMenuSelection(anchor);
        indicatorSelect(indicator);
        setIndicatorLight();

        let lookbookEl;

        if (screen.width > 840) {
          lookbookEl = $('#lookbookFull');
        } else {
          lookbookEl = $('#lookbookMobile');
        }

        let elementWidth = lookbookEl.width() + padding;
        let numberOfSlides = lookbookEl.find(".lookbook-page").length;

        page.find(".gallery-controls-page-left").click(function() {
          changeSlide(lookbookEl, "lookbook-page", elementWidth, numberOfSlides, -1);
        });

        page.find(".gallery-controls-page-right").click(function() {
          changeSlide(lookbookEl, "lookbook-page", elementWidth, numberOfSlides, 1);
        });
      }
    );
  }

  function loungeScroll(scrollTop) {
    let page = $('#loungePage');
    let pageWidth = $(window).width();
    let numberOfPages = 3;

    pageScroll(scrollTop, page,
      function() {
        let anchor = $('#loungeAnchor');
        let indicator = $('#loungeIndicator');
        moveMenuSelection(anchor);
        indicatorSelect(indicator);
        setIndicatorLight();

        let galleryControlsEl = $("#loungeGalleryControls");

        galleryControlsEl.find(".gallery-controls-page-left").click(function() {
          changeSlide(page, "fullscreen-bg", pageWidth, numberOfPages, -1);
        });

        galleryControlsEl.find(".gallery-controls-page-right").click(function() {
          changeSlide(page, "fullscreen-bg", pageWidth, numberOfPages, 1);
        });

        introSlideInterval = setInterval(function() {
          changeSlide(page, "fullscreen-bg", pageWidth, numberOfPages, 1);
        }, introSlideFrequency);
      }
    );
  }

  function brandsScroll(scrollTop) {
    let page = $('#brandsPage');

    pageScroll(scrollTop, page,
      function() {
        let anchor = $('#brandsAnchor');
        let indicator = $('#brandsIndicator');
        moveMenuSelection(anchor);
        indicatorSelect(indicator);
        setIndicatorDark();
      }
    );
  }

  function locationScroll(scrollTop) {
    let page = $('#locationPage');

    pageScroll(scrollTop, page,
      function() {
        let anchor = $('#locationAnchor');
        let indicator = $('#locationIndicator');
        moveMenuSelection(anchor);
        indicatorSelect(indicator);
        setIndicatorDark();
      }
    );
  }

  function consultingScroll(scrollTop) {
    let page = $('#consultingPage');

    pageScroll(scrollTop, page,
      function() {
        let anchor = $('#shoppingAnchor');
        let indicator = $('#shoppingIndicator');
        moveMenuSelection(anchor);
        indicatorSelect(indicator);
        setIndicatorLight();
      }
    );
  }

  function indicatorSelect(element) {
    $("#navigationIndicator").find("li").removeClass("active");
    element.addClass("active");
  }

  function setIndicatorLight() {
    $("#navigationIndicator").removeClass("dark").addClass("light");
  }

  function setIndicatorDark() {
    $("#navigationIndicator").removeClass("light").addClass("dark");
  }

  function moveMenuSelection(anchor) {
    let anchorOffset = anchor.offset();
    let headerOffset = $('#header .content').offset();
    $('#menuSelection')
      .stop(true)
      .fadeIn(300)
      .css('left', (anchorOffset.left - headerOffset.left - 20) + 'px');
  }

  function hideMenuSelection() {
    $('#menuSelection').hide();
  }

  function showEmailSignupPopup() {
    if (getEmailSignupCookieValue() !== "true") {
      $('#dimOverlay').fadeIn(250);
      $('#emailSignupPopup').fadeIn(250);
      hideBackgroundContent();
    }
  }

  function getEmailSignupCookieValue(cookieName) {
    return document.cookie.replace(/(?:(?:^|.*;\s*)hasDismissedEmailSignupPopup\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  }

  function dismissEmailSignupPopup() {
    let expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    document.cookie = "hasDismissedEmailSignupPopup=true; expires=" + expiryDate.toGMTString();
    showBackgroundContent();
    $('#dimOverlay').fadeOut(250);
    $('#emailSignupPopup').fadeOut(250);
  }

  function showBackgroundContent() {
    if (screen.width <= 600) {
      $('#fullpage, #footer').show();
    }
  }

  function hideBackgroundContent() {
    if (screen.width <= 600) {
      $('#fullpage, #footer').hide();
    }
  }
});

$('#bookConsulting').submit(function(e) {
  e.preventDefault();

  let subject = "Emil%20Consulting%20Appointment"
  let name = $('#consultingName').val();
  let associate = $('#consultingAssociate').val();

  if (! associate) {
    associate = "info@emilclothingco.com";
  }

  let body = "Name: " + name + newLineMailto;
  body += "Associate: " + associate + newLineMailto;

  window.location.href = "mailto:" + associate + "?subject=" + subject + "&body=" + body;
});

$('#bookLounge').submit(function(e) {
  e.preventDefault();

  let subject = "Book%20Emil%20Lounge";
  let email = "info@emilclothingco.com";
  let phone = $('#bookLoungePhone').val();
  let name = $('#bookLoungeName').val();
  let details = $('#bookLoungeDetails').val();

  let body = "Name: " + name + newLineMailto;
  body += "Phone: " + phone + newLineMailto + newLineMailto;
  body += details;

  window.location.href = "mailto:" + email + "?subject=" + subject + "&body=" + body;
});

function initMap() {
  var uluru = {
    lat: 49.276663,
    lng: -123.120982
  };

  var map = new google.maps.Map(document.getElementById("googleMap"), {
    zoom: 16,
    center: uluru,
    disableDefaultUI: true,
    styles: [
      {
        "featureType": "administrative",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }, {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      }, {
        "featureType": "road",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      }, {
        "featureType": "water",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      }, {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      }, {
        "featureType": "landscape",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      }, {
        "featureType": "road.highway",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }, {
        "featureType": "road.local",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      }, {
        "featureType": "water",
        "stylers": [
          {
            "color": "#84afa3"
          },
          {
            "lightness": 52
          }
        ]
      }, {
        "stylers": [
          {
            "saturation": -77
          }
        ]
      },{
        "featureType": "road"
      }
    ]
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
