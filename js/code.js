

$(function(){
        $('#sidemenu').hide();
        $('.main.slick-slider').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
        });
        $('.testimonial-parent.slick-slider').slick({
            autoplay: true,
            autoplaySpeed: 7000,
            dots: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
        });
        $(window).on('resize orientationchange', function () {
            $('.slick-slider').slick('resize');
        });
        $(document).click(function (event) {
            if (!$(event.target).closest('#sidemenu').length && !($(event.target).is('.hamburger'))) 
                if ($('#sidemenu').is(":visible")) {
                    $('.hamburger').removeClass('active');
                    // $('#sidemenu').animate({ top: "-1000px" }, 500)  
                    $('#sidemenu').slideUp();  
                }
            if (!$(event.target).closest('.trainer').length && !($(event.target).is('.trainer')))
                if ($('.trainer.active').find('.text').is(":visible")) {
                    $('.trainer.active').removeClass('active');
                }
        })
        $('.hamburger').click(function () {
            if($(this).hasClass('active'))
                // $('#sidemenu').animate({ top: "-1000px" }, 500)   
                $('#sidemenu').slideUp();  
            else
                $('#sidemenu').slideDown();  
                // $('#sidemenu').animate({ top: "140px" }, 500)
            $('.hamburger').toggleClass('active');
        })

        $('a[href="#studio"], a[href="#classes"], a[href="#contact"]').click(function () {
            var top = $($(this).attr('href')).position().top;
            $('html,body').animate({ scrollTop: top }, 'fast');

            return false;
        });
        $('.trainer').click(function(){
            $('.trainer.active').removeClass('active');
            $(this).toggleClass('active');
        })
});