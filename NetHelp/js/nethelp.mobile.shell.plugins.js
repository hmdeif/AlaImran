(function ($, core, shell, undefined) {

    // switch off NetHelp 2.0 collapsible sections to use jQuery Mobile collapsible sections
    shell.plugin('topicLinks').serviceLinks.push('.ui-collapsible-heading-toggle');
    shell.removePlugin('collapsibleSection');


    //#region related topics
    shell.mergeSettings({
        topic: {
            relatedTopics: {
                icon: 'arrow-r'
            }
        }
    });
    shell.plugin({
        name: 'relatedTopics',
        create: function () {
            var c_icon = core.str(shell.setting('topic.relatedTopics.icon')),
            topicElement = (shell.topic || {}).element || $('body');
            shell.bind('topicupdate', function () {
                topicElement.find('.related-topics').children().each(function () {
                    $(this).css('clear', 'left');
                    if (c_icon) {
                        $('<span />')
                        .addClass('related-topic-icon')
                        .addClass('ui-icon ui-icon-' + c_icon)
                        .addClass('ui-icon-shadow')
                        .prependTo(this);
                    }
                });
            });
        }
    });

    // process topics to initialize jQuery Mobile page
    shell.plugin({
        name: 'topicMobile',
        create: function (topicElement) {
            shell.bind('topicloading', function (e, p) {
                $.mobile.showPageLoadingMsg();
            });
            shell.bind('abort', function (e, p) {
                $.mobile.hidePageLoadingMsg();
            });
            shell.bind('topicupdate', function (e, p) {
                var content = shell.topic.element,
                    page = content.closest('div[data-role="page"]');
                content.children().wrapAll('<div data-role="content" />').parent().page().children().unwrap();
                var options = {
                    allowSamePageTransition: true,
                    changeHash: false,
                    dataUrl: p.url
                };
                page.attr('data-url', p.url);
                page.attr('data-external-page', 'true');
                $.mobile.changePage(page, options);
                $.mobile.hidePageLoadingMsg();
            });
        }
    });

    shell.mergeSettings({
        general: {
            showTopicAtStartup: false
        }
    });

})(jQuery, nethelp, nethelpshell);