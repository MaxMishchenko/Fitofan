$(document).ready(function () {
    const burgerBTN = $('#burger');
    const mobileMenu = $('#mobile-menu');
    const body = $('body');

    header = $('#header');

    checkHeaderPosition();

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

    /** Video Control **/
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $video = $(entry.target);
            if (entry.isIntersecting) {
                // Якщо відео в області видимості, додаємо клас "visible" і запускаємо відтворення
                $video.addClass('visible');
                $video.prop('muted', true).trigger('play');
            } else {
                // Якщо відео виходить з області видимості, ставимо на паузу
                $video.removeClass('visible').trigger('pause');
            }
        });
    }, { threshold: 0.5 }); // Запускаємо, коли 50% відео в області видимості

// Спостерігаємо всі відео на сторінці
    $('video').each(function () {
        observer.observe(this);
    });


    /** Scroll Events **/
    $(window).on('scroll', function () {
        checkHeaderPosition();
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




$(document).ready(function () {
    let video = $("#hero-video")[0];
    let isReversed = false;
    let reverseInterval;

    function playReverse() {
        clearInterval(reverseInterval);
        reverseInterval = setInterval(() => {
            if (video.currentTime <= 0) {
                clearInterval(reverseInterval);
                isReversed = false;
                video.play();
            } else {
                video.currentTime -= 0.1;
            }
        }, 100);
    }

    $(video).on("ended", function () {
        isReversed = true;
        playReverse();
    });

    video.play();
});