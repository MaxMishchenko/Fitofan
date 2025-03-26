$(document).ready(function () {
    body = $('body');
    burgerBTN = $('#burger');
    mobileMenu = $('#mobile-menu');
    mobileMenuLink = $('.mobile__menu-nav a');
    header = $('#header');

    checkHeaderPosition();

    checkTopBtnPosition();

    lazyLoadBackground();

    localStorage.clear();

    prepareCalendarData();

    /** Burger **/
    burgerBTN.add(mobileMenuLink).on('click', mobileMenuToggle);

    /** Smooth anchors scroll **/
    $("a[href^='#']").on("click", function (event) {
        event.preventDefault();

        let targetId = $(this).attr("href").substring(1);
        let targetElement = $("[data-id='" + targetId + "']").filter(":visible");

        if (targetElement.length) {
            $("html, body").scrollTop(targetElement.offset().top - 100);
        }
    });

    /** Scroll to top **/
    $('#scroll-top').on('click', function (e) {
        e.preventDefault();

        $('html, body').scrollTop(0);
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

    /** Shake Animation**/
    setInterval(function () {
        let chatIcon = $('#floating-chat');

        if (!chatIcon.is(':hover')) {
            chatIcon.addClass('shake');

            setTimeout(function () {
                chatIcon.removeClass('shake');
            }, 500);
        }
    }, 4000);

    /** Lazy Video **/
    /*var lazyVideos = $('video.lazy');

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
    }*/

    /** Scroll TOP **/
    $('#scroll-top').on('click', function () {
        $(this).removeClass('visible');
    });

    /** Attendance Cards **/
    $('.attendance-card--js').click(function () {
        $(this).toggleClass('checked');
    });

    /*** Slider **/
    let wrapper = $('.testimonials__testimonial-wrapper');
    let images = $('.testimonials__slide');
    let index = 0;
    let interval = 5000;

    function slideTestimonials() {
        let first = $('.testimonials__testimonial').first();
        let second = first.next();
        let activeSlide = second.attr('data-slide');

        $('[data-dot]').removeClass('active');

        first.animate({marginLeft: '-100%', opacity: 0}, 1000, function () {
            $(this).remove().css({marginLeft: '0', opacity: 1});
            wrapper.append($(this));
            $('[data-dot="' + activeSlide + '"]').addClass('active');
        });

        second.css({opacity: 0}).animate({opacity: 1}, 1000);
    }

    setInterval(slideTestimonials, interval);

    function fadeImages() {
        let nextIndex = (index + 1) % images.length;
        images.eq(index).removeClass('active');
        images.eq(nextIndex).addClass('active');
        index = nextIndex;
    }

    setInterval(fadeImages, interval);

    /** Blobs Animation **/
    const MIN_SPEED = 0.8;
    const MAX_SPEED = 2.4;

    let COLORS = [
        {color: '#BC4E1F', size: "18vw"},
        {color: '#115266', size: "20vw"},
        {color: '#AC37C2', size: "19vw"},
        {color: '#925A18', size: "35vw"},
        {color: '#193C37', size: "26vw"},
        {color: '#420B3E', size: "14vw"},
        {color: '#0B7871', size: "30vw"},
        {color: '#962213', size: "27vw"},
        {color: '#115266', size: "24vw"}
    ];

    class Blob {
        constructor($container, config) {
            this.$el = $('<div>').addClass('blob').appendTo($container);
            this.size = config.size;
            this.color = config.color;
            this.initialX = randomNumber(0, $container.width() - parseFloat(this.size));
            this.initialY = randomNumber(0, $container.height() - parseFloat(this.size));

            this.$el.css({
                position: "absolute",
                width: this.size,
                height: this.size,
                borderRadius: "50%",
                background: this.color,
                top: `${this.initialY}px`,
                left: `${this.initialX}px`,
                opacity: 0.7,
                zIndex: config.zIndex || 1
            });

            this.vx = randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
            this.vy = randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
            this.x = this.initialX;
            this.y = this.initialY;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x >= this.$el.parent().width() - parseFloat(this.size) || this.x <= 0) {
                this.vx *= -1;
            }
            if (this.y >= this.$el.parent().height() - parseFloat(this.size) || this.y <= 0) {
                this.vy *= -1;
            }
        }

        move() {
            this.$el.css("transform", `translate(${this.x - this.initialX}px, ${this.y - this.initialY}px)`);
        }
    }

    function initBlobs() {
        const $container = $('#animated-bg');
        const blobs = COLORS.map(config => new Blob($container, config));

        function update() {
            requestAnimationFrame(update);
            blobs.forEach(blob => {
                blob.update();
                blob.move();
            });
        }

        requestAnimationFrame(update);
    }

    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    initBlobs();

    /** Calendar **/
    $('.meet--js').click(function () {
        $('body').addClass('lock');

        openPopup();
    });

    $('.popup__time-item').click(function () {
        if ($(this).hasClass('chosen')) {
            $(this).removeClass('chosen');
            localStorage.setItem('selected_time', '');
        } else {
            $('.popup__time-item').removeClass('chosen');
            $(this).addClass('chosen');
            localStorage.setItem('selected_time', $(this).text());
        }

        $('#back-btn').toggleClass('visible');
        $('#next-btn').toggleClass('time disabled btn--filled').prop('disabled', function (i, val) {
            return !val;
        });
    });

    function dataConverter() {
        let selectedTime = localStorage.getItem('selected_time');
        let newTime = addMinutesToTime(selectedTime, 30);
        let resultTime = selectedTime + ' - ' + newTime;

        $('#result-time').text(resultTime);

        let selectedDay = localStorage.getItem('selected_day');
        const daysOfWeek = {
            'Sun': 'Sunday',
            'Mon': 'Monday',
            'Tue': 'Tuesday',
            'Wed': 'Wednesday',
            'Thu': 'Thursday',
            'Fri': 'Friday',
            'Sat': 'Saturday'
        };

        function formatDate(dateString) {
            let dateParts = dateString.split(', ');
            let dayOfWeekShort = dateParts[0];
            let dateParts2 = dateParts[1].split(' ');
            let month = dateParts2[0];
            let day = dateParts2[1];
            let currentYear = new Date().getFullYear();
            let year = currentYear;
            let formattedDate = `${day} ${month} ${year}`;
            let fullDay = daysOfWeek[dayOfWeekShort];

            return {
                fullDay: fullDay,
                formattedDate: formattedDate
            };
        }

        let result = formatDate(selectedDay);

        $('#result-day').text(result.fullDay);
        $('#result-date').text(result.formattedDate);
    }

    $('#next-btn').on('click', function () {
        if ($('.popup__time-item').hasClass('chosen')) {
            $('.popup__content-subtitle').hide();
            $('#selected-day').hide();
            $('#selected-title').hide();
            $('#time').hide();
            $('#next-btn').hide();

            $('#selected-data').show();
            $('.popup__form').addClass('visible');
            $('#send-btn').addClass('visible');
            $('#back-btn').addClass('visible');

            dataConverter();
        } else {
            $('.flatpickr-calendar').hide();
            $('.popup__time').show();
            $('.popup__time-item').removeClass('chosen');

            if ($('.popup__time').is(':visible')) {
                $('#next-btn').addClass('time disabled').removeClass('btn--filled').prop('disabled', true);
                $('#back-btn').addClass('visible');
                $('#selected-day').text(localStorage.getItem('selected_day')).show();
                $('#selected-title').text('Select Time');
            } else {
                $('#selected-day').hide();
            }
        }
    });

    $('#d-next-btn').click(function () {
        $(this).hide();
        $('#selected-data').show();
        $('#d-selected-title').hide();
        $('#calendar').hide();
        $('.popup__form').addClass('visible');
        $('#d-back-btn').show();
        $('#d-send-btn').addClass('visible');

        dataConverter();
    });

    $('#back-btn').on('click', function () {
        clearForm('form');

        if ($('.popup__form').hasClass('visible')) {
            $('.popup__form').removeClass('visible');
            $('#selected-data').hide();
            $('#send-btn').removeClass('visible');

            $('#next-btn').addClass('time disabled').prop('disabled', true).show();
            $('.popup__content-subtitle').show();
            $('#selected-day').show();
            $('#time').show();
            $('#selected-title').text('Select Time').show();
            $('.popup__time-item').removeClass('chosen');

        } else {
            $('.flatpickr-calendar').show();
            $('.popup__time').hide();
            $('#back-btn').removeClass('visible');
            $('#next-btn').removeClass('time').prop('disabled', false);
            $('#selected-title').text('Select Day');
            localStorage.clear();
            $('#selected-day').hide();
            $('.flatpickr-day').removeClass('selected');
        }
    });

    $('#d-back-btn').click(function () {
        $(this).hide();
        $('#d-next-btn').show();
        $('#selected-data').hide();
        $('#d-selected-title').show();
        $('#calendar').show();
        $('.popup__form').removeClass('visible');
        $('#d-send-btn').removeClass('visible');
    });

    function prepareCalendarData() {
        $('.popup__time-item').removeClass('chosen');
        $('.flatpickr-day').removeClass('selected');
        $('#selected-title').text('Select Day');
        $('#next-btn').removeClass('time').addClass('disabled').prop('disabled', true);
        $('#back-btn').removeClass('visible');

        if (!$('.popup__time').is(':visible')) {
            $('#selected-day').hide();
        }
    }

    function clearForm(formSelector) {
        $(formSelector).find('input, textarea').val('');
        $(formSelector).find('input[type="checkbox"], input[type="radio"]').prop('checked', false);
        $(formSelector).find('select').prop('selectedIndex', 0);
        $(formSelector).find('input, textarea, .popup__field-wrapper').removeClass('alert clear field--error');
    }

    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return hours + ':' + minutes + ' ' + ampm;
    }

    function addMinutesToTime(time, minutesToAdd) {
        let timeParts = time.split(' ');
        let [hours, minutes] = timeParts[0].split(':');
        let period = timeParts[1];

        hours = parseInt(hours);
        minutes = parseInt(minutes);

        if (period === 'PM' && hours !== 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }

        let date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setMinutes(date.getMinutes() + minutesToAdd);

        return formatTime(date);
    }

    function checkRequiredFields() {
        let allFilled = true;
        let hasAlert = $('.popup__field-wrapper.alert').length > 0;

        $('input[required], textarea[required], select[required]').each(function () {
            if ($(this).val().trim() === '') {
                allFilled = false;
                return false;
            }
        });

        let disableButtons = !allFilled || hasAlert;

        $('#send-btn').toggleClass('disabled', disableButtons);
        $('#send-btn').toggleClass('btn--filled', !disableButtons);
        $('#send-btn').prop('disabled', disableButtons);

        $('#d-send-btn').toggleClass('disabled', disableButtons);
        $('#d-send-btn').toggleClass('btn--filled', !disableButtons);
        $('#d-send-btn').prop('disabled', disableButtons);
    }

    $('input[required], textarea[required], select[required]').on('input change', checkRequiredFields);

    $('#close-popup').click(function () {
        closePopup();
    });

    function closePopup() {
        $('#popup').hide();
        $('body').removeClass('lock');
        $('.popup__form').removeClass('visible');
        $('#send-btn').removeClass('visible btn--filled').addClass('disabled').prop('disabled', true);
        $('#d-send-btn').removeClass('visible btn--filled').addClass('disabled').prop('disabled', true);
        $('#d-back-btn').hide();
        $('#selected-data').hide();
        $('#selected-title').show();
        $('#next-btn').removeClass('time btn--filled').addClass('disabled').prop('disabled', true).removeAttr('style');
        $('#d-next-btn').removeClass('time btn--filled').addClass('disabled').prop('disabled', true).removeAttr('style');
        $('.popup__content-subtitle').show();
        clearForm('form');
        $('.custom-month').removeClass('open');
        $('.custom-month-list').removeClass('visible');
        $('.flatpickr-prev-month').removeAttr('style');
        $('.flatpickr-next-month').removeAttr('style');

        $('#flatpickr-css').remove();
        localStorage.clear();

        prepareCalendarData();
    }

    function toggleNextButton() {
        if ($('.flatpickr-calendar:visible').length > 0 &&
            $('.popup__time:visible').length > 0 &&
            $('.flatpickr-day.selected').length > 0 &&
            $('.popup__time-item.chosen').length > 0) {

            $('#d-next-btn').removeClass('disabled').addClass('btn--filled').prop('disabled', false);
        } else {
            $('#d-next-btn').addClass('disabled').removeClass('btn--filled').prop('disabled', true);
        }
    }

    $(document).on('click', '.flatpickr-day, .popup__time-item', toggleNextButton);
    $(document).on('click', '.flatpickr-calendar, .popup__time', toggleNextButton);

    $(document).on('click', '.custom-month', function () {
        $(this).toggleClass('open');

        $('.custom-month-list').toggleClass('visible');
        $('.flatpickr-prev-month').toggle();
        $('.flatpickr-next-month').toggle();
    });

    $(document).on('click', '.custom-month-item:not(.disabled)', function () {
        let selectedShortMonth = $(this).text();
        let calendarInstance = $("#calendar").get(0)._flatpickr;

        if (!calendarInstance) return;

        let allMonthsFull = calendarInstance.l10n.months.longhand;
        let selectedMonthIndex = allMonthsFull.findIndex(month => month.startsWith(selectedShortMonth));

        if (selectedMonthIndex !== -1) {
            calendarInstance.changeMonth(selectedMonthIndex - calendarInstance.currentMonth);
        }

        $('.custom-month').toggleClass('open');
        $('.custom-month-list').toggleClass('visible');
        $('.flatpickr-prev-month').toggle();
        $('.flatpickr-next-month').toggle();
    });


    function openPopup() {
        $('#popup').css('display', 'flex');
        $('.popup__calendar').show();

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
                showMonths: 1,
                locale: {
                    weekdays: {
                        shorthand: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                    }
                },
                prevArrow: "<img style='transform: rotate(180deg);' width='24' height='24' src='./img/icons/icon_chevron_right.svg' alt='Next Month'>",
                nextArrow: "<img width='24' height='24' src='./img/icons/icon_chevron_right.svg' alt='Next Month'>",
                appendTo: document.getElementById("calendar"),
                disable: [
                    function (date) {
                        return date.getDay() === 0 || date.getDay() === 6;
                    }
                ],
                onReady: function (selectedDates, dateStr, instance) {
                    setTimeout(() => disableUnavailableMonths(instance), 10);
                    addCustomMonth(instance);
                    enableAvailableMonths(instance);

                    $("#calendar .flatpickr-calendar").prependTo(".popup__calendar-wrapper");

                    prepareCalendarData();

                    $('#success').removeAttr('style');
                },
                onMonthChange: function (selectedDates, dateStr, instance) {
                    setTimeout(() => disableUnavailableMonths(instance), 10);
                    updateCustomMonth(instance);
                    enableAvailableMonths(instance);

                    $(".flatpickr-day.selected").removeClass("selected");
                    $("#next-btn").removeClass("btn--filled").addClass("disabled").prop('disabled', true);
                    $('.popup__time-item').removeClass('chosen');
                },
                onOpen: function (selectedDates, dateStr, instance) {
                    setTimeout(() => disableUnavailableMonths(instance), 10);
                    instance.clear();
                    prepareCalendarData();

                    $('#success').removeAttr('style');
                },
                onChange: function (selectedDates, dateStr, instance) {
                    $(".flatpickr-day.today").removeClass("today");
                    $("#next-btn").removeClass("disabled").addClass("btn--filled").prop('disabled', false);

                    if (selectedDates.length > 0) {
                        let formattedDate = selectedDates[0].toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "2-digit",
                            year: "numeric"
                        });

                        localStorage.setItem("selected_day", formattedDate);
                    }

                    toggleNextButton();
                }
            });

            function enableAvailableMonths(instance) {
                let minMonth = instance.config.minDate.getMonth();
                let maxMonth = instance.config.maxDate.getMonth();
                let allMonthsFull = instance.l10n.months.longhand;
                let allMonthsShort = allMonthsFull.map(month => month.substring(0, 3));

                $('.custom-month-item').each(function () {
                    let shortMonth = $(this).text();
                    let monthIndex = allMonthsShort.indexOf(shortMonth);

                    if (monthIndex >= minMonth && monthIndex <= maxMonth) {
                        $(this).removeClass('disabled');
                    }
                });
            }

            function addCustomMonth(instance) {
                const monthContainer = instance.calendarContainer.querySelector('.flatpickr-month');

                if (!monthContainer) return;

                const customMonth = document.createElement('span');
                customMonth.classList.add('custom-month');
                monthContainer.prepend(customMonth);

                updateCustomMonth(instance);
            }

            function updateCustomMonth(instance) {
                const customMonth = instance.calendarContainer.querySelector('.custom-month');
                if (!customMonth) return;

                const month = instance.l10n.months.longhand[instance.currentMonth];
                const year = instance.currentYear;

                customMonth.textContent = `${month} ${year}`;
            }

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
        }

        document.head.appendChild(script);
    }

    /** Form fields validation and submission **/
    $('#success-close').click(function () {
        $('#success').removeAttr('style');

        closePopup();

        $('.popup__content').show();
    });

    $('.popup__form-field').on('input', function () {
        let parentWrapper = $(this).closest('.popup__field-wrapper');

        if ($(this).val().length >= 3) {
            parentWrapper.addClass('clear');
        } else {
            parentWrapper.removeClass('clear');
        }
    });

    $(document).on('click', '.clear', function (event) {
        const $this = $(this);

        if ($this.hasClass('alert')) {
            return;
        }

        const rect = this.getBoundingClientRect();

        if (event.clientX > rect.right - 35) {
            $this.find('.popup__form-field').val('').trigger('input');
        }
    });

    const API_URL = 'https://jsonplaceholder.typicode.com/posts'; //CHANGE!
    const HASHTOKEN = '7BRltAlHPDGAXfQAf0hdIFpRG9aVBlC9'; //CHANGE!
    const sendBtns = document.querySelectorAll('#send-btn, #d-send-btn');

    sendBtns.forEach(btn => {
        btn.addEventListener('click', async (event) => {
            event.preventDefault();

            const form = document.querySelector('.popup__form');
            let isValid = true;
            let firstInvalidField = null;

            const emailInputs = form.querySelectorAll('input[type="email"]');
            const inputs = form.querySelectorAll('input, textarea, select');

            inputs.forEach(input => {
                const parentWrapper = input.closest('.popup__field-wrapper');
                input.classList.remove('field--error');
                parentWrapper?.classList.remove('alert');

                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('field--error');
                    $('#d-send-btn').prop('disabled', true);
                    $('#send-btn').prop('disabled', true);
                    $('#d-send-btn').toggleClass('btn--filled disabled');
                    $('#send-btn').toggleClass('btn--filled disabled');
                    parentWrapper?.classList.add('alert');
                    if (!firstInvalidField) firstInvalidField = input;
                } else if (input.pattern && !new RegExp(input.pattern).test(input.value)) {
                    isValid = false;
                    $('#d-send-btn').prop('disabled', true);
                    $('#send-btn').prop('disabled', true);
                    $('#d-send-btn').toggleClass('btn--filled disabled');
                    $('#send-btn').toggleClass('btn--filled disabled');
                    input.classList.add('field--error');
                    parentWrapper?.classList.add('alert');
                    if (!firstInvalidField) firstInvalidField = input;
                }
            });

            emailInputs.forEach(emailInput => {
                const parentWrapper = emailInput.closest('.popup__field-wrapper');
                emailInput.classList.remove('field--error');
                parentWrapper?.classList.remove('alert');

                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    isValid = false;
                    emailInput.classList.add('field--error');
                    parentWrapper?.classList.add('alert');
                    $('#d-send-btn').prop('disabled', true);
                    $('#send-btn').prop('disabled', true);
                    $('#d-send-btn').toggleClass('btn--filled disabled');
                    $('#send-btn').toggleClass('btn--filled disabled');
                    if (!firstInvalidField) firstInvalidField = emailInput;
                }
            });

            if (!isValid) {
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
                return;
            }

            async function getUnixTimestampFromStorage() {
                let selectedDay = localStorage.getItem('selected_day');
                let selectedTime = localStorage.getItem('selected_time');

                if (!selectedDay || !selectedTime) return null;

                let fullDateTimeString = `${selectedDay} ${selectedTime} UTC`;
                let date = new Date(fullDateTimeString);

                if (isNaN(date.getTime())) {
                    console.error('Invalid date format:', fullDateTimeString);
                    return null;
                }

                return Math.floor(date.getTime() / 1000);
            }

            let countryCode = '';
            let timezone = '';

            try {
                const response = await fetch('https://geolocation-db.com/json/');
                const data = await response.json();
                countryCode = data.country_code;
                timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            } catch (error) {
                console.error('Error fetching location data:', error);
            }

            let targetDate = await getUnixTimestampFromStorage();
            const formData = new FormData(form);

            const formDataObject = {
                ...Object.fromEntries(formData.entries()),
                target_date: targetDate || '',
                country_code: countryCode || '',
                timezone: timezone || '',
                hashtoken: HASHTOKEN,
            };

            console.log("Form data to be sent:", formDataObject); //REMOVE!

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formDataObject),
                });

                const result = await response.json();
                console.log('API Response:', result); //REMOVE!

                form.reset();

                sendBtns.forEach(btn => {
                    btn.disabled = true;
                });

                $('.popup__content').hide();
                $('#success').show();
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        });
    });

    document.querySelectorAll('.popup__form-field').forEach(input => {
        input.addEventListener('input', function () {
            const parentWrapper = this.closest('.popup__field-wrapper');
            let isValid = true;

            if (this.hasAttribute('required') && !this.value.trim()) {
                isValid = false;
            } else if (this.pattern && !new RegExp(this.pattern).test(this.value)) {
                isValid = false;
            } else if (this.type === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(this.value)) {
                    isValid = false;
                }
            }

            if (isValid) {
                this.classList.remove('field--error');
                parentWrapper?.classList.remove('alert');
            }
        });
    });

    /** Scroll Events **/
    $(window).resize(function () {
        if ($('#popup').attr('style')) {
            closePopup();
        }
    });

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
                }).animate({opacity: 1}, 400);
                $this.removeClass("lazy-bg");
            }
        }
    });
}