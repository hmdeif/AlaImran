(function ($, core, undefined) {

    $.extend(core.shell, { baseUrl: $.mobile.path.parseUrl(window.location.href).hrefNoHash });

    function showTocBook(urlObj, options) {
        var tocPath = urlObj.hash.replace(/.*path=/, ""),
		pageSelector = "#c1tocPage";
        var toc = nethelp.shell.toc;
        if (toc) {
            var page = $(pageSelector),
                path = [];
            if (tocPath != pageSelector) {
                path = tocPath.split(",");
            }
            var tocUL = $('#c1toc'),
                item = toc.getData(path),
                markup = toc._itemsHtml(path);
            if (item.url) {
                item.items = false;
                var it = toc._itemsHtml(path, [item]);
                markup = it + markup;
            }
            tocUL.html(markup);
            var children = tocUL.children();
            if (children.length > 1 && children[0].id == children[1].id) {
                var id = children[0].id;
                children[0].id = id.substr(0, id.lastIndexOf('-'));
            }
            page.page();
            tocUL.listview('refresh');
            options.allowSamePageTransition = true;
            options.dataUrl = urlObj.href;
            $.mobile.changePage(page, options);
        }
    }

    function showSearch(urlObj, options) {
        var pageSelector = "#c1searchPage",
            page = $(pageSelector),
            search = nethelp.shell.search;
        if (search && urlObj.hash.search(/.*query=/) !== -1) {
            var query = urlObj.hash.replace(/.*query=/, "");
            if (query && search) {
                search.search(query);
            }
        }
        options.allowSamePageTransition = true;
        options.dataUrl = urlObj.href;
        $.mobile.changePage(page, options);
    }

    // Listen for any attempts to call changePage().
    $(document).bind("pagebeforechange", function (e, data) {
        if (typeof data.toPage === "string") {
            var u = $.mobile.path.parseUrl(data.toPage);

            if (u.hash.search(/^#c1tocPage/) !== -1) {
                showTocBook(u, data.options);
                e.preventDefault();
            }
            else if (u.hash.search(/^#c1indexPage/) !== -1) {
                data.allowSamePageTransition = true;
                $.mobile.changePage($('#c1indexPage'), data);
                e.preventDefault();
            }
            else if (u.hash.search(/^#c1searchPage/) !== -1) {
                showSearch(u, data.options);
                e.preventDefault();
            }
            else {
                e.preventDefault();
            }
        }
    });

})(jQuery, nethelp);