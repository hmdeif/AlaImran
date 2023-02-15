(function ($, core, shell, undefined) {

    // resize sandcastle frame to fit the window
    var f = function (e) {
        if (e.type === 'pageshow' || ($.mobile.activePage && $.mobile.activePage[0].id === 'c1topicPage')) {
            var div = $('.c1-topic-frame');
            if (div.length) {
                div.height(window.innerHeight - $('#c1topic').offset().top - 35);
                var frame = div.find('iframe.sandcastle');
                if (frame.length) {
                    $(frame[0].contentWindow).trigger($.Event('resize'));
                    if (frame.width() > window.innerWidth) {
                        frame.width(window.innerWidth - frame.offset().left * 2 - 10);
                    }
                }
            }
        }
    };
    $('#c1topicPage').live('pageshow', f);
    $(window).bind('orientationchange resize', f);


})(jQuery, nethelp, nethelpshell);