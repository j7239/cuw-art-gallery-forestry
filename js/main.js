(function ($) {
    "use strict";
    /* 
       Global Function
       ========================================================================== */
    function onWindowResize(f) {
        $(window).on('resize', function () {
            f
        });
    }
    /* 
       CounterUp
       ========================================================================== */
    $('.counter').counterUp({
        time: 500
    });
    /* 
    Owl Carousel
    ========================================================================== */
    var owl = ''
    if ($('.owl-carousel.portfolio-carousel').length) {
    owl = $('.owl-carousel')
        owl.owlCarousel({
            items: 1
            , lazyLoad: true
            , loop: true
            , nav: true
            , autoHeight: true
            , dots: false
        });
    }
    if ($('.owl-carousel.artists-carousel').length) {
    owl = $('.owl-carousel')
        owl.owlCarousel({
            items: 3
            , margin: 15
            , lazyLoad: true
            , loop: false
            , nav: true
            , autoHeight: true
            , dots: false
        });
    }
    /* 
       Portfolio - MixitUp
       ========================================================================== */
    $('#portfolio').mixItUp();
    $('a.filter').on('click', function (event) {
        event.preventDefault();
    });
    $('a.filter.tag').on('click', function (event) {
        event.preventDefault();
        var filter = $(this).attr('data-filter');
        $(this).parents('#portfolios').find('.controls .filter[data-filter="' + filter + '"]').addClass('active');
    });

    function filterItems(e) {
        var searched = e
        var searchElems = $('.mix')
        searchElems.removeClass('search-match');
        searchElems.each(function (i) {
            if (~$(this).find('.portfolio-item').attr('data-info').toLowerCase().indexOf(searched)) {
                $(this).addClass('search-match')
            }
            if (!--searchElems.length) {
                $('#portfolio').mixItUp('filter', '.search-match');
            }
        });
        $(this).find('input').val('');
    }
    $("#search-portfolio").submit(function (event) {
        event.preventDefault();
        filterItems($(this).find('input').val().toLowerCase());
    });
    $('#portfolios .dropdown.year .dropdown-item, #portfolios .dropdown.media .dropdown-item').on('click', function (event) {
        event.preventDefault();
        filterItems($(this).text().toLowerCase());
    });

    function resetOwlCurrentImgs() {
        owl.trigger('destroy.owl.carousel');
        owl.html('');
        $('#portfolio .mix:visible').each(function () {
            owl.append('<div class="item"><img class="owl-lazy" data-src="' + $(this).find('.shot-item img').attr('src') + '" alt=""><p>' + $(this).find('.shot-item a').attr('title') + '</p></div>')
        });
        owl.owlCarousel({
            items: 1
            , lazyLoad: true
            , loop: true
            , nav: true
            , autoHeight: true
            , dots: false
        });
    }
    var showMoreMaxH = 0;

    function setShowMore() {
        $('#portfolios .show-less').removeClass('active');
        showMoreMaxH = 0;
        $('#portfolio .more-items').css('max-height', showMoreMaxH);
        var itemCount = $('#portfolio .mix:visible').length;
        if ($('#portfolio .more-items .mix:visible').length > 0) {
            $('#portfolio .first-items .mix:visible').appendTo('#portfolio');
            $('#portfolio .more-items .mix:visible').appendTo('#portfolio');
        }
        else if ($('#portfolio .more-items').length == 0) {
            $('#portfolio').append('<span class="first-items"></span>');
            $('#portfolio').append('<span class="more-items"></span>');
        }
        $('#portfolio .mix:visible').each(function (i) {
            if (++i > 3) {
                $(this).appendTo('#portfolio .more-items');
            }
            else {
                $(this).appendTo('#portfolio .first-items');
            }
        })
        if (itemCount < 4) {
            $('#portfolios .show-more').removeClass('active');
            $('#portfolios .show-less').removeClass('active');
        }
        else {
            $('#portfolios .show-more').addClass('active');
        }
        if ($(window).width() < 768 || $('#portfolio .more-items .mix:visible').length < 3) {
            $("#portfolio .more-items .mix").each(function () {
                showMoreMaxH += $(this).outerHeight();
            });
        }
        else {
            $("#portfolio .more-items .mix").each(function () {
                showMoreMaxH += $(this).outerHeight() / 3;
            });
        }
        resetOwlCurrentImgs();
    }
    $('#portfolios .show-more').on('click', function (event) {
        event.preventDefault();
        $('#portfolios .show-more').removeClass('active');
        $('#portfolio .more-items').css('max-height', showMoreMaxH);
        $('#portfolios .show-more').parents('#portfolios').find('.show-less').addClass('active');
        //$('#portfolios .more-wrap').css('height', $('#portfolio').height());
    });
    $('#portfolios .show-less').on('click', function (event) {
        event.preventDefault();
        $('#portfolios .show-less').removeClass('active');
        $('#portfolios .show-more').addClass('active');
        $('#portfolio .more-items').css('max-height', '0');
        if ($(window).width() < 576) {}
        else {}
    });
    $('#portfolio').on('mixEnd', function (e, state) {
        setShowMore();
    });

    function onWindowResize() {
        $(window).on('resize', function () {;
            setShowMore();
        });
    }
    /*
       Sticky Nav
       ========================================================================== */
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 200) {
            $('.header-top-area').addClass('menu-bg');
        }
        else {
            $('.header-top-area').removeClass('menu-bg');
        }
    });
    /* 
       VIDEO POP-UP
       ========================================================================== */
    $('.video-popup').magnificPopup({
        disableOn: 700
        , type: 'iframe'
        , mainClass: 'mfp-fade'
        , removalDelay: 160
        , preloader: false
        , fixedContentPos: false
    , });
    /* 
       Back Top Link
       ========================================================================== */
    var offset = 200;
    var duration = 500;
    $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(400);
        }
        else {
            $('.back-to-top').fadeOut(400);
        }
    });
    $('.back-to-top').on('click', function (event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 600);
            return false;
        })
        /* 
           One Page Navigation & wow js
           ========================================================================== */
        //Initiat WOW JS
    new WOW().init();
    // one page navigation 
    $('.main-navigation').onePageNav({
        currentClass: 'active'
    });
    $(window).on('load', function () {
        $('body').scrollspy({
            target: '.navbar-collapse'
            , offset: 195
        });
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 200) {
                $('.fixed-top').addClass('menu-bg');
            }
            else {
                $('.fixed-top').removeClass('menu-bg');
            }
        });
    });
    /* Map Form Toggle
      ========================================================*/
    $('.map-icon').on('click', function (e) {
        $('#google-map').toggleClass('panel-show');
        e.preventDefault();
    });
    /* stellar js
      ========================================================*/
    $.stellar({
        horizontalScrolling: false
        , verticalOffset: 40
        , responsive: true
    });
    /* 
       Page Loader
       ========================================================================== */
    $(window).on('load', function () {
        "use strict";
        $('#loader').fadeOut();
    });
    /* 
       Navigation
       ========================================================================== */
    $('header').css('padding-top', $('.navbar').outerHeight());
    $(window).on('resize', function () {
        $('header').css('padding-top', $('.navbar').outerHeight());
    });
    /* 
       Matterport
       ========================================================================== */
    $(window).on('load', function () {
        setTimeout(function () {
            $('.matterport').addClass('loaded');
        }, 5000);
    });
    $('.matterport .btn').on('click', function () {
        $('.matterport').addClass('active');
    });
    $('.matterport .close').on('click', function () {
        $('.matterport').removeClass('active');
    });
    $(document).on('scroll', function () {
        var i = $(document).scrollTop();
        var a = $(window).height() * .25;
        if (i > a) {
            $('.matterport').removeClass('active');
        }
    });
    /* 
       Blog Items
       ========================================================================== */
    function resizeBlog() {
        $('.blog-item').each(function () {
            $(this).find('.blog-item-img').css('height', $(this).width());
        });
    }
    resizeBlog();
    onWindowResize(resizeBlog);
}(jQuery));