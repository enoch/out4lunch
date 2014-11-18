/*
 * @author: Enoch Hsiao
 */

var o4l_scores = (function($) {
    var
        $scoreContainer,
        $scores,
        $postHeader,
        $sections,

        disable_active_scores = function() {
            $scoreContainer.addClass('o4l-no-active');
            $scores.each(function() {
                $(this).parent().removeClass('o4l-active-score');
            });
        },

        set_active = function(s) {
            var success = false;

            $scoreContainer.removeClass('o4l-no-active');
            $scores.each(function() {
                $(this).parent().removeClass('o4l-active-score');
                if ($(this).attr('href') === s) {
                    $(this).parent().addClass('o4l-active-score');
                    success = true;
                }
            });

            return success;
        },

        scroll_to = function(s) {
            var target;
            if (s === '#') {
                target = 0;
            } else {
                target = $(s).offset().top - $postHeader.outerHeight();
            }

            $sections.waypoint('disable');

            $('html,body').animate({
                scrollTop: target
            }, 500, function(s) {
                $sections.waypoint('enable');
            });

            set_active(s);
            // $(window).scrollTop($(s).offset().top - $header.outerHeight());
        },

        init = function() {
            $scoreContainer = $('#o4l-post-score-container');
            $scores = $scoreContainer.find('a');
            $header = $('#o4l-header');
            $postHeader = $('#o4l-post-header');
            $sections = $('.o4l-post-section');

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

            $sections.waypoint(function(direction) {
                if (direction === 'down') {
                    if (!set_active('#'+$(this).attr('id'))) {
                        disable_active_scores();
                    }
                }
            }, {offset: $postHeader.outerHeight()});

            $sections.waypoint(function(direction) {
                if (direction === 'up') {
                    if ($(this).prev('.o4l-post-section').length > 0) {
                        if (!set_active('#'+$($(this).prev('.o4l-post-section')[0]).attr('id'))) {
                            disable_active_scores();
                        }
                    }
                }
            }, {offset: $postHeader.outerHeight() + 100});
        };

    return {
        init: init
    };
})(jQuery);

jQuery(function() {
    o4l_scores.init();
});
