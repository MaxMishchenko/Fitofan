$(document).ready(function () {
    const burgerBTN = $('#burger');
    const mobileMenu = $('#mobile-menu');
    const body = $('body');

    header = $('#header');

    checkHeaderPosition();

    checkTopBtnPosition();

    /** Burger **/
    burgerBTN.on('click', function () {
        $(this).toggleClass('active');
        mobileMenu.toggleClass('active');

        if (header.hasClass('float')) {
            header.removeClass('float');
        } else {
            checkHeaderPosition();
        }

        body.toggleClass('lock');
    });

    /** Smooth anchors scroll **/
    $('a[href*=\\#]:not([href=\\#])').click(function () {
        if (($(this).attr('href').substr(1)) != null) {
            $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top - 80}, 1200);
        }

        return false;
    });

    /*** Scroll to top **/
    $('#scroll-top').on('click', function(e) {
        e.preventDefault();

        $('html, body').animate({ scrollTop: 0 }, 700);
    });


    /** Lazy Video **/
    var lazyVideos = $('video.lazy');

    if ('IntersectionObserver' in window) {
        var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                var video = $(entry.target);

                if (entry.isIntersecting) {
                    if (!video.hasClass('loaded')) {
                        video.children('source').each(function() {
                            var videoSource = $(this);
                            videoSource.attr('src', videoSource.data('src'));
                        });

                        video[0].load();
                        video.removeClass('lazy');
                        video.addClass('loaded');
                    }

                    if (video[0].readyState >= 3 && video[0].paused) {
                        video[0].play().catch(function() {});
                    }

                } else {
                    video[0].pause();
                }
            });
        }, {
            threshold: 0.7
        });

        lazyVideos.each(function() {
            lazyVideoObserver.observe(this);
        });
    }

    /** Scroll TOP **/
    $('#scroll-top').on('click', function () {
        $(this).removeClass('visible');
    });

    /** Scroll Events **/
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

