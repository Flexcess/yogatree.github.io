$(function(){
        $('.slick-slider').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            // mobileFirst: true,
        });
        $(window).on('resize orientationchange', function () {
            $('.slick-slider').slick('resize');
        });
});