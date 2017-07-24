(function($) {
    "use strict";

    function fix_side_buttons() {
        var menu = jQuery('.floatingmenu');
        var body = jQuery('body');
        menu.removeClass('bottom');
        body.removeClass('bottom-buttons');
        if ((jQuery(window).width() - jQuery('.container:first').outerWidth()) / 2 < menu.outerWidth()) {
            menu.addClass('bottom');
            body.addClass('bottom-buttons');
        }
    }
    fix_side_buttons();
    jQuery(window).resize(fix_side_buttons);
    
    $(window).load(function() {
        $('.status').fadeOut();
        $('.preloader').delay(350).fadeOut('slow');
    });
    jQuery(".navigation  ul li ul").parent("li").addClass("parent-list");
    jQuery(".parent-list").find("a:first").append("");
    if (jQuery(".one-page").length > 0) {
        jQuery(".one-page .navigation").onePageNav({
            currentClass: "current_page_item",
            filter: ":not(.out-button a)",
            changeHash: false,
            scrollSpeed: 750,
            scrollOffset: parseFloat(jQuery("#header").innerHeight()) + 50
        });
    }
    var aboveHeight = jQuery("#header").outerHeight();
    var fixed_enabled = jQuery("#wrap").hasClass("fixed-enabled");
    if (fixed_enabled) {
        jQuery(window).scroll(function() {
            if (jQuery(window).scrollTop() > aboveHeight) {
                jQuery("#header").css({
                    "top": "0"
                }).addClass("fixed-nav");
            } else {
                jQuery("#header").css({
                    "top": "auto"
                }).removeClass("fixed-nav");
            }
        });
    } else {
        jQuery("#header").removeClass("fixed-nav");
    }
    jQuery(window).bind("resize", function() {
        if (jQuery(this).width() > 991) {
            jQuery(".navigation_mobile_main").addClass("navigation");
            jQuery(".navigation").removeClass("navigation_mobile");
            jQuery(".navigation").find(".navigation_mobile_click").remove();
        } else {
            jQuery(".navigation").addClass("navigation_mobile");
            jQuery(".navigation").addClass("navigation_mobile_main");
            jQuery(".navigation_mobile").removeClass("navigation");
            jQuery(".navigation_mobile").each(function() {
                if (!jQuery(this).find(".navigation_mobile_click").length) {
                    jQuery(this).prepend("<div class='navigation_mobile_click'></div>");
                }
            });
        }
    });
    if (jQuery(window).width() > 990) {
        jQuery(".navigation_mobile_main").addClass("navigation");
        jQuery(".navigation").removeClass("navigation_mobile");
        jQuery(".navigation").find(".navigation_mobile_click").remove();
    } else {
        jQuery(".navigation").addClass("navigation_mobile");
        jQuery(".navigation").addClass("navigation_mobile_main");
        jQuery(".navigation_mobile").removeClass("navigation");
        jQuery(".navigation_mobile").each(function() {
            if (!jQuery(this).find(".navigation_mobile_click").length) {
                jQuery(this).prepend("<div class='navigation_mobile_click'></div>");
            }
        });
    }
    if (jQuery(".navigation_mobile_click").length) {
        jQuery(".navigation_mobile_click").click(function() {
            if (jQuery(this).hasClass("navigation_mobile_click_close")) {
                jQuery(this).next().slideUp(500);
                jQuery(this).removeClass("navigation_mobile_click_close");
            } else {
                jQuery(this).next().slideDown(500);
                jQuery(this).addClass("navigation_mobile_click_close");
            }
        });
        jQuery(".navigation_mobile ul li").each(function() {
            var sub_menu = jQuery(this).find("ul:first");
            jQuery(this).hover(function() {
                console.log('test');
                sub_menu.stop().css({
                    overflow: "hidden",
                    height: "auto",
                    display: "none",
                    paddingTop: 0
                }).slideDown(250, function() {
                    jQuery(this).css({
                        overflow: "visible",
                        height: "auto"
                    });
                });
            }, function() {
                sub_menu.stop().slideUp(250, function() {
                    jQuery(this).css({
                        overflow: "hidden",
                        display: "none"
                    });
                });
            });
        });
    }
    jQuery('#menu-main-menu .sub-menu').each(function() {
        var li = jQuery(this).parent();
        li.children('a').on('touchend', function(ev) {
            if (!li.hasClass('hover')) {
                ev.preventDefault();
                li.addClass('hover');
            }
        });
    });
    jQuery('body').on('click', function(ev) {
        if (jQuery(ev.target).parents('#menu-main-menu').length == 0) {
            jQuery('#menu-main-menu .hover').removeClass('hover');
        }
    });
    $('.carousel[data-type="multi"] .item').each(function() {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
        for (var i = 0; i < 4; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
        }
    });
    $(".search-fld").on('click', function() {
        if ($(this).hasClass('minus')) {
            $(this).toggleClass("plus minus");
            $('.search-wrapper-area').fadeOut();
        } else {
            $('.search-wrapper-area').fadeIn();
            $(this).toggleClass("minus plus");
        }
    });
    jQuery.noConflict();
    jQuery(document).ready(function(jQuery) {
        jQuery(document).delegate('*[data-toggle="lightbox"]:not([data-gallery="navigateTo"])', 'click', function(event) {
            event.preventDefault();
            return jQuery(this).ekkoLightbox({
                onShown: function() {},
                onNavigate: function(direction, itemIndex) {
                    if (window.console) {
                        return console.log('Navigating ' + direction + '. Current item: ' + itemIndex);
                    }
                }
            });
        });
    });
    $(document).ready(function() {
        jQuery(".sticky").sticky({
            topSpacing: 0
        });
    });
    $(document).ready(function() {
        $('.panel-collapse').collapse({
            toggle: false
        });
        $('body').on('click', '[data-toggle=collapse-next]', function(e) {
            e.preventDefault();
            var parent_id = $(this).data('parent');
            $(parent_id + ' .panel-collapse').collapse('hide');
            var $target = $(this).parents('.panel').find('.panel-collapse');
            $target.collapse('toggle');
        });
    });
    $('.collapse').on('shown.bs.collapse', function() {
        $(this).parent().find(".plus").removeClass("plus").addClass("minus");
    }).on('hidden.bs.collapse', function() {
        $(this).parent().find(".minus").removeClass("minus").addClass("plus");
    });
    jQuery(".accordion .accordion-title").each(function() {
        jQuery(this).click(function() {
            if (jQuery(this).parent().parent().hasClass("toggle-accordion")) {
                jQuery(this).parent().find("li:first .accordion-title").addClass("active");
                jQuery(this).parent().find("li:first .accordion-title").next(".accordion-inner").addClass("active");
                jQuery(this).toggleClass("active");
                jQuery(this).next(".accordion-inner").slideToggle().toggleClass("active");
                jQuery(this).find("i").toggleClass("fa-minus").toggleClass("fa-plus");
            } else {
                if (jQuery(this).next().is(":hidden")) {
                    jQuery(this).parent().parent().find(".accordion-title").removeClass("active").next().slideUp(200);
                    jQuery(this).parent().parent().find(".accordion-title").next().removeClass("active").slideUp(200);
                    jQuery(this).toggleClass("active").next().slideDown(200);
                    jQuery(this).next(".accordion-inner").toggleClass("active");
                    jQuery(this).parent().parent().find("i").removeClass("fa-plus").addClass("fa-minus");
                    jQuery(this).find("i").removeClass("fa-minus").addClass("fa-plus");
                }
            }
            return false;
        });
    });
    $('.guidespro').find('a[href="#"]').on('click', function(e) {
        e.preventDefault();
        this.expand = !this.expand;
        $(this).text(this.expand ? "read more -" : "read more +");
        $(this).closest('.guidespro').find('.small, .big').toggleClass('small big');
    });
    if (navigator.userAgent.indexOf('Mac') > 0)
        $('body').addClass('mac-os');
    if (jQuery(".tp-banner").length) {
        jQuery('.tp-banner').revolution({
            delay: 5000,
            startwidth: 1170,
            startheight: 532,
            hideThumbs: 200,
            fullWidth: "off",
            fullScreen: "off"
        });
    }
    jQuery(".box-icon-number h5").each(function() {
        jQuery(this).appear(function() {
            var endNum = parseInt(jQuery(this).text());
            jQuery(this).countTo({
                from: 0,
                to: endNum,
                speed: 4000,
                refreshInterval: 60,
            });
        }, {
            accX: 0,
            accY: 0
        });
    });
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 100) {
            jQuery(".go-up").css("right", "20px");
        } else {
            jQuery(".go-up").css("right", "-60px");
        }
    });
    jQuery(".go-up").click(function() {
        jQuery("html,body").animate({
            scrollTop: 0
        }, 500);
        return false;
    });
    if (jQuery(".progressbar-percent").length) {
        jQuery(".progressbar-percent").each(function() {
            var $this = jQuery(this);
            var percent = $this.attr("data-percent");
            $this.bind("inview", function(event, isInView, visiblePartX, visiblePartY) {
                if (isInView) {
                    $this.animate({
                        "width": percent + "%"
                    }, percent * 20);
                }
            });
        });
    }
    $(function() {
        $('.pdlink').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if ($(window).outerWidth() < 1026) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                } else {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 185
                    }, 1000);
                }
                return false;
            }
        });
    });
})(jQuery);