function autoScrollVertical(div){
    div.bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function (evt) {
        if (evt.type === 'DOMMouseScroll' || evt.type === 'keyup' || evt.type === 'mousewheel') {

        }
        if (evt.originalEvent.detail < 0 || (evt.originalEvent.wheelDelta && evt.originalEvent.wheelDelta > 0)) {
            clearInterval(scrollbit);
        }
        if (evt.originalEvent.detail > 0 || (evt.originalEvent.wheelDelta && evt.originalEvent.wheelDelta < 0)) {
            clearInterval(scrollbit);
        }
    });

    var scrollbit = setInterval(function () {
        var pos = div.scrollTop();
        if ((div.scrollTop() + div.innerHeight()) >= div[0].scrollHeight) {
            clearInterval(scrollbit);
        }
        div.scrollTop(pos + 1);
    }, 250);
}
$(function(){
        $('#sidemenu').hide();
        $('.main.slick-slider').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: false,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
        });

        $('.testimonial-parent.slick-slider').slick({
            autoplay: true,
            autoplaySpeed: 10000,
            dots: false,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
        });
        autoScrollVertical($(".t1 .description"));
        $('.testimonial-parent.slick-slider').on("afterChange", function () {
            $(".t" + (arguments[2] == 0 ? '11' : (arguments[2] + 1) ) + " .description").scrollTop(0);
            var div = $(".t" + (arguments[2] + 1) + " .description");

            autoScrollVertical(div);
        });
        $(window).on('resize orientationchange', function () {
            $('.slick-slider').slick('resize');
            autoScrollVertical($('.slick-current.slick-active .description').scrollTop(0));
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
                    $('.trainer.active').find('img').fadeIn();
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
            $('.trainer.active').not($(this)).find('img').fadeIn().end().removeClass('active');
            if (!$(this).hasClass('active')){
                $(this).find('img').fadeOut();
            }else{
                $(this).find('img').fadeIn();
            }
            $(this).toggleClass('active');
        })
});