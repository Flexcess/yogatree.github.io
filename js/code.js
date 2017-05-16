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
function resizeBGImageParents() {
    $('.mainBanner').each(function () {
        var imageSrc = $(this).css('background-image'),
            image_url = imageSrc.match(/^url\("?(.+?)"?\)$/),
            $self = $(this);

        if (image_url[1]) {
            image_url = image_url[1];
            image = new Image();
            image.src = image_url;

            $(image).load(function () {
                debugger;
                var aspectRatio = this.width / this.height,
                    initialHeight = $self.outerHeight(),
                    newHeight = ((window.outerWidth / aspectRatio) -50) + 'px';

                $self.css('height', newHeight);
                console.log('height (' + initialHeight + ') changed to: ' + newHeight)
            });
        }
    });
}
$(function(){
    resizeBGImageParents(); 
    $('#sidemenu').hide();
    $('.main.slick-slider').slick({
        // autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        // adaptiveHeight: true,
    });

    $('.testimonial-parent.slick-slider').slick({
        autoplay: true,
        autoplaySpeed: 10000,
        dots: true,
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
            $('#sidemenu').slideUp();
        else
            $('#sidemenu').slideDown();
        $('.hamburger').toggleClass('active');
    })

    $('a[href="#studio"], a[href="#classes"], a[href="#contact"]').click(function () {
        var top = $($(this).attr('href')).position().top;
        $('html,body').animate({ scrollTop: top }, 'fast');

        return false;
    });
    $('.trainer').click(function(){
        $('.trainer.active').not($(this)).find('img').fadeIn(500).end().removeClass('active');
        if (!$(this).find('.text').is(':empty')){
            if (!$(this).hasClass('active')){
                $(this).find('img').fadeOut(500);
            } else{
                $(this).find('img').fadeIn(500);
            }
            $(this).toggleClass('active');
        }
    });
    $("#submit").click(function () {
        $('[data-required = true]').each(function () {
            if (!$(this).val().length) {
                alert('Please enter a value for ' + $(this).attr('label'));
                return false;
            }
            function validateEmail(email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }

            if (!validateEmail($('input[name="email"]').val())) {
                alert('Please enter a valid email');
                return false;
            }
        });
        var jsonObj = {};
        debugger;
        $('form[name="contact"] [name]').each(function () {
            var prop = $(this).attr('name');
            jsonObj[prop] = $(this).val()
        });
        $.ajax({
            type: "POST",
            url: (location.href.substring(0, location.href.lastIndexOf("/") + 1)) + "send-mail.php",
            data: {
                action: 'post',
                json: JSON.stringify(jsonObj),
            },
            success: function (output) {
                debugger;
                console.log(output);
                if (output == 'Mail Sent Successfully') {
                    alert('An email has been send with your details');
                    $('form[name="contact"] [name]').val('');
                } else {
                    alert('Failed while sending an email!');
                }
            }
        });
        return false;
    });
    $(window).on('resize orientationchange', function () {
        resizeBGImageParents();
    });
});
