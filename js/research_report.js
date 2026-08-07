/*
 * 연구보고서 상세(research_report.html).
 * 주소의 ?id= 값으로 js/research_data.js에서 보고서를 찾아 화면을 그린다.
 *
 * 로그인 확인과 로그아웃은 기존 js/research.js가 그대로 처리하므로 여기서 다시 만들지 않는다.
 */
(function () {
    "use strict";

    var LIST_URL = "research_list.html";

    function getRequestedId() {
        var match = /[?&]id=([^&]+)/.exec(window.location.search);

        return match ? decodeURIComponent(match[1]) : "";
    }

    function fillText(id, text) {
        var element = document.getElementById(id);

        if (element) {
            element.textContent = text;
        }
    }

    function renderKeywords(report) {
        var list = document.getElementById("report_keywords");

        if (!list) {
            return;
        }

        report.keywords.forEach(function (keyword) {
            var item = document.createElement("li");

            item.className = "report_keyword";
            item.textContent = keyword;
            list.appendChild(item);
        });
    }

    function renderParagraphs(containerId, paragraphs) {
        var container = document.getElementById(containerId);

        if (!container) {
            return;
        }

        paragraphs.forEach(function (text) {
            var paragraph = document.createElement("p");

            paragraph.textContent = text;
            container.appendChild(paragraph);
        });
    }

    function renderToc(report) {
        var list = document.getElementById("report_toc");

        if (!list) {
            return;
        }

        report.toc.forEach(function (entry) {
            var item = document.createElement("li");

            // 로마 숫자로 시작하는 줄은 대분류라 굵게 띄우고, 나머지는 한 단 들여쓴다.
            item.className = entry.part ? "report_toc_part" : "report_toc_item";
            item.textContent = entry.text;
            list.appendChild(item);
        });
    }

    function renderMeta(report) {
        var list = document.getElementById("report_meta");

        if (!list) {
            return;
        }

        report.meta.forEach(function (text) {
            var item = document.createElement("li");

            item.textContent = text;
            list.appendChild(item);
        });
    }

    function renderNotFound() {
        var main = document.getElementById("main_content");

        if (!main) {
            return;
        }

        main.innerHTML = "";

        var wrap = document.createElement("div");
        wrap.className = "research_inner";

        var back = document.createElement("a");
        back.className = "report_back";
        back.href = LIST_URL;
        back.textContent = "연구 자료 목록으로";

        var title = document.createElement("h1");
        title.className = "research_title";
        title.textContent = "요청하신 연구 자료를 찾을 수 없습니다";

        var desc = document.createElement("p");
        desc.className = "research_summary";
        desc.textContent = "주소가 바뀌었거나 삭제된 자료일 수 있습니다. 연구 자료 목록에서 다시 선택해 주세요.";

        wrap.appendChild(back);
        wrap.appendChild(title);
        wrap.appendChild(desc);
        main.appendChild(wrap);
    }

    function render(report) {
        document.title = report.title + " | 미래청년비전연구소";

        var description = document.querySelector('meta[name="description"]');

        if (description) {
            description.setAttribute("content", report.abstract[0] || report.title);
        }

        var cover = document.getElementById("report_cover_image");

        if (cover) {
            cover.src = report.cover;
        }

        // 시안의 히어로 제목은 줄바꿈이 지정되어 있어 그대로 살린다.
        var headline = document.getElementById("report_headline");

        if (headline) {
            headline.textContent = "";
            report.headline.split("\n").forEach(function (line, index) {
                if (index > 0) {
                    headline.appendChild(document.createElement("br"));
                }
                headline.appendChild(document.createTextNode(line));
            });
        }

        fillText("report_series", report.series);
        fillText("report_code", report.code);
        fillText("report_title", report.title);
        fillText("report_authors", report.authors);
        fillText("report_published", report.published);

        renderKeywords(report);
        renderParagraphs("report_abstract", report.abstract);
        renderToc(report);
        renderMeta(report);
    }

    function init() {
        if (!window.youthResearch) {
            return;
        }

        var report = window.youthResearch.findById(getRequestedId());

        if (!report) {
            renderNotFound();
            return;
        }

        render(report);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
