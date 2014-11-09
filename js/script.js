/*
 * @author: Enoch Hsiao
 */

var o4l_scores = (function($) {
    var
        $scoreContainer,
        $scores,
        $postHeader,

        disable_active_scores = function() {
            $scoreContainer.addClass('o4l-no-active');
            $scores.each(function() {
                $(this).parent().removeClass('o4l-active-score');
            });
        },

        set_active = function(s) {
            $scoreContainer.removeClass('o4l-no-active');
            $scores.each(function() {
                $(this).parent().removeClass('o4l-active-score');
                if ($(this).attr('href') === s) {
                    $(this).parent().addClass('o4l-active-score');
                }
            });
        },

        scroll_to = function(s) {
            var target;
            if (s === '#') {
                target = 0;
            } else {
                target = $(s).offset().top - $postHeader.outerHeight();
            }

            $('html,body').animate({
                scrollTop: target
            }, 500);

            set_active(s);
            // $(window).scrollTop($(s).offset().top - $header.outerHeight());
        },

        init = function() {
            $scoreContainer = $('#o4l-post-score-container');
            $scores = $scoreContainer.find('a');
            $header = $('#o4l-header');
            $postHeader = $('#o4l-post-header');

            for (var i = 0; i < $scores.length; i++) {
                $($scores[i]).bind('click', function(e) {
                    if ($(this).attr('href').charAt(0) === '#') {
                        scroll_to($(this).attr('href'));
                        e.preventDefault();
                    }
                });
            }

            $header.waypoint(function(direction) {
                if (direction === 'down') {
                    $header.addClass('o4l-float-scores');
                    $postHeader.addClass('o4l-float-scores');
                } else {
                    $postHeader.removeClass('o4l-float-scores');
                    $header.removeClass('o4l-float-scores');
                    disable_active_scores();
                }
            }, {offset: -$header.outerHeight()});
        };

    return {
        init: init
    };
})(jQuery);

jQuery(function() {
    o4l_scores.init();
});
