$(document).ready(function () {
    const burgerBTN = $('#burger');

    checkHeaderPosition();

    /** Burger **/
    burgerBTN.on('click', function () {
        $(this).toggleClass('active');
    });

    /** Smooth anchors scroll **/
    $('a[href*=\\#]:not([href=\\#])').click(function () {
        if (($(this).attr('href').substr(1)) != null) {
            $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top - 80}, 1200);
        }

        return false;
    });

    $(window).on('scroll', function () {
        checkHeaderPosition();
    });
});

function checkHeaderPosition() {
    if ($(window).scrollTop() > 0 || $('#header').offset().top !== 0) {
        $('#header').addClass('float');
    } else {
        $('#header').removeClass('float');
    }
}
