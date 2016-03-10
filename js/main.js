//NameSpace
var WEBSCRIBE = WEBSCRIBE || {};


$(function() {




    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // global inicialization functions
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    WEBSCRIBE.global = {

        init: function() {
            WEBSCRIBE.global.deviceSize();
            WEBSCRIBE.global.layout();
            WEBSCRIBE.global.animsition();
        },

        // device identification function
        deviceSize: function() {
            var jRes = jRespond([{
                label: 'smallest',
                enter: 0,
                exit: 479
            }, {
                label: 'handheld',
                enter: 480,
                exit: 767
            }, {
                label: 'tablet',
                enter: 768,
                exit: 991
            }, {
                label: 'laptop',
                enter: 992,
                exit: 1199
            }, {
                label: 'desktop',
                enter: 1200,
                exit: 10000
            }]);
            jRes.addFunc([{
                breakpoint: 'desktop',
                enter: function() {
                    $body.addClass('device-lg');
                },
                exit: function() {
                    $body.removeClass('device-lg');
                }
            }, {
                breakpoint: 'laptop',
                enter: function() {
                    $body.addClass('device-md');
                },
                exit: function() {
                    $body.removeClass('device-md');
                }
            }, {
                breakpoint: 'tablet',
                enter: function() {
                    $body.addClass('device-sm');
                },
                exit: function() {
                    $body.removeClass('device-sm');
                }
            }, {
                breakpoint: 'handheld',
                enter: function() {
                    $body.addClass('device-xs');
                },
                exit: function() {
                    $body.removeClass('device-xs');
                }
            }, {
                breakpoint: 'smallest',
                enter: function() {
                    $body.addClass('device-xxs');
                },
                exit: function() {
                    $body.removeClass('device-xxs');
                }
            }]);
        },

        layout: function() {
            var defaultHeaderScheme = 'scheme-default',
                defaultNavbarScheme = 'scheme-default',
                defaultBrandingScheme = 'scheme-default',
                defaultColorScheme = 'default-scheme-color',
                defaultHeaderPosition = 'header-fixed',
                defaultNavbarPosition = 'aside-fixed',
                defaultRightbarVisibility = 'rightbar-hidden',
                defaultAppClasses = 'scheme-default default-scheme-color header-fixed aside-fixed rightbar-hidden';

            $body.addClass(defaultAppClasses);
            $header.addClass(defaultHeaderScheme);
            $branding.addClass(defaultBrandingScheme);
            $sidebar.addClass(defaultNavbarScheme).addClass(defaultNavbarPosition);

            $headerSchemeEl.on('click', function($event) {
                var scheme = $(this).data('scheme');

                $body.removeClass(defaultHeaderScheme).addClass(scheme);
                $header.removeClass(defaultHeaderScheme).addClass(scheme);
                defaultHeaderScheme = scheme;
                $event.stopPropagation();
            });

            $brandingSchemeEl.on('click', function($event) {
                var scheme = $(this).data('scheme');

                $branding.removeClass(defaultBrandingScheme).addClass(scheme);
                defaultBrandingScheme = scheme;
                $event.stopPropagation();
            });

            $sidebarSchemeEl.on('click', function($event) {
                var scheme = $(this).data('scheme');

                $body.removeClass(defaultNavbarScheme).addClass(scheme);
                $sidebar.removeClass(defaultNavbarScheme).addClass(scheme);
                defaultNavbarScheme = scheme;
                $event.stopPropagation();
            });

            $colorSchemeEl.on('click', function($event) {
                var scheme = $(this).data('scheme');

                $body.removeClass(defaultColorScheme).addClass(scheme);
                defaultColorScheme = scheme;
                $event.stopPropagation();
            });

            $fixedHeaderEl.change(function() {
                if ($body.hasClass('header-fixed')) {
                    $body.removeClass('header-fixed').addClass('header-static');
                } else {
                    $body.removeClass('header-static').addClass('header-fixed');
                }
            });
            $fixedHeaderEl.parent().on('click', function($event) {
                $event.stopPropagation();
            });

            $fixedAsideEl.change(function() {
                if ($body.hasClass('aside-fixed')) {
                    $body.removeClass('aside-fixed').addClass('aside-static');
                    $sidebar.removeClass('aside-fixed').addClass('aside-static');
                } else {
                    $body.removeClass('aside-static').addClass('aside-fixed');
                    $sidebar.removeClass('aside-static').addClass('aside-fixed');
                }
            });
            $fixedAsideEl.parent().on('click', function($event) {
                $event.stopPropagation();
            });

            $toggleRightbarEl.on('click', function() {
                if ($body.hasClass('rightbar-hidden')) {
                    $body.removeClass('rightbar-hidden').addClass('rightbar-show');
                } else {
                    $body.removeClass('rightbar-show').addClass('rightbar-hidden');
                }
            });

            if ($app.hasClass('boxed-layout')) {
                $app.parent().addClass('boxed-layout');
            }

            if ($app.hasClass('sidebar-offcanvas')) {
                $app.parent().addClass('sidebar-offcanvas');
            }

            if ($app.hasClass('hz-menu')) {
                $app.parent().addClass('hz-menu');
            }

            if ($app.hasClass('rtl')) {
                $app.parent().addClass('rtl');
            }

        },

        // initialize animsition
        animsition: function() {
            $wrap.animsition({
                inClass: 'fade-in',
                outClass: 'fade-out',
                inDuration: 1500,
                outDuration: 800,
                linkElement: '.animsition-link',
                // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
                loading: true,
                loadingParentElement: 'body', //animsition wrapper element
                loadingClass: 'animsition-loading',
                unSupportCss: ['animation-duration',
                    '-webkit-animation-duration',
                    '-o-animation-duration'
                ],
                //"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
                //The default setting is to disable the "animsition" in a browser that does not support "animation-duration".

                overlay: false,
                overlayClass: 'animsition-overlay-slide',
                overlayParentElement: 'body'
            });
        }

    };






    //!!!!!!!!!!!!!!!!!!!!!!!!!
    // header section functions
    //!!!!!!!!!!!!!!!!!!!!!!!!!

    WEBSCRIBE.header = {

        init: function() {

        }


    };






    //!!!!!!!!!!!!!!!!!!!!!!!!!
    // navbar section functions
    //!!!!!!!!!!!!!!!!!!!!!!!!!

    WEBSCRIBE.navbar = {

        init: function() {
            WEBSCRIBE.navbar.menu();
            WEBSCRIBE.navbar.ripple();
            WEBSCRIBE.navbar.removeRipple();
            WEBSCRIBE.navbar.collapse();
            WEBSCRIBE.navbar.offcanvas();
        },

        menu: function() {
            if ($dropdowns.length > 0) {

                $dropdowns.addClass('dropdown');

                var $submenus = $dropdowns.find('ul >.dropdown');
                $submenus.addClass('submenu');

                $a.append('<i class="fa fa-plus"></i>');

                $a.on('click', function(event) {
                    if ($app.hasClass('sidebar-xs') || $app.hasClass('hz-menu')) {
                        return false;
                    }

                    var $this = $(this),
                        $parent = $this.parent('li'),
                        $openSubmenu = $('.submenu.open');

                    if (!$parent.hasClass('submenu')) {
                        $dropdowns.not($parent).removeClass('open').find('ul').slideUp();
                    }

                    $openSubmenu.not($this.parents('.submenu')).removeClass('open').find('ul').slideUp();
                    $parent.toggleClass('open').find('>ul').stop().slideToggle();
                    event.preventDefault();
                });

                $dropdowns.on('mouseenter', function() {
                    $sidebar.addClass('dropdown-open');
                    $controls.addClass('dropdown-open');
                });

                $dropdowns.on('mouseleave', function() {
                    $sidebar.removeClass('dropdown-open');
                    $controls.removeClass('dropdown-open');
                });

                $notDropdownsLinks.on('click', function() {
                    $dropdowns.removeClass('open').find('ul').slideUp();
                });

                var $activeDropdown = $('.dropdown>ul>.active').parent();

                $activeDropdown.css('display', 'block');
            }
        },

        ripple: function() {
            var parent, ink, d, x, y;

            $navigation.find('>li>a').click(function(e) {
                parent = $(this).parent();

                if (parent.find('.ink').length === 0) {
                    parent.prepend('<span class="ink"></span>');
                }

                ink = parent.find('.ink');
                //incase of quick double clicks stop the previous animation
                ink.removeClass('animate');

                //set size of .ink
                if (!ink.height() && !ink.width()) {
                    //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
                    d = Math.max(parent.outerWidth(), parent.outerHeight());
                    ink.css({
                        height: d,
                        width: d
                    });
                }

                //get click coordinates
                //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
                x = e.pageX - parent.offset().left - ink.width() / 2;
                y = e.pageY - parent.offset().top - ink.height() / 2;

                //set the position and add class .animate
                ink.css({
                    top: y + 'px',
                    left: x + 'px'
                }).addClass('animate');

                setTimeout(function() {
                    $('.ink').remove();
                }, 600);
            });
        },

        removeRipple: function() {
            $sidebar.find('.ink').remove();
        },

        collapse: function() {
            /*$collapseSidebarEl.on('click', function(e) {
                if ($app.hasClass('sidebar-sm')) {
                    $app.removeClass('sidebar-sm').addClass('sidebar-xs');
                } else if ($app.hasClass('sidebar-xs')) {
                    $app.removeClass('sidebar-xs');
                } else {
                    $app.addClass('sidebar-sm');
                }
            */

            $collapseSidebarEl.ready(function() {
                $app.addClass('sidebar-xs');

                $app.removeClass('sidebar-xs-forced');
                $app.parent().removeClass('sidebar-xs');
                WEBSCRIBE.navbar.removeRipple;
                $window.trigger('resize');
                if (typeof(event) != 'undefined')
                    event.preventDefault();
            });
        },

        offcanvas: function() {
            $offcanvasToggleEl.on('click', function(e) {
                if ($app.hasClass('offcanvas-opened')) {
                    $app.removeClass('offcanvas-opened');
                } else {
                    $app.addClass('offcanvas-opened');
                }
                e.preventDefault();
            });
        }


    };




    //!!!!!!!!!!!!!!!!
    // tiles functions
    //!!!!!!!!!!!!!!!!

    WEBSCRIBE.tiles = {

        init: function() {
            WEBSCRIBE.tiles.toggle();
            WEBSCRIBE.tiles.refresh();
            WEBSCRIBE.tiles.fullscreen();
            WEBSCRIBE.tiles.close();
        },

        toggle: function() {
            $tileToggleEl.on('click', function() {
                var element = $(this);
                var tile = element.parents('.tile');

                tile.toggleClass('collapsed');
                tile.children().not('.tile-header').slideToggle(150);
            });
        },

        refresh: function() {
            $tileRefreshEl.on('click', function() {
                var element = $(this);
                var tile = element.parents('.tile');
                var dropdown = element.parents('.dropdown');

                tile.addClass('refreshing');
                dropdown.trigger('click');

                var t = setTimeout(function() {
                    tile.removeClass('refreshing');
                }, 3000);
            });
        },

        fullscreen: function() {
            $tileFullscreenEl.on('click', function() {
                var element = $(this);
                var tile = element.parents('.tile');
                var dropdown = element.parents('.dropdown');

                screenfull.toggle(tile[0]);
                dropdown.trigger('click');
            });

            if ($tileFullscreenEl.length > 0 && typeof(screenfull.raw) != 'undefined') {
                $(document).on(screenfull.raw.fullscreenchange, function() {
                    var element = $(screenfull.element);
                    if (screenfull.isFullscreen) {
                        element.addClass('isInFullScreen');
                    } else {
                        $('.tile.isInFullScreen').removeClass('isInFullScreen');
                    }
                });
            }
        },

        close: function() {
            $tileCloseEl.on('click', function() {
                var element = $(this);
                var tile = element.parents('.tile');

                tile.addClass('closed').fadeOut();
            });
        }

    };



    //!!!!!!!!!!!!!!!!
    // extra functions
    //!!!!!!!!!!!!!!!!

    WEBSCRIBE.extra = {

        init: function() {
            WEBSCRIBE.extra.sparklineChart();
            WEBSCRIBE.extra.slimScroll();
            WEBSCRIBE.extra.daterangePicker();
            WEBSCRIBE.extra.easypiechart();
            WEBSCRIBE.extra.chosen();
            WEBSCRIBE.extra.toggleClass();
            WEBSCRIBE.extra.colorpicker();
            WEBSCRIBE.extra.touchspin();
            WEBSCRIBE.extra.datepicker();
            WEBSCRIBE.extra.animateProgress();
            WEBSCRIBE.extra.counter();
            WEBSCRIBE.extra.popover();
            WEBSCRIBE.extra.tooltip();
            WEBSCRIBE.extra.splash();
            WEBSCRIBE.extra.lightbox();
        },

        //initialize sparkline chart on elements
        sparklineChart: function() {

            if ($sparklineEl.length > 0) {
                $sparklineEl.each(function() {
                    var element = $(this);

                    element.sparkline('html', {
                        enableTagOptions: true
                    });
                });
            }

        },

        //initialize slimscroll on elements
        slimScroll: function() {

            if ($slimScrollEl.length > 0) {
                $slimScrollEl.each(function() {
                    var element = $(this);

                    element.slimScroll({
                        height: '100%'
                    });
                });
            }

        },

        //initialize date range picker on elements
        daterangePicker: function() {

            if ($pickDateEl.length > 0) {
                $pickDateEl.each(function() {
                    var element = $(this);

                    element.find('span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));

                    element.daterangepicker({
                        format: 'MM/DD/YYYY',
                        startDate: moment().subtract(29, 'days'),
                        endDate: moment(),
                        minDate: '01/01/2012',
                        maxDate: '12/31/2015',
                        dateLimit: {
                            days: 60
                        },
                        showDropdowns: true,
                        showWeekNumbers: true,
                        timePicker: false,
                        timePickerIncrement: 1,
                        timePicker12Hour: true,
                        ranges: {
                            'Today': [moment(), moment()],
                            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                        },
                        opens: 'left',
                        drops: 'down',
                        buttonClasses: ['btn', 'btn-sm'],
                        applyClass: 'btn-success',
                        cancelClass: 'btn-default',
                        separator: ' to ',
                        locale: {
                            applyLabel: 'Submit',
                            cancelLabel: 'Cancel',
                            fromLabel: 'From',
                            toLabel: 'To',
                            customRangeLabel: 'Custom',
                            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                            firstDay: 1
                        }
                    }, function(start, end, label) {
                        console.log(start.toISOString(), end.toISOString(), label);
                        element.find('span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                    });

                });
            }

        },

        easypiechart: function() {
            if ($easypiechartEl.length > 0) {
                $easypiechartEl.each(function() {
                    var element = $(this);
                    element.easyPieChart({
                        onStart: function(value) {
                            if (element.hasClass('animate')) {
                                $(this.el).find('span').countTo({
                                    to: value
                                });
                            }
                        }
                    });
                });
            }
        },

        chosen: function() {
            if ($chosenEl.length > 0) {
                $chosenEl.each(function() {
                    var element = $(this);
                    element.on('chosen:ready', function(e, chosen) {
                        var width = element.css("width");
                        element.next().find('.chosen-choices').addClass('form-control');
                        element.next().css("width", width);
                        element.next().find('.search-field input').css("width", "125px");
                    }).chosen();
                });
            }
        },

        toggleClass: function() {
            $toggleClassEl.on('click', function() {
                var element = $(this),
                    className = element.data('toggle'),
                    type = element.data('type');

                if (type === 'radio') {
                    element.parent().find('.' + className).removeClass(className);
                }

                if (element.hasClass(className)) {
                    element.removeClass(className);
                } else {
                    element.addClass(className);
                }
            });
        },

        colorpicker: function() {
            if ($colorPickerEl.length > 0) {
                $colorPickerEl.each(function() {
                    var element = $(this);
                    element.colorpicker();
                });
            }
        },

        touchspin: function() {
            if ($touchspinEl.length > 0) {
                $touchspinEl.each(function() {
                    var element = $(this);
                    element.TouchSpin();
                });
            }
        },

        datepicker: function() {
            if ($datepickerEl.length > 0) {
                $datepickerEl.each(function() {
                    var element = $(this);
                    var format = element.data('format')
                    element.datetimepicker({
                        format: format
                    });
                });
            }
        },

        animateProgress: function() {
            if ($animateProgressEl.length > 0) {
                $animateProgressEl.each(function() {
                    var element = $(this);
                    var progress = element.data('percentage');

                    element.css('width', progress);
                });
            }
        },

        counter: function() {
            if ($counterEl.length > 0) {
                $counterEl.each(function() {
                    var element = $(this);

                    element.countTo();
                });
            }
        },

        popover: function() {
            $popoverEl = $('[data-toggle="popover"]');
            if ($popoverEl.length > 0) {
                $popoverEl.each(function() {
                    var element = $(this);

                    element.popover();
                });
            }
        },

        tooltip: function() {
            $tooltipEl = $('[data-toggle="tooltip"]');
            if ($tooltipEl.length > 0) {
                $tooltipEl.each(function() {
                    var element = $(this);

                    element.tooltip();
                });
            }
        },

        splash: function() {
            var options = "";
            var target = "";
            $splashEl.on('show.bs.modal', function(e) {
                options = e.relatedTarget.dataset.options;
                target = $(e.target);

                target.addClass(options);
                $body.addClass(options).addClass('splash');
            });
            $splashEl.on('hidden.bs.modal', function() {
                target.removeClass(options);
                $body.removeClass(options).removeClass('splash');
            });
        },

        //initialize magnificPopup lightbox
        lightbox: function() {
            var $lightboxImageEl = $('[data-lightbox="image"]'),
                $lightboxIframeEl = $('[data-lightbox="iframe"]'),
                $lightboxGalleryEl = $('[data-lightbox="gallery"]');

            if ($lightboxImageEl.length > 0) {
                $lightboxImageEl.magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    fixedContentPos: true,
                    image: {
                        verticalFit: true
                    }
                });
            }

            if ($lightboxIframeEl.length > 0) {
                $lightboxIframeEl.magnificPopup({
                    disableOn: 600,
                    type: 'iframe',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            }

            if ($lightboxGalleryEl.length > 0) {
                $lightboxGalleryEl.each(function() {
                    var element = $(this);

                    if (element.find('a[data-lightbox="gallery-item"]').parent('.clone').hasClass('clone')) {
                        element.find('a[data-lightbox="gallery-item"]').parent('.clone').find('a[data-lightbox="gallery-item"]').attr('data-lightbox', '');
                    }

                    element.magnificPopup({
                        delegate: 'a[data-lightbox="gallery-item"]',
                        type: 'image',
                        closeOnContentClick: true,
                        closeBtnInside: false,
                        fixedContentPos: true,
                        image: {
                            verticalFit: true
                        },
                        gallery: {
                            enabled: true,
                            navigateByImgClick: true,
                            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                        }
                    });
                });
            }
        }

    };




    //!!!!!!!!!!!!!!!!!!!!
    // check mobile device
    //!!!!!!!!!!!!!!!!!!!!

    WEBSCRIBE.isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (WEBSCRIBE.isMobile.Android() || WEBSCRIBE.isMobile.BlackBerry() || WEBSCRIBE.isMobile.iOS() || WEBSCRIBE.isMobile.Opera() || WEBSCRIBE.isMobile.Windows());
        }
    };



    //!!!!!!!!!!!!!!!!!!!!!!!!!
    // initialize after resize
    //!!!!!!!!!!!!!!!!!!!!!!!!!

    WEBSCRIBE.documentOnResize = {

        init: function() {

            var t = setTimeout(function() {

                WEBSCRIBE.documentOnReady.setSidebar();
                WEBSCRIBE.navbar.removeRipple();

            }, 500);

        }

    };






    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // initialize when document ready
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    WEBSCRIBE.documentOnReady = {

        init: function() {
            WEBSCRIBE.global.init();
            WEBSCRIBE.header.init();
            WEBSCRIBE.navbar.init();
            WEBSCRIBE.documentOnReady.windowscroll();
            WEBSCRIBE.tiles.init();
            WEBSCRIBE.extra.init();
            WEBSCRIBE.documentOnReady.setSidebar();
        },

        // run on window scrolling

        windowscroll: function() {

            $window.on('scroll', function() {


            });
        },


        setSidebar: function() {

            width = $window.width();

            if (width < 992) {
                $app.addClass('sidebar-xs-forced');
            }

            if (width < 768) {
                $app.addClass('sidebar-xs-forced');
            }

            if ($app.hasClass('sidebar-sm-forced')) {
                $app.addClass('sidebar-sm');
            }

            if ($app.hasClass('sidebar-xs-forced')) {
                $app.addClass('sidebar-xs');
            }

        }

    };







    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // initialize when document load
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    WEBSCRIBE.documentOnLoad = {

        init: function() {
                /* On document load, see if there is a session (login) established.
                 * 
                 * If not, display the login form. (In this example page, it's just a hidden div
                 * that we'll show when needed.)
                 */
                // Create the RxIP API object
                if (location.hostname == 'rxip-dev' || location.hostname == 'rxip-dev.local')
                    rxip = new RxIPSite('http://rxip-dev.local/apiajax.php'); // For JRB
                else
                    rxip = new RxIPSite('http://pago-devel.rxip.net/apiajax.php');
                rxip.myEnding = false;
                // Set up a function to be called after each non-login API call
                // to check whether the user is still logged in. If not, reload
                // the page to start the login process.
                rxip.callCompleted = function(func) {
                    if (rxip.myEnding)
                        return;
                    if (!rxip.site.loggedIn) {
                        rxip.myEnding = true;
                        location.reload();
                    } else
                        setDebugLinks();
                };
                rxip.showError = function(errorMsg) {
                    if (!rxip.myEnding)
                        alert(errorMsg);
                };
                // Initialize the session.
                if (!rxip.initSession()) {
                    // There is no session, so display the login form.
                    $('#loginform').show();
                    $('#pagecontent').hide();
                } else {
                    $('#loginform').hide();
                    $('#pagecontent').show();
                    setSidebar();
                    myFunction();
                    rxip.callAjax('getUserProfile', {}, loadProfile);
                    rxip.callAjax('ping', {}, function() {
                        var el = $('select[name=doctorPracticeType]');
                        for (k in rxip.site.practiceTypes)
                            el.append($('<option/>').val(rxip.site.practiceTypes[k]).text(rxip.site.practiceTypes[k]));
                    });

                }
                // Login form action.
                // Collect the login form data using the RxIPSite.collectFormData function and
                // pass it to the RxIPSite.loginUser function to attempt login.
                $('#loginlink').click(function() {
                    $('#loginmsg').html('Logging In...');
                    var fd = rxip.collectFormData('loginform');
                    fd.application = 'webscribe';
                    rxip.loginUser(fd, function(loggedIn) {
                        if (loggedIn) {
                            // We're in; hide the login form and show the page content
                            $('#loginform').hide();
                            $('#pagecontent').show();
                            setSidebar();
                            rxip.callAjax('getUserProfile', {}, loadProfile);
                            myFunction();

                        } else // Didn't work. Leave the login form displayed
                            $('#loginmsg').html('Failed');
                    });
                    return false;
                });

                $('#checkPass').click(function() {
                    rxip.callAjax('verifyPassword', {
                        password: $('#passCheck').val()
                    }, function(data) {
                        $('#checkPassResult').text('Password verification ' + (data.passwordMatches ? 'OK' : 'FAILED'));
                    });
                });

                function loadProfile(data) {
                    for (var name in data.user) {
                        var $el = $('input[name="' + name + '"]');
                        if ($el.length > 0) {
                            $el.each(function() {
                                var $this = $(this);
                                switch ($this.attr('type')) {
                                    case 'text':
                                        $this.val(data.user[name]);
                                        break;
                                    case 'checkbox':
                                        $this.prop('checked', ($this.val() == data.user[name]) ? true : false);
                                        break;
                                }
                            });
                        }
                    }
                    var isLoggedInUser = (rxip.site.userId == $('input[name=userId]').val());
                    if (isLoggedInUser)
                        $('#profile .no-self-edit').hide();
                    else
                        $('#profile .no-self-edit').show();
                    $('#pagecontent').show();
                    $('.spinner').hide();
                }

                $(function() {
                    $('#updateUser').click(function() {
                        $('#pagecontent').show();
                        $('#uphead').html("User Profile");
                        var formData = rxip.collectFormData('profile');
                        console.log(formData);
                        rxip.callAjax('setUserProfile', formData, function(data) {
                            loadProfile(data);
                            $('#uphead').html($('#uphead').html() + " (Updated)");
                        });
                    });

                });

                // Show-user action.
                // Make a direct AJAX call to the RxIP service. The function we are calling isn't
                // that important, but a successful call will result in rxip.site having information
                // about the user.
                $('#clik').click(function() {
                    rxip.callAjax('showOrigin', {}, function(data) {
                        var h = 'RxIP Version: ' + rxip.siteHtml.rxipVersion + '<br />User: ' + rxip.siteHtml.userFullName + '<br />Practice: ' + rxip.siteHtml.practiceName;
                        h += '<br />User ' + (rxip.havePractice() ? 'has' : 'does NOT have') + ' a practice';
                        h += '<br />User ' + (rxip.site.isPracticeAdmin ? 'is' : 'is NOT') + ' an admin for the selected practice';
                        h += '<br />User ' + (rxip.hasProviders() ? 'has' : 'does NOT have') + ' providers';
                        $('#pagemsg').html(h);
                    });
                    return false;
                });

                //openModal New RX action
                $('#newrx').click(function() {
                    $('#modal-1').modal();
                    loadRx();
                    if (rxip.site.allowedProviders.length == 1) {
                        $("#rxform select[name='doctorId']").val(rxip.site.allowedProviders[0].doctorId);
                        $("#rxform select[name='doctorId']").change();
                    }

                });

                //Ingredients PDF window
                $('.pdf').click(function() {
                    $("#ingredient-modal").modal();
                    var fileName = "./img/Cyclobenzaprine_HCI_(Flexeril).pdf";
                    var htm = "<iframe id='theFrame' src='" + fileName + "' allowfullscreen frameborder='0'></iframe>";
                    $("#ingredientPdf").html(htm);
                    $("#ingredientTitle").text(fileName.slice(6));

                });

                $("theFrame").load(function() {
                    this.$("img")[0].css('width', '100%');
                });

                $('#searchrx').click(function() {
                    $('#searchErrors').html('').hide();
                    rxip.callAjax('enumeratePatients', {}, function(data) {
                        var h = '<option value="0">- All Patients -</option>';
                        var pts = rxip._escapeObject(data.patients);
                        for (var i in pts) {
                            h += '<option value="' + pts[i].patientId + '">' + pts[i].patientLastName + ', ' + pts[i].patientFirstName;
                            h += ' [' + pts[i].patientDob + ']</option>';
                        }
                        var current = $('#searchPatient').val();
                        $('#searchPatient').html(h);
                        if (current)
                            $('#searchPatient').val(current);
                        $('#modal-3').modal('show');
                    });
                });


                $('#searchrxs').click(function() {
                    var startDate = $('#searchDateWritten').data('daterangepicker').startDate.format('MM/DD/YYYY');
                    var endDate = $('#searchDateWritten').data('daterangepicker').endDate.format('MM/DD/YYYY');
                    var ptId = $('#searchPatient').val();
                    var processingStatus = $('#searchProcessingStatus').val();
                    $('#searchErrors').html('').hide();
                    $(".spinner").show();
                    rxip.callAjax('enumerateScripts', {
                        startDateWritten: startDate,
                        endDateWritten: endDate,
                        patientId: ptId,
                        processingStatus: processingStatus
                    }, function(data) {
                        $('#searchResults table').html('');
                        if (data.scripts.length > 0) {
                            var h = '<tr><th>Patient Name</th><th>Date Written</th><th>Formula</th><th>Status</th></tr>';
                            for (var i in data.scripts) {
                                var rec = rxip._escapeObject(data.scripts[i]);
                                h += '<tr><td><a href="#" recid="' + rec.rxId + '">' + rec.patientFullName + '</a></td><td>' + rec.dateWritten + '</td>';
                                h += '<td>' + rec.formulaSpeedcode + '</td><td>' + rec.processingStatus + '</td></tr>';
                            }
                            $('#searchResults table').html(h);
                            $(".spinner").hide();
                            $('#searchResults a').click(function() {
                                var recid = $(this).attr('recid');
                                rxip.callAjax('getScript', {
                                    rxId: recid
                                }, function(data) {
                                    $('#modal-3').modal('hide').off('hidden.bs.modal').on('hidden.bs.modal', function() {
                                        $('#modal-3').off('hidden.bs.modal');
                                        $('#modal-2').modal();
                                        loadRx(data.script);

                                    });
                                });
                                return false;
                            });
                        } else
                            $('#searchErrors').html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>' + 'No matching scripts found' + '</span></div>').show();
                    });
                });

                // Put Rx action
                $('#putrx').click(function() {
                    var script = rxip.collectFormData('rxform');
                    // Getting signature as SVG and rendering the SVG within the browser.
                    var datapair = $sigdiv.jSignature("getData", "base30");
                    script.signature = datapair[1];
                    rxip.callAjax('putScript', script, function(data) {
                        loadRx(data.script, data.fieldErrors, data.formErrors);
                    });
                    return false;
                });

                $('.sent').click(function() {
                    location.reload();
                });

                //input todays date
                var now = moment().format('MM/DD/YYYY');
                $('#dateWritten').val(now);


                //////////////////////////////////////
                /// Zipcode populates City
                //////////////////////////////////////

                // OnKeyDown Function
                $(".zip").keyup(function() {
                    var zip_in = $(this);
                    var zip_box = $('.zipbox');

                    if (zip_in.val().length < 5) {
                        zip_box.removeClass('error success');
                    } else if (zip_in.val().length > 5) {
                        zip_box.addClass('error').removeClass('success');
                    } else if ((zip_in.val().length == 5)) {

                        // Make HTTP Request
                        $.ajax({
                            url: "http://api.zippopotam.us/us/" + zip_in.val(),
                            cache: false,
                            dataType: "json",
                            type: "GET",
                            success: function(result, success) {

                                // US Zip Code Records Officially Map to only 1 Primary Location
                                places = result['places'][0];
                                $(".city").val(places['place name']);
                                $('#rxform .state-basic-placeholder-single').val(places['state']);
                                zip_box.addClass('success').removeClass('error');
                            },
                            error: function(result, success) {
                                zip_box.removeClass('success').addClass('error');
                            }
                        });
                    }
                });

                $('.tile-refresh').click(function() {
                    location.reload();
                });

                // #replyNote action
                $('#replyNote').click(function(e) {
                    var script = rxip.collectFormData('rxform');
                    var text = $('#replyText').val().trim();
                    e.preventDefault();
                    rxip.callAjax('putScript', script, function(data) {
                        if (text) {
                            rxip.callAjax('addScriptNote', {
                                rxId: data.script.rxId,
                                noteText: text,
                                attentionNeeded: 'PH'
                            }, function(data) {
                                $('#noteText').val('');
                                // function that shows the note at the top without refresh (use javascript or use API)
                                var d = new Date();
                                //d.setTime(Date.parse(note.createdTime));
                                $('#noteslist').append("<div class='alert alert-danger'><p class='notehead'>From: " + data.site.userFullName + '</p><p class="notehead">Sent: ' + d.toLocaleDateString() + ' ' + d.toLocaleTimeString() + '</p><p>' + text + "</p></div>");
                            });
                        }

                        loadRx(data.script);
                        $('#replyText').val('');
                    });
                    return false;

                });

                // Logout link action
                // Call the RxIPSite.logout function to kill the session, then reload the page to
                // start all over.
                $('#logout').click(function() {
                    rxip.logout(function(data) {
                        location.reload();
                    });
                    return false;
                });

                // Debugging link action
                $('a.debugLink').click(function() {
                    var setting = {};
                    var action = $(this).attr('act');
                    setting[action] = !rxip.site.serverDebugSettings[action];
                    if (action == 'sqlLevel' && setting['action'])
                        setting[action] = 2;
                    rxip.setServerDebug(setting, function() {
                        if (rxip.site.serverDebugSettings.debug)
                            $('#ajaxdebug').show();
                        else
                            $('#ajaxdebug').hide();
                        setDebugLinks();
                    });
                    return false;
                });
                $('#imagein').change(function() {
                    $('#imagelook').show();
                    if (!rxip.site.serverDebugSettings.debug)
                        rxip.setServerDebug({
                            debug: 1
                        }, setDebugLinks);
                });
                $('#imagelook').click(function() {
                    if ($('#imagein').prop('files').length == 0)
                        return false;
                    var files = {
                        files: true,
                        request: true,
                        sent: $('#imagein').prop('files')
                    };
                    rxip.callAjax('inspect', files, function(data) {
                        $('#imagein').val('');
                        $('#imagelook').hide();
                    });
                    return false;
                });

                // patientShipSame hide/show function
                $("#patientShipSame").change(function() {
                    if ($(this).prop('checked') === true) {
                        $('div.patientShipAddr').hide();
                        $('div.patientShipAddr').prop('required', false);

                    } else {
                        $('div.patientShipAddr').show();
                        $('div.patientShipAddr').prop('required', true);
                    }

                });

                $("input.insurance-number").change(function() {
                    rxip.callAjax('getAllowedFormulas', {
                        patientInsuranceBin: $("input[name='patientInsuranceBin']").val(),
                        patientInsurancePcn: $("input[name='patientInsurancePcn']").val(),
                    }, function(data) {
                        // Update the list of allowed formulas
                        rxip.site.allowedFormulas = data.allowedFormulas;
                        var el = $("#rxform select[name='formulaSpeedcode']");
                        var selectedFormula = el.val();
                        el.html(getFormulaOptions());
                        el.val(selectedFormula);
                        // Handle the case where a formula was previously selected but
                        // is not allowed now by returning the select to the default option
                        if (el.find('option:selected').length == 0)
                            el.val('');
                        $("#rxform select[name='formulaSpeedcode']").change();
                    });
                });

                $("#rxform select[name='formulaSpeedcode']").change(function() {
                    var allowed = {
                        min: 0,
                        max: 0,
                        allowedValues: []
                    };
                    var formulaUnits = '';
                    var selectedFormula = $(this).val();
                    if (selectedFormula && rxip.site.allowedFormulas[selectedFormula]) {
                        allowed = rxip.site.allowedFormulas[selectedFormula].quantityValues;
                        formulaUnits = rxip.site.allowedFormulas[selectedFormula].formulaUnits;
                        formulaName = rxip.site.allowedFormulas[selectedFormula].formulaName + ' (' + rxip.site.allowedFormulas[selectedFormula].formulaStrength + ')';
                        $('p.formulaname').html(formulaName);
                    }
                    var currentQuantity = $("input[name='rxQuantity'],select[name='rxQuantity']").val();
                    var h;
                    if (allowed.allowedValues.length > 0) {
                        // Use a select element
                        h = '<select name="rxQuantity"><option value="0">- Select -</option>';
                        for (var i in allowed.allowedValues) {
                            h += '<option value="' + allowed.allowedValues[i].value + '">';
                            h += rxip._escapeString(allowed.allowedValues[i].text) + '</option>';
                        }
                        h += '</select>';
                        $('div.quantity-entry').html(h);
                        var el = $("select[name='rxQuantity']");
                        el.val(currentQuantity);
                        // Handle the case of an invalid existing value
                        if (el.find('option:selected').length == 0)
                            el.val(0);
                    } else {
                        h = '<input type="text" name="rxQuantity" size=6 /> ' + formulaUnits;
                        if (allowed.max > 0)
                            h += ' (' + allowed.max + ' max)';
                        $('div.quantity-entry').html(h);
                        $("input[name='rxQuantity']").val(currentQuantity);
                    }

                });

                // load RX
                function loadRx(rx, errors, formerrors) {
                    rxip.rx = rx; // For use by other global functions
                    var errmsg = '';
                    bootstrap_alert = function() {}
                    bootstrap_alert.warning = function() {
                        if (errmsg != '') {
                            $('#rxerrors').html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>' + errmsg + '</span></div>');
                        }

                    }
                    if (rx && rx.allowedFormulas)
                        rxip.site.allowedFormulas = rx.allowedFormulas;
                    var formulaOptions = getFormulaOptions();
                    $("#rxform select[name='formulaSpeedcode']").html(formulaOptions);
                    $("#rxform select[name='formulaSpeedcode']").change();
                    if (!rx) {

                        return;
                    }
                    $('#rxform input, #rxform select').each(function() {
                        var name = $(this).attr('name');
                        var row = $(this).parents('.form-group');
                        if (typeof(errors) != 'undefined' && errors[name]) {
                            row.addClass('has-error');
                            row.attr('title', errors[name]);
                        } else {
                            row.removeClass('has-error');
                            row.removeAttr('title');
                        }
                        if (errors != '') {
                            $('#putrx').show();
                        } else {
                            $('#putrx').hide();
                            $('#rxerrors').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span>' + "Rx Submitted!" + '</span></div>');
                        }
                        var type = $(this).attr('type');
                        if (type == 'checkbox' || type == 'radio')
                            $(this).prop('checked', (rx[name] == $(this).prop('value')) ? true : false);
                        else
                            $(this).val(rx[name]);
                    });
                    $("#rxform select[name='formulaSpeedcode']").change();
                    $("input[name='patientShipSame']").change();
                    if (formerrors) {
                        for (k in formerrors) {
                            if (errmsg != '')
                                errmsg += '<br />';
                            errmsg += formerrors[k];

                        }
                    }


                    $('#rxform').show();
                    $('#noteslist').empty();
                    $(bootstrap_alert.warning);



                    /////////////////////////////////////////////////
                    // Creates each note thats applied to a patients Rx
                    /////////////////////////////////////////////////
                    rx.notes.forEach(function(note) {
                        var d = new Date();
                        d.setTime(Date.parse(note.createdTime));
                        $('#noteslist').append("<div class='alert alert-danger'><p class='notehead'>From: " + note.noteFrom + '</p><p class="notehead">Sent: ' + d.toLocaleDateString() + ' ' + d.toLocaleTimeString() + '</p><p>' + note.noteText + "</p></div>");
                    })
                    $('#attachments').empty();
                    $('div.rxattachment').empty();
                    if (rx.attachments.length > 0) {
                        for (var i in rx.attachments) {
                            var att = rx.attachments[i];
                            var h = '<div><a href="#" class="attachment" recid="' + att.attachmentId + '">';
                            h += rxip._escapeString(att.fileName + " (" + att.description + ')');
                            h += '</a></div>';
                            $('#attachments').append(h);
                        }
                    }
                    $('a.attachment').click(function() {
                        rxip.callAjax('getScriptAttachment', {
                            rxId: rx.rxId,
                            attachmentId: $(this).attr('recid')
                        }, function(data) {
                            $('div.rxattachment').html('<object width="100%" height="100%" data="' + data.attachment.uri + '">Can not display attachment</object>').show();
                        });
                        return false;
                    });
                    $('#rxtab3 button.uploadattachment').click(function(e) {
                        $('.spinner').show();
                        e.preventDefault();
                        if ($('#rxtab3 input.attachment').prop('files').length == 0) {
                            rxip.showError('You must choose an image file!');
                            $('.spinner').hide();
                            return false;
                        }
                        var description = $("#rxtab3 .attachmentform input[name='description']").val().trim();
                        if (!description) {
                            rxip.showError('Please provide a description for the attachment');
                            $('.spinner').hide();
                            return false;
                        }
                        var att = {
                            rxId: rx.rxId,
                            description: description,
                            attachment: $('#rxtab3 input.attachment').prop('files')
                        };
                        rxip.callAjax('addScriptAttachment', att, function(data) {
                            loadRx(data.script);
                            $('.spinner').hide();
                        });

                        return true;
                    });
                }



                // populates formula options
                function getFormulaOptions() {
                    var formulaOptions = '<option value="">- Select -</option>';
                    for (var code in rxip.site.allowedFormulas)

                        formulaOptions += '<option value="' + code + '">' + code + '</option>';
                    return formulaOptions;
                };





                function setDebugLinks() {
                    for (k in rxip.site.serverDebugSettings)
                        $("a.debugLink[act='" + k + "'] span.onoff").html(rxip.site.serverDebugSettings[k] ? 'Off' : 'On');
                }

                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // Clears Rx form when closed 
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                $(".modal").on("hidden.bs.modal", function() {
                    // Make a dummy Rx object for use until a real one is loaded
                    // from the server.
                    rxip.rx = {
                        allowedFormulas: rxip.site.allowedFormulas
                    };

                    $("#rxform select[name='formulaSpeedcode']").html(getFormulaOptions());
                    $('#rxform input, #rxform select, #locationform input, #locationform select, #providerform input, #providerform select').each(function() {
                        var type = $(this).attr('type');
                        if (type != 'checkbox' && type != 'radio')
                            $(this).val('');
                        else
                            $(this).prop('checked', false);
                        var row = $(this).parents('.form-group');
                        row.removeClass('has-error');
                        row.removeAttr('title');
                    });
                    $("input[name='patientShipSame']").change();
                    $("#rxform select[name='formulaSpeedcode']").change();
                    $('#rxerrors').html('');
                    $('p.formulaname').html('');
                    $('.select2-container').select2('val', '');
                    $("input[name='locationInactive']").change();
                });



                function myFunction() {

                    // search names in Pending Subscriptions
                    $("#search").on("keyup", function() {
                        var value1 = $(this).val();
                        var value = value1.toLowerCase();
                        $("table tr").each(function(index) {
                            if (index !== 0) {

                                $row = $(this);

                                var id = $row.find("td.lookup").text();
                                var idoOne = id.toLowerCase();

                                if (idoOne.indexOf(value) !== 0) {
                                    $row.hide();
                                } else {
                                    $row.show();
                                }
                            }
                        });
                    });

                    //Select 2 Patient dropdown
                    $("#rxform select[name='patientId']").select2({
                        placeholder: "Select Patient",
                        minimumInputLength: 2,
                        allowClear: true
                    });

                    //Select 2 State dropdown
                    $(".state-basic-placeholder-single").select2({
                        placeholder: "Select State",
                        allowClear: true

                    });

                    //Select 2 State dropdown
                    $("#providerform select[name='doctorPracticeType']").select2({
                        placeholder: "Select Practice Type",
                        allowClear: true

                    });

                    // Get a list of pharmacies
                    $('#rxform select[name=pharmacyCode]').ready(function() {
                        rxip.callAjax('showOrigin', {}, function(data) {
                            var h = '<option value="">- Any -</option>';
                            for (var i in rxip.site.allowedPharmacies) {
                                var pharm = rxip.site.allowedPharmacies[i];
                                h += '<option value="' + pharm.pharmacyCode + '">' + rxip._escapeString(pharm.pharmacyName) + '/' + pharm.pharmacyCode + '</option>';
                            }
                            $('#rxform select[name=pharmacyCode]').html(h);
                        });
                    });

                    // Get a list of providers populated by practice
                    $("#rxform select[name='doctorId']").ready(function() {
                        rxip.callAjax('showOrigin', {}, function(data) {
                            var doctorOptions = '<option value="">- Select Provider-</option>';
                            data.site.allowedProviders.forEach(function(provider) {
                                doctorOptions += '<option value="' + provider.doctorId + '">' + provider.doctorFullName + '</option>';
                            });
                            $("#rxform select[name='doctorId']").html(doctorOptions);
                        });
                    });

                    $("#rxform select[name='doctorId']").change(function() {
                        var doctorId = $(this).val();
                        $('#signature').jSignature('reset');
                        rxip.site.allowedProviders.forEach(function(provider) {
                            if (provider.doctorId == doctorId) {
                                if (provider.signature && provider.signature != '') {
                                    $('#signature').jSignature('setData', provider.signature, 'base30');
                                }
                                return;
                            }
                        });
                    });

                    // Get a list of patients populated by practice
                    $("#rxform select[name='patientId']").ready(function() {
                        rxip.callAjax('searchPatients', {}, function(data) {
                            var patientOptions = '<option value=""></option>';
                            data.patientList.forEach(function(patient) {
                                patientOptions += '<option value="' + patient.patientId + '">' + patient.patientNameString + '</option>';
                            });
                            $("#rxform select[name='patientId']").html(patientOptions);
                        });
                    });

                    // Populate fields in a new RX form using Find A Patient functionality
                    $("#rxform select[name='patientId']").change(function() {
                        rxip.callAjax('getpatient', {
                            patientId: $(this).val()
                        }, function(data) {
                            $('#modal-1').modal();
                            var $radios = $('input[name=patientGender]');
                            if ($radios.is(':checked') == false || true) {
                                $radios.filter('[value="' + data.patient.patientGender + '"]').prop('checked', true);

                            };

                            var $boxes = $('#modal-1 input[name="patientShipSame"]');
                            if ($boxes.is(':checked') == false) {
                                $boxes.filter('[value="' + data.patient.patientShipSame + '"]').prop('checked', true);
                                $('div.patientShipAddr').hide();
                            };

                            $("#rxform input[name='patientLastName']").val(data.patient.patientLastName);
                            $("#rxform input[name='patientFirstName']").val(data.patient.patientFirstName);
                            $("#rxform input[name='patientDob']").val(data.patient.patientDob);
                            $("#rxform input[name='patientInsuranceBin']").val(data.patient.patientInsuranceBin);
                            $("#rxform input[name='patientInsurancePcn']").val(data.patient.patientInsurancePcn);
                            $("#rxform input[name='patientAddress1']").val(data.patient.patientAddress1);
                            $("#rxform input[name='patientAddress2']").val(data.patient.patientAddress2);
                            $("#rxform input[name='patientCity']").val(data.patient.patientCity);
                            $("#patientState").select2('val', data.patient.patientState);
                            $("#rxform input[name='patientZip']").val(data.patient.patientZip);
                            $("#rxform input[name='patientPhone1']").val(data.patient.patientPhone1);
                            $("#rxform input[name='patientPhone2']").val(data.patient.patientPhone2);
                            $("#rxform input[name='patientShipSame']").prop('checked', data.patient.patientShipSame ? true : false);
                            $("#rxform input[name='patientShipAddress1']").val(data.patient.patientShipAddress1);
                            $("#rxform input[name='patientShipAddress2']").val(data.patient.patientShipAddress2);
                            $("#rxform input[name='patientShipCity']").val(data.patient.patientShipCity);
                            $("#rxform input[name='patientShipZip']").val(data.patient.patientShipZip);
                            // Ensure rules for patient's insurance BIN are executed
                            $("#rxform input[name='patientInsuranceBin']").change();
                        });
                    });

                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    // Populate names from scripts submitted
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                    // List-patients action
                    // Make a direct AJAX call to the RxIP service. (We may want to do some of this
                    // code in an RxIPSite object function at some point.)

                    function generateHtml(i, id, attention) {
                        return ['<tr>',
                            '<td>' + (i + 1) + '</td>',
                            '<td class="lookup">',
                            '<div>',
                            '<a href="javascript:void(0);" class="rxlink" recid="' + id + '"><p id="demo' + i + '"></p></a>',
                            '<p>' + attention + '</p>',
                            '<div>',
                            '</td>',
                            '<td><small class="text-danger" id="date' + i + '"></small></td>',
                            '<td>',
                            '<div class="mb-0 inline-block" style="width: 150px; margin-right: 5px">',
                            '<div id="status' + i + '" style="width: 23%;"></div>',
                            '</div>',
                            '</td>',
                            '</tr>'
                        ].join('');
                    }

                    // for each prescription entered a new list is created
                    rxip.callAjax('enumerateScripts', {}, function(data) {
                        var i = 0;
                        data.scripts.forEach(function(script) {
                            var attention = (script.attentionNeeded == 'PR') ? ' <b>ATTENTION NEEDED</b>' : ((script.attentionNeeded == 'PH') ? ' Pharmacy Attention Requested' : '');
                            //script is a variable with .rxId
                            $('#enumerateScriptsData').append(generateHtml(i, script.rxId, attention));
                            $('#demo' + i).text(script.patientFullName);
                            $('#date' + i).text(script.dateWritten);
                            $('#status' + i).text(script.processingStatus);
                            i++;
                        });


                        $('a.rxlink').click(function() {
                            rxip.callAjax('getScript', {
                                rxId: $(this).attr('recid')
                            }, function(data) {
                                $('#modal-2').modal();
                                if (data.script.attentionNeeded == 'PR')
                                    $("a[href='#rxtab2']").tab('show');
                                else
                                    $("a[href='#rxtab1']").tab('show');

                                loadRx(data.script);
                            });

                        });
                    });

                    /*
                    $('#npi-button').click(function() {
                        $('#npiresult').html('');
                        var npi = $('#npi').val().trim();
                        if (npi != '') {
                            rxip.callAjax('findProviderByNpi', {
                                doctorNpi: npi
                            }, function(data) {
                                if (data.error)
                                    $('#npiresult').html('<span style="color:red">' + data.error + '</span>');
                                else {
                                    var h = '<table class="npiresult-table">';
                                    var provider = rxip._escapeObject(data.provider);
                                    for (k in provider)
                                        h += '<tr><td>' + k + '</td><td>' + provider[k] + '</td></tr>';
                                    h += '</table>';
                                    $('#npiresult').html(h);
                                    $('#npi').val('');
                                }
                            });
                        }
                        return false;
                    });
                    */

                    // Generates HTML table for locations
                    function generateLocations(i) {
                        return ['<tr>',
                            '<td>' + (i + 1) + '</td>',
                            '<td>',
                            '<div>',
                            '<a href="javascript:void(0);" class="locationlink" locationId="' + i + '"><p id="office' + i + '"></p></a>',
                            '</div>',
                            '</td>',
                            '</tr>'
                        ].join('');
                    }

                    // for each location populate into list
                    rxip.callAjax('showOrigin', {}, function() {
                        var i = 0;
                        for (var idx in rxip.site.locations) {
                            var l = rxip._escapeObject(rxip.site.locations[idx]);
                            //location is a variable with .locationId
                            $('#practiceLocation').append(generateLocations(i));
                            $('#office' + i).text(l.locationName);
                            i++;
                        }

                        $('a.locationlink').click(function() {
                            $('#location-modal').modal();
                            var idx = $(this).attr('locationId');
                            var location = rxip.site.locations[idx];
                            for (var k in location) {
                                if (k == 'locationInactive') {
                                    $("input[name='locationInactive']").prop('checked', (location[k] == 1 ? true : false));
                                } else
                                    $("input[name='" + k + "']").val(location[k]);
                                $("#locationState").select2('val', location.locationState);
                            }
                        });
                    });

                    // Location Validation
                    $('#updateLocation').click(function() {
                        $('#locationform input, #locationform select').removeAttr('title').removeClass('badfield');
                        rxip.callAjax('putPracticeLocation', rxip.collectFormData('location'), function(data) {
                            if (data.errors) {
                                for (k in data.errors)
                                    $("input[name='" + k + "']").parents('.form-group').addClass('badfield').attr('title', data.errors[k]);
                            } else {
                                $('#updateLocation').hide();
                            }
                        });
                        return false;
                    });

                    // Generates HTML table for Providers
                    function generateProviders(i, id) {
                        return ['<tr>',
                            '<td>',
                            '<div>',
                            '<a href="javascript:void(0);" class="providerlink" doctorId="' + id + '"><p id="provider' + i + '"></p></a>',
                            '</div>',
                            '</td>',
                            '</tr>'
                        ].join('');
                    }

                    // for each provider populates into list
                    rxip.callAjax('showOrigin', {}, function(data) {
                        var i = 0;
                        var providers = rxip.siteHtml.allowedProviders;
                        data.site.providers.forEach(function(provider) {
                            $('#locationProviders').append(generateProviders(i, provider.doctorId));
                            $('#provider' + i).text(provider.doctorFullName);
                            i++;
                        });

                        $('a.providerlink').click(function() {
                            $('#provider-modal').modal();
                            var doctorId = $(this).attr('doctorId');
                            data.site.providers.forEach(function(provider) {
                                if (doctorId == provider.doctorId) {
                                    $('#providerform input[name="doctorNpi"]').val(provider.doctorNpi);
                                    $('#providerform input[name="doctorLastName"]').val(provider.doctorLastName);
                                    $('#providerform input[name="doctorFirstName"]').val(provider.doctorFirstName);
                                    $('#providerform input[name="doctorMiddleName"]').val(provider.doctorMiddleName);
                                    $('#providerform input[name="doctorAddr1"]').val(provider.doctorAddr1);
                                    $('#providerform input[name="doctorAddr2"]').val(provider.doctorAddr2);
                                    $('#providerform input[name="doctorZip"]').val(provider.doctorZip);
                                    $('#providerform input[name="doctorCity"]').val(provider.doctorCity);
                                    $("#doctorState").select2('val', provider.doctorState);
                                    $('#providerform input[name="doctorPhone1"]').val(provider.doctorPhone1);
                                    $('#providerform input[name="doctorPhone2"]').val(provider.doctorPhone2);
                                    $('#providerform input[name="doctorFax"]').val(provider.doctorFax);
                                    $('#providerform input[name="doctorDea"]').val(provider.doctorDea);
                                    $('#providerform input[name="doctorStateLicense"]').val(provider.doctorStateLicense);
                                    $("doctorPracticeType").select2('val', provider.doctorPracticeType);
                                }
                            });
                        });
                    });

                    // Provider Validation
                    $('#requestProvider').click(function() {
                        $('#providerform input, #providerform select').removeAttr('title').removeClass('badfield');
                        rxip.callAjax('requestProviderAddition', rxip.collectFormData('provider-request'), function(data) {
                            if (data.errors._hasError) {
                                for (k in data.errors)
                                    $("input[name='" + k + "'],select[name='" + k + "']").parents('.form-group').addClass('badfield').attr('title', data.errors[k]);
                            } else {
                                $('#requestProvider').hide();
                                alert("Request has been submitted to " + rxip.siteHtml.siteName);
                            }
                        });
                        return false;
                    });
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    // Populate Practice Name 
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    function practicePopulate() {
                        rxip.callAjax('showOrigin', {}, function() {
                            var practice = rxip.siteHtml.practiceName;
                            $('#practiceTitle').html(practice);
                        });
                    };

                    // List-scripts action
                    // Make a direct AJAX call to the RxIP service. (We may want to do some of this
                    // code in an RxIPSite object function at some point.)
                    //

                    /*$("#scriptNumber").ready(function() {
                        rxip.callAjax('enumerateScripts', {}, function(data) {
                            document.getElementById("scriptNumber").innerHTML = data.scripts.length;
                            document.getElementById("scriptNumberTwo").innerHTML = "<strong>" + data.scripts.length + " </strong>&nbsp;prescriptions need attention!";
                        });

                    });*/

                    //!!!!!!!!!!!!!!!!!!!!!!!
                    // Provider populate
                    //!!!!!!!!!!!!!!!!!!!!!!!
                    function providerPopulate() {
                        rxip.callAjax('showOrigin', {}, function() {
                            var provider = rxip.siteHtml.userFullName;
                            $('#providerPopulate').html(provider);

                        });
                    }

                    practicePopulate();
                    providerPopulate();

                } // End myFunction

                // setSidebar function
                function setSidebar() {

                    width = $window.width();

                    if (width < 992) {
                        $app.addClass('sidebar-xs');
                    }
                    if ('device-sm') {
                        $app.addClass('sidebar-xs');
                    }
                    if ('device-xs') {
                        $app.addClass('sidebar-xs');
                    }
                    if ($app.hasClass('sidebar-xs-forced')) {
                        $app.addClass('sidebar-xs');
                    }

                    $('.mainButton').width(
                        Math.max.apply(
                            Math,
                            $('.mainButton').map(function() {
                                return $(this).outerWidth();
                            }).get()
                        )
                    );

                } // END setSidebar function

            } // End init
    }; // End documentOnLoad






    //!!!!!!!!!!!!!!!!!!!!!!!!!
    // global variables
    //!!!!!!!!!!!!!!!!!!!!!!!!!

    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $branding = $('#header .branding'),
        $sidebar = $('#sidebar'),
        $controls = $('#controls'),
        $app = $('.appWrapper'),
        $navigation = $('#navigation'),
        $sparklineEl = $('.sparklineChart'),
        $slimScrollEl = $('.slim-scroll'),
        $collapseSidebarEl = $('.collapse-sidebar'),
        $wrap = $('#wrap'),
        $offcanvasToggleEl = $('.offcanvas-toggle'),

        //navigation elements
        $dropdowns = $navigation.find('ul').parent('li'),
        $a = $dropdowns.children('a'),
        $notDropdowns = $navigation.children('li').not($dropdowns),
        $notDropdownsLinks = $notDropdowns.children('a'),
        // end of navuigation elements

        $headerSchemeEl = $('.color-schemes .header-scheme'),
        $brandingSchemeEl = $('.color-schemes .branding-scheme'),
        $sidebarSchemeEl = $('.color-schemes .sidebar-scheme'),
        $colorSchemeEl = $('.color-schemes .color-scheme'),
        $fixedHeaderEl = $('#fixed-header'),
        $fixedAsideEl = $('#fixed-aside'),
        $toggleRightbarEl = $('.toggle-right-sidebar'),
        $pickDateEl = $('.pickDate'),

        $tileEl = $('.tile'),
        $tileToggleEl = $('.tile .tile-toggle'),
        $tileRefreshEl = $('.tile .tile-refresh'),
        $tileFullscreenEl = $('.tile .tile-fullscreen'),
        $tileCloseEl = $('.tile .tile-close'),

        $easypiechartEl = $('.easypiechart'),
        $chosenEl = $('.chosen-select'),
        $toggleClassEl = $('.toggle-class'),
        $colorPickerEl = $('.colorpicker'),
        $touchspinEl = $('.touchspin'),
        $datepickerEl = $('.datepicker'),
        $animateProgressEl = $('.animate-progress-bar'),
        $counterEl = $('.counter'),
        $splashEl = $('.splash');


    //!!!!!!!!!!!!!
    // initializing
    //!!!!!!!!!!!!!
    $(document).ready(WEBSCRIBE.documentOnReady.init);
    $window.load(WEBSCRIBE.documentOnLoad.init);
    $window.on('resize', WEBSCRIBE.documentOnResize.init);



});