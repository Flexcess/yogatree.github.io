

$(function(){
        $('.main.slick-slider').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
        });
        $('.bg-testimonial .slick-slider').slick({
            autoplay: true,
            autoplaySpeed: 7000,
            dots: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
        });
        $(window).on('resize orientationchange', function () {
            $('.slick-slider').slick('resize');
        });
        $(document).click(function (event) {
            if (!$(event.target).closest('#sidemenu').length && !($(event.target).is('.hamburger'))) {
                if ($('#sidemenu').is(":visible")) {
                    $('.hamburger').removeClass('active');
                    $('#sidemenu').animate({ right: "-1000px" }, 500)  
                }
            }
        })
        $('.hamburger').click(function () {
            if($(this).hasClass('active'))
                $('#sidemenu').animate({ right: "-1000px" }, 500)   
            else
                $('#sidemenu').animate({ right: "0" }, 500)
            $('.hamburger').toggleClass('active');
        })

        $('a[href="#studio"], a[href="#classes"], a[href="#contact"]').click(function () {
            var top = $($(this).attr('href')).position().top;
            $('html,body').animate({ scrollTop: top }, 'fast');

            return false;

        });
});