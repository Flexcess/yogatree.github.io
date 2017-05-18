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
                    newHeight = ((window.outerWidth / aspectRatio) -10) + 'px';

                $self.css('height', newHeight);
                console.log('height (' + initialHeight + ') changed to: ' + newHeight)
            });
        }
    });
}
function offsetBannerInfo(){
    var offset = $('#header').is(':visible') ? $('#header').outerHeight() + 10 : $('#myTopnav .row').outerHeight() + 10;
    $('.mainBanner .info').css('margin-top', offset + 'px');
}
$(function(){
    offsetBannerInfo();
    resizeBGImageParents(); 
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
   $(window).scroll(function () {
       if (!$(window).scrollTop() && !$('#holder').is(':visible')) { 
           $('#header, #myTopnav').attr('style','background: transparent;top: 10px;padding-top: 0');
       }else{
           $('#header, #myTopnav').attr('style', 'background:rgba(255, 255, 255, 0.85); top: 0;padding-top: 5px');
       }
   });
   $(window).on('resize orientationchange', function () {
      $('.slick-slider').slick('resize');
      autoScrollVertical($('.slick-current.slick-active .description').scrollTop(0));
      resizeBGImageParents();
      offsetBannerInfo();
   });
   $(document).click(function (event) {
      if (!$(event.target).closest('#sidemenu').length && !($(event.target).is('.hamburger')))
      if ($('#sidemenu').is(":visible")) {
         $('.hamburger').removeClass('active');
         // $('#sidemenu').animate({ top: "-1000px" }, 500)
         $('#sidemenu').slideUp(function(){
            if(!$(window).scrollTop())
                $('#myTopnav').attr('style', 'background: transparent;top: 10px;padding-top: 0')
         });
      }
      if (!$(event.target).closest('.trainer').length && !($(event.target).is('.trainer')))
      if ($('.trainer.active').find('.text').is(":visible")) {
         $('.trainer.active').find('img').fadeIn();
         $('.trainer.active').removeClass('active');
      }
   })
   $('.hamburger').click(function () {
      if($(this).hasClass('active'))
          $('#sidemenu').slideUp(function () {
              if (!$(window).scrollTop())
                  $('#myTopnav').attr('style', 'background: transparent;top: 10px;padding-top: 0')
          });
      else{
        $('#myTopnav').attr('style', 'background:rgba(255, 255, 255, 0.85); top: 0;padding-top: 5px')
        $('#sidemenu').slideDown();
      }
      $('.hamburger').toggleClass('active');
   })

   $('a[href="#studio"], a[href="#classes"], a[href="#contact"]').click(function () {
      var top = $($(this).attr('href')).position().top;
      $('html,body').animate({ scrollTop: top }, 'fast');
      return false;
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
   $('.modal').click(function() {
      console.log("Clicked");
      $('body').removeClass('modal-open');
      $('.open').removeClass('open')
   })
});
var toggleModal = function(trainer) {
   console.log(trainer);
   if($('.modal-open')[0]) {
      $('body').removeClass('modal-open');
      $('.'+trainer).removeClass('open')
   } else {
      $('body').addClass('modal-open');
      $('.'+trainer).addClass('open')
   }
}
