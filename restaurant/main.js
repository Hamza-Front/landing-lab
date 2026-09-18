(function () {
    'use strict';

    const MAP_HOSTS = ['google.com/maps', 'maps.google.com', 'maps.app.goo.gl', 'goo.gl/maps'];

    function isMapLink(anchor) {
        if (!anchor || !anchor.href) return false;
        return MAP_HOSTS.some(function (host) {
            return anchor.href.indexOf(host) !== -1;
        });
    }

    document.addEventListener('click', function (event) {
        const anchor = event.target.closest('a');
        if (!isMapLink(anchor)) return;

        if (typeof window.gtag !== 'function') return;

        window.gtag('event', 'map_click', {
            link_url: anchor.href,
            link_text: (anchor.textContent || '').trim().slice(0, 100),
            outbound: true
        });
    });
})();