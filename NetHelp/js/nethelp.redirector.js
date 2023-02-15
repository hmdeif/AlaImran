(function() {
    if (/\Wnhr=false(\W|$)/i.test(location.href)) {
        return;
    }
    var root = '../',
        doc = document,
        loc = location,
        topic,
        hash = loc.hash,
        query = loc.search || '',
        scripts = doc.getElementsByTagName('script'),
        path = /(.*)nethelp\.redirector\.js$/i.exec(scripts[scripts.length - 1].src)[1],
        a = doc.createElement('a');
    a.href = '.';
    var expandUrl = a.href === '.' ? 
        function(url) {
            a.href = url;
            return a.getAttribute('href', 4);
        } :
        function(url) {
            a.href = url;
            return a.href;
        };
    topic = expandUrl('#').replace(/(\?.*|#)$/, '');
    root = expandUrl((path || './') + root);
    window.nethelpRedirect = function(url) {
        var paths = /(([^?#]+\/)*[^\/?#]*)(\?[^#]*)?(?:#.*)?$/.exec(expandUrl(root + (url || 'default.htm')));
        if (!paths) return;
        url = paths[1];
        root = paths[2] || '';
        topic = topic.indexOf(root) === 0 ? topic.substring(root.length) : topic;
        if (paths[3] && paths[3].length > 1) {
            query = paths[3] + (query.length > 1 ? '&' + query.substring(1) : '')
        }
        url = url + (query.length > 1 ? query : '') +
            '#!' + topic + (hash.length > 1 ? hash : '');
        /\Wnhr=debug(\W|$)/i.test(loc.href) ?
            window.console ? console.log(url) : alert(url) :
            loc.replace(url);
    };
    doc.write('<script type="text/javascript" src="' + root + 'nethelppage.js"></script>');
})();