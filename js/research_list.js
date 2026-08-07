/*
 * 연구 자료 목록(research_list.html).
 * 기존 자료와 새 연구보고서를 js/research_data.js 하나에서 받아 함께 그린다.
 *
 * 로그인 확인과 로그아웃은 기존 js/research.js가 처리한다.
 */
(function () {
    "use strict";

    function createCard(item) {
        var card = document.createElement("li");

        card.className = "research_card";
        /*
         * data-reveal은 붙이지 않는다. main.js는 페이지가 처음 뜰 때 한 번만
         * [data-reveal]을 모아 관찰하므로, 나중에 만든 카드는 영영 나타나지 않는다.
         */

        var link = document.createElement("a");
        link.className = "research_card_link";
        link.href = item.url;

        var media = document.createElement("span");
        media.className = "research_card_media";

        var image = document.createElement("img");
        image.src = item.cover;
        image.alt = "";
        image.setAttribute("aria-hidden", "true");
        media.appendChild(image);

        var body = document.createElement("span");
        body.className = "research_card_body";

        var series = document.createElement("span");
        series.className = "research_card_series";
        series.textContent = item.series;

        var title = document.createElement("span");
        title.className = "research_card_title";
        title.textContent = item.title;

        var summary = document.createElement("span");
        summary.className = "research_card_summary";
        summary.textContent = item.summary;

        var meta = document.createElement("span");
        meta.className = "research_card_meta";
        meta.textContent = item.authors + " · " + item.published;

        body.appendChild(series);
        body.appendChild(title);
        body.appendChild(summary);
        body.appendChild(meta);

        link.appendChild(media);
        link.appendChild(body);
        card.appendChild(link);

        return card;
    }

    function init() {
        var list = document.getElementById("research_list");

        if (!list || !window.youthResearch) {
            return;
        }

        var items = window.youthResearch.toListItems();

        items.forEach(function (item) {
            list.appendChild(createCard(item));
        });

        var count = document.getElementById("research_count");

        if (count) {
            count.textContent = String(items.length);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
