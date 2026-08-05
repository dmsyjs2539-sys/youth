(function () {
    "use strict";

    var SCROLL_THRESHOLD = 24;
    var TO_TOP_THRESHOLD = 520;
    var NAV_CLOSE_DURATION = 420;
    var HERO_START_DELAY = 220;
    var SPLASH_DURATION = 3800;

    var header = document.getElementById("header");
    var menuButton = document.getElementById("menu_button");
    var globalNav = document.getElementById("global_nav");
    var splash = document.getElementById("splash");
    var toTopButton = document.getElementById("to_top");
    var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var navCloseTimer = null;

    function isMotionReduced() {
        return motionQuery.matches;
    }

    /* ---------- 텍스트 스플릿 ---------- */

    function readLines(element) {
        var lines = [];
        var buffer = "";

        Array.prototype.forEach.call(element.childNodes, function (node) {
            if (node.nodeName === "BR") {
                lines.push(buffer);
                buffer = "";
                return;
            }
            buffer += node.textContent;
        });
        lines.push(buffer);

        return lines
            .map(function (line) {
                return line.replace(/\s+/g, " ").trim();
            })
            .filter(function (line) {
                return line.length > 0;
            });
    }

    function splitText(element) {
        if (element.dataset.isSplit === "true") {
            return;
        }

        var label = element.textContent.replace(/\s+/g, " ").trim();
        var lines = readLines(element);
        var inner = document.createElement("span");
        var charIndex = 0;

        inner.setAttribute("aria-hidden", "true");

        lines.forEach(function (line) {
            var lineElement = document.createElement("span");
            lineElement.className = "split_line";

            line.split("").forEach(function (character) {
                var charElement = document.createElement("span");
                charElement.className = "split_char";
                charElement.textContent = character === " " ? " " : character;
                charElement.style.setProperty("--char_index", String(charIndex));
                lineElement.appendChild(charElement);
                charIndex += 1;
            });

            inner.appendChild(lineElement);
        });

        element.setAttribute("aria-label", label);
        element.textContent = "";
        element.appendChild(inner);
        element.dataset.isSplit = "true";
    }

    /* ---------- 스크롤 등장 ---------- */

    function assignRevealIndexes(elements) {
        var counters = new Map();

        elements.forEach(function (element) {
            var parent = element.parentElement;
            var index = counters.get(parent) || 0;
            element.style.setProperty("--reveal_index", String(index));
            counters.set(parent, index + 1);
        });
    }

    function showElement(element) {
        element.classList.add("is_visible");
    }

    function observeElements(elements) {
        if (!("IntersectionObserver" in window)) {
            elements.forEach(showElement);
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    showElement(entry.target);
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
        );

        elements.forEach(function (element) {
            observer.observe(element);
        });
    }

    /* ---------- 내비게이션 ---------- */

    function setNavOpen(isOpen) {
        window.clearTimeout(navCloseTimer);

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "전체 메뉴 닫기" : "전체 메뉴 열기");
        menuButton.classList.toggle("is_open", isOpen);

        if (isOpen) {
            globalNav.hidden = false;
            window.requestAnimationFrame(function () {
                globalNav.classList.add("is_open");
            });
            return;
        }

        globalNav.classList.remove("is_open");

        if (isMotionReduced()) {
            globalNav.hidden = true;
            return;
        }

        navCloseTimer = window.setTimeout(function () {
            globalNav.hidden = true;
        }, NAV_CLOSE_DURATION);
    }

    function handleMenuClick() {
        setNavOpen(!globalNav.classList.contains("is_open"));
    }

    function handleNavClick(event) {
        if (event.target.closest(".global_nav_link")) {
            setNavOpen(false);
        }
    }

    function handleDocumentKeydown(event) {
        if (event.key === "Escape" && globalNav.classList.contains("is_open")) {
            setNavOpen(false);
            menuButton.focus();
        }
    }

    function handleScroll() {
        header.classList.toggle("is_scrolled", window.scrollY > SCROLL_THRESHOLD);
        toTopButton.classList.toggle("is_visible", window.scrollY > TO_TOP_THRESHOLD);
    }

    function handleToTopClick() {
        window.scrollTo({
            top: 0,
            behavior: isMotionReduced() ? "auto" : "smooth"
        });
    }

    /* ---------- 진입 인트로 ---------- */

    function removeSplash() {
        if (!splash || splash.classList.contains("is_done")) {
            return;
        }
        splash.classList.add("is_done");
        document.body.classList.remove("is_splash_active");
        splash.remove();
    }

    function runSplash() {
        if (!splash) {
            return Promise.resolve();
        }

        if (isMotionReduced()) {
            removeSplash();
            return Promise.resolve();
        }

        document.body.classList.add("is_splash_active");

        return new Promise(function (resolve) {
            var settled = false;

            function finish() {
                if (settled) {
                    return;
                }
                settled = true;
                removeSplash();
                resolve();
            }

            splash.addEventListener("animationend", function (event) {
                if (event.animationName === "splash_collapse") {
                    finish();
                }
            });

            window.setTimeout(finish, SPLASH_DURATION);
        });
    }

    /* ---------- 초기화 ---------- */

    function initNavStagger() {
        var navItems = globalNav.querySelectorAll(".global_nav_list > li");
        Array.prototype.forEach.call(navItems, function (item, index) {
            item.style.setProperty("--nav_index", String(index));
        });
    }

    function initAnimations() {
        var splitTargets = Array.prototype.slice.call(document.querySelectorAll(".split_text"));
        var revealTargets = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

        splitTargets.forEach(splitText);
        assignRevealIndexes(revealTargets);

        if (isMotionReduced()) {
            splitTargets.concat(revealTargets).forEach(showElement);
            return;
        }

        var heroTargets = splitTargets.filter(function (element) {
            return element.hasAttribute("data-split-load");
        });
        var scrollTargets = splitTargets.filter(function (element) {
            return !element.hasAttribute("data-split-load");
        });

        observeElements(scrollTargets.concat(revealTargets));

        // 히어로 타이틀은 인트로가 걷힌 뒤에 재생해야 사용자가 볼 수 있다.
        splashPromise.then(function () {
            window.setTimeout(function () {
                heroTargets.forEach(showElement);
            }, HERO_START_DELAY);
        });
    }

    menuButton.addEventListener("click", handleMenuClick);
    toTopButton.addEventListener("click", handleToTopClick);
    globalNav.addEventListener("click", handleNavClick);
    document.addEventListener("keydown", handleDocumentKeydown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    initNavStagger();
    handleScroll();

    // 인트로는 폰트 로드를 기다리지 않고 즉시 시작해 스크롤 잠금이 늦지 않게 한다.
    var splashPromise = runSplash();

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(initAnimations);
    } else {
        initAnimations();
    }
})();
