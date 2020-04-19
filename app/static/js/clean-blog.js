(function($) {
  "use strict"; // Start of use strict

  // Floating label headings for the contact form
  $("body").on("input propertychange", ".floating-label-form-group", function(e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
  }).on("focus", ".floating-label-form-group", function() {
    $(this).addClass("floating-label-form-group-with-focus");
  }).on("blur", ".floating-label-form-group", function() {
    $(this).removeClass("floating-label-form-group-with-focus");
  });

  // Show the navbar when the page is scrolled up
  var MQL = 992;

  //primary navigation slide-in effect
  if ($(window).width() > MQL) {
    var headerHeight = $('#mainNav').height();
    $(window).on('scroll', {
        previousTop: 0
      },
      function() {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('#mainNav').hasClass('is-fixed')) {
            $('#mainNav').addClass('is-visible');
          } else {
            $('#mainNav').removeClass('is-visible is-fixed');
          }
        } else if (currentTop > this.previousTop) {
          //if scrolling down...
          $('#mainNav').removeClass('is-visible');
          if (currentTop > headerHeight && !$('#mainNav').hasClass('is-fixed')) $('#mainNav').addClass('is-fixed');
        }
        this.previousTop = currentTop;
      });
  }

    var next_page_wait = false;
    var page_num = 1;

    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight >= scrollHeight - 150 && next_page_wait == false) {
            var url = '/page/' + page_num;
            console.log(url);
            next_page_wait = true;
            $('#page').append($('<div class="vbox" id="loader"><div data-loader="rectangle"></div></div>'));

            $.get(url, function (result, status) {
                if ('success' == status) {
                    $('#loader').remove();

                    for (var i in result) {
                        var $div=$('<div class="post-preview"><a href="" target="_blank"><h2 class="post-title"></h2><h3 class="post-subtitle"></h3></a><p class="post-meta">Posted by<a href="#">Start Bootstrap</a>on September 24, 2019</p></div><hr>');
                        $div.find('a').attr('href', result[i].url);
                        $div.find('a h2').text(result[i].title);
                        $div.find('a h3').text(result[i].subtitle);
                        $('#page').append($div);
                    }
                    next_page_wait = false;
                    page_num += 1;

                }
            }, "json");
        }
   });

})(jQuery); // End of use strict
