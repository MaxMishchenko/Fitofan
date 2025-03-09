$(document).ready(function () {
    body = $('body');
    burgerBTN = $('#burger');
    mobileMenu = $('#mobile-menu');
    mobileMenuLink = $('.mobile__menu-nav a');
    header = $('#header');

    checkHeaderPosition();

    checkTopBtnPosition();

    lazyLoadBackground();

    /** Burger **/
    burgerBTN.add(mobileMenuLink).on('click', mobileMenuToggle);

    /** Smooth anchors scroll **/
    $('a[href*="#"]:not([href="#"])').click(function (e) {
        e.preventDefault();

        let target = $(this).attr('href');
        let targetOffset = $(target).offset()?.top;

        if (targetOffset !== undefined) {
            let currentPosition = $(window).scrollTop();
            let distance = Math.abs(targetOffset - currentPosition);
            let speed = Math.max(600, Math.min(distance * 0.5, 3000));

            $('html, body').animate({ scrollTop: targetOffset - 80 }, speed, 'swing');
        }
    });

    /** Scroll to top **/
    $('#scroll-top').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate({scrollTop: 0}, 700);
    });

    /**Header app button **/
    $('#header-app-btn').click(function (e) {
        e.stopPropagation();

        $(this).toggleClass('active');
        $('.header__menu-btn-container').toggleClass('active');
        $('.header__menu-btn-img').toggleClass('active');
    });
    
    $(document).click(function (e) {
        if (!$('#header-app-btn').is(e.target) && $('#header-app-btn').has(e.target).length === 0 &&
            !$('.header__menu-btn-container').is(e.target) && $('.header__menu-btn-container').has(e.target).length === 0) {
            $('#header-app-btn').removeClass('active');
            $('.header__menu-btn-container').removeClass('active');
            $('.header__menu-btn-img').removeClass('active');
        }
    });

    /** Lazy Video **/
    var lazyVideos = $('video.lazy');

    if ('IntersectionObserver' in window) {
        var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                var video = $(entry.target);

                if (entry.isIntersecting) {
                    if (!video.hasClass('loaded')) {
                        video.children('source').each(function () {
                            var videoSource = $(this);
                            videoSource.attr('src', videoSource.data('src'));
                        });

                        video[0].load();
                        video.removeClass('lazy');
                        video.addClass('loaded');
                    }

                    if (video[0].readyState >= 3 && video[0].paused) {
                        video[0].play().catch(function () {
                        });
                    }

                } else {
                    video[0].pause();
                }
            });
        }, {
            threshold: 0.7
        });

        lazyVideos.each(function () {
            lazyVideoObserver.observe(this);
        });
    }

    /** Scroll TOP **/
    $('#scroll-top').on('click', function () {
        $(this).removeClass('visible');
    });

    /** Attendance Cards **/
    $('.attendance-card--js').click(function () {
       $(this).toggleClass('checked');
    });

    /** Scroll Events **/
    $(window).on('scroll resize', lazyLoadBackground);

    let scrollTimer;

    $(window).on('scroll', function () {
        checkHeaderPosition();

        $('#scroll-top').removeClass('visible');
        clearTimeout(scrollTimer);

        scrollTimer = setTimeout(function () {
            checkTopBtnPosition();
        }, 200);
    });
});

/** Functions **/
function checkHeaderPosition() {
    if ($(window).scrollTop() > 0 || header.offset().top !== 0) {
        header.addClass('float');
    } else {
        header.removeClass('float');
    }
}

function mobileMenuToggle() {
    burgerBTN.toggleClass('active');

    mobileMenu.toggleClass('active');

    if (header.hasClass('float')) {
        header.removeClass('float');
    } else {
        checkHeaderPosition();
    }

    body.toggleClass('lock');
}

function checkTopBtnPosition() {
    let footer = $('#pricing');
    let scrollTopButton = $('#scroll-top');
    let windowHeight = $(window).height();
    let footerOffset = footer.offset().top;
    let scrollPosition = $(window).scrollTop();

    if (scrollPosition + windowHeight >= footerOffset) {
        scrollTopButton.addClass('visible');
    } else {
        scrollTopButton.removeClass('visible');
    }
}

function lazyLoadBackground() {
    $('.lazy-bg').each(function () {
        let $this = $(this);
        if ($this.is(':visible') && $this.offset().top < $(window).scrollTop() + $(window).height()) {
            let bg = $this.data('bg');
            if (bg) {
                $this.css({
                    'background-image': `url(${bg})`,
                    'opacity': 0
                }).animate({ opacity: 1 }, 400);
                $this.removeClass("lazy-bg");
            }
        }
    });
}


/*//Calendar
$('.meet--js').click(function () {
    openPopup();
});

function closePopup() {
    document.getElementById("popup").style.display = "none";

    let link = document.getElementById("flatpickr-css");
    if (link) {
        link.remove();
    }
}

function openPopup() {
    document.getElementById("popup").style.display = "flex";

    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./css/flatpickr.css";
    link.id = "flatpickr-css";
    document.head.appendChild(link);

    let script = document.createElement("script");
    script.src = "./js/flatpickr.js";
    script.id = "flatpickr-js";
    script.onload = function () {
        let today = new Date();
        let minDate = today;
        let maxDate = new Date().fp_incr(14);

        let calendar = flatpickr("#calendar", {
            inline: true,
            minDate: minDate,
            maxDate: maxDate,
            dateFormat: "Y-m-d",
            disableMobile: true,
            locale: {
                weekdays: {
                    shorthand: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                    longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                }
            },
            appendTo: document.getElementById("calendar"),
            disable: [
                function (date) {
                    return date.getDay() === 0 || date.getDay() === 6;
                }
            ],
            onReady: function (selectedDates, dateStr, instance) {
                setTimeout(() => disableUnavailableMonths(instance), 10);
            },
            onMonthChange: function (selectedDates, dateStr, instance) {
                setTimeout(() => disableUnavailableMonths(instance), 10);
            },
            onOpen: function (selectedDates, dateStr, instance) {
                setTimeout(() => disableUnavailableMonths(instance), 10);
            }
        });

        function disableUnavailableMonths(instance) {
            let monthSelect = instance.monthElements[0];

            if (monthSelect) {
                let options = monthSelect.children;
                let minMonth = minDate.getMonth();
                let maxMonth = maxDate.getMonth();
                let currentYear = new Date().getFullYear();

                for (let i = 0; i < options.length; i++) {
                    options[i].style.opacity = "1";
                    options[i].style.pointerEvents = "auto";
                    options[i].style.color = "#000";
                }

                for (let i = 0; i < options.length; i++) {
                    if (i < minMonth || i > maxMonth) {
                        options[i].style.opacity = "0.5";
                        options[i].style.pointerEvents = "none"
                    }
                }

                monthSelect.addEventListener("change", function () {
                    let selectedMonth = parseInt(monthSelect.value);

                    if (selectedMonth < minMonth || selectedMonth > maxMonth) {
                        instance.currentMonth = minMonth;
                        instance.redraw();
                    }
                });
            }
        }
    };

    document.head.appendChild(script);
}*/

