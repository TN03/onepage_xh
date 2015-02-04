(function () {
    "use strict";

    /**
     * The master element, i.e. the documentElement or the body.
     */
    var masterElement;

    /**
     * Adds an event listener to the scroll event of the window.
     *
     * @param   {EventListener} listener
     * @returns {undefined}
     */
    function onWindowScroll(listener) {
        if (typeof window.addEventListener !== "undefined") {
            window.addEventListener("scroll", listener, false);
        } else if (typeof window.attackEvent !== "undefined") {
            window.attachEvent("onscroll", listener);
        }
    }

    /**
     * Scrolls to an element with a certain ID.
     *
     * @param   {string}    id
     * @returns {undefined}
     */
    function scrollToId(id) {
        var element, master, duration, start, delta, startOffset;

        function step(timestamp) {
            var progress, offset;

            if (!start) {
                start = timestamp;
            }
            progress = timestamp - start;
            offset = delta * Math.min(progress / duration, 1);
            master.scrollTop = startOffset + offset;
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }

        master = masterElement;
        duration = 200;
        element = document.getElementById(id);
        if (element) {
            if (typeof window.requestAnimationFrame !== "undefined") {
                startOffset = master.scrollTop;
                delta = element.offsetTop - startOffset;
                window.requestAnimationFrame(step);
            } else {
                master.scrollTop = element.offsetTop;
            }
        }
    }

    /**
     * Navigates to a fragment.
     *
     * @param   {string}    id
     * @returns {undefined}
     */
    function navigateToFragment(id) {
        var master, scrollTop;

        master = masterElement;
        scrollTop = master.scrollTop;
        location.hash = id;
        master.scrollTop = scrollTop;
        scrollToId(id);
    }

    /**
     * Initializes the master element, i.e. the documentElement or the body.
     *
     * @returns {undefined}
     */
    function initMasterElement() {
        var scrollTop, html;

        html = document.documentElement;
        scrollTop = html.scrollTop;
        html.scrollTop = 1;
        if (html.scrollTop === 1) {
            html.scrollTop = scrollTop;
            masterElement = html;
        } else {
            masterElement = document.body;
        }
    }

    /**
     * Initializes the onepage plugin.
     *
     * @returns {undefined}
     */
    function init() {
        var topLink;

        function showOrHideTopLink() {
            if (masterElement.scrollTop > 300) {
                topLink.style.display = "";
            } else {
                topLink.style.display = "none";
            }
        }

        initMasterElement();
        topLink = document.getElementById("onepage_toplink");
        if (topLink) {
            onWindowScroll(showOrHideTopLink);
            topLink.onclick = function () {
                scrollToId("TOP");
                return false;
            };
            showOrHideTopLink();
        }
    }

    init();
}());
