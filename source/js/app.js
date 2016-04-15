$(function () {
    'use strict'
    var is_toggle = false;
    var is_small = false;
    var screen_change = false;

    var screensize = function () {
        if ($(window).width() < 768) {
            screen_change = false;
            if ((!is_small && is_toggle) || !is_toggle) {
                screen_change = true;
            }
            if (screen_change) {
                $("#sidebar-wrapper").removeClass('active');
            }
            is_small = true;
        } else {
            screen_change = false;
            if ((is_small && is_toggle) || !is_toggle) {
                screen_change = true;
            }
            if (screen_change) {
                $("#sidebar-wrapper").addClass('active');
            }
            is_small = false;
        }
    }
    $(window).resize(function () {
        screensize();
    });
    $(document).ready(function () {
        screensize();
    });

    $("#menu-toggle").click(function (e) {
        is_toggle = true;
        $("#sidebar-wrapper").toggleClass('active');
    });

});
