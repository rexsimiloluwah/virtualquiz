$(function() {
    "use strict";

    /*-----------------------------------
     * FIXED  MENU - HEADER
     *-----------------------------------*/
    function menuscroll() {
        var $navmenu = $('.nav-menu');
        var $navbar = $('.navbar');
        var $navbarcollapse = $('.navbar-collapse');
        if ($(window).scrollTop() > 50) {
            $navmenu.addClass('is-scrolling');
            $navbar.addClass('is-scrolling');
            $navbarcollapse.addClass('is-scrolling');
        } else {
            $navmenu.removeClass("is-scrolling");
            $navbar.removeClass('is-scrolling');
            $navbarcollapse.removeClass('is-scrolling');
        }
    }
    menuscroll();

    //also at the window load event
    window.addEventListener('scroll', function(e) {

        if( $(window).scrollTop() <= 20) {
            $('.wow').removeClass('animated');
            $('.wow').removeAttr('style');
            new WOW().init();
        }

     });
    $(window).on('scroll', function() {
        menuscroll();
    });

    
    /*-----------------------------------
     * NAVBAR CLOSE ON CLICK
     *-----------------------------------*/

    $('.navbar-nav > li:not(.dropdown) > a').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });
    /* 
     * NAVBAR TOGGLE BG
     *-----------------*/
    var siteNav = $('#navbar');
    siteNav.on('show.bs.collapse', function(e) {
        $(this).parents('.nav-menu').addClass('menu-is-open');
    })
    siteNav.on('hide.bs.collapse', function(e) {
        $(this).parents('.nav-menu').removeClass('menu-is-open');
    })
});

$(document).ready(function () {

    $('.select2').select2();
    $('.select2-selection').css('border-color','rgb(255,99,71)');

    $('.first-button').on('click', function () {
  
      $('.animated-icon1').toggleClass('open');
    });
    
    $('.btn-play').hover(function(){
        $(this).children().css("display", "inline-block")
    }, 
    function(){
        $(this).children().css("display", "none")
    })

    $(".btn-play").click(function(){
        console.log($(this).data("category"));
        localStorage.setItem("category", $(this).data("category"));
    })


    $("#endless-play").click(function(){
        console.log($("#select-category").val())
        sessionStorage.setItem("select-category", $("#select-category").val())
        window.location.assign("/endlesstrivia");
    })

    
  });
