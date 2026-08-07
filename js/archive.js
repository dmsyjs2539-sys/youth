/*
 * 청년 성장 데이터 아카이브 (archive.html).
 * - 연도별 조사 데이터 탭 전환
 *
 * JS가 없으면 모든 연도가 이어서 보이도록, 숨김은 JS가 붙인다.
 * 탭 동작은 program.js의 세부 메뉴와 같은 규칙(선택 탭만 Tab 순서에 두고 좌우 화살표로 이동)을 따른다.
 */
(function () {
    "use strict";

    var EMPTY_TEXT = "연구 데이터 준비 중";

    var tabList = document.getElementById("year_tabs");
    var tabs = tabList
        ? Array.prototype.slice.call(tabList.querySelectorAll('[role="tab"]'))
        : [];

    function panelOf(tab) {
        return document.getElementById(tab.getAttribute("aria-controls"));
    }

    /* 내용이 없는 연도는 빈 상태 문구를 보여준다. */
    function fillEmptyPanel(panel) {
        if (!panel || panel.querySelector(".year_empty")) {
            return;
        }

        if (panel.querySelectorAll(".year_item").length > 0) {
            return;
        }

        var list = panel.querySelector(".year_group_list");
        var notice = document.createElement("p");

        notice.className = "year_empty";
        notice.textContent = EMPTY_TEXT;

        if (list) {
            list.remove();
        }

        panel.appendChild(notice);
    }

    function selectTab(targetTab, shouldFocus) {
        tabs.forEach(function (tab) {
            var isSelected = tab === targetTab;
            var panel = panelOf(tab);

            tab.setAttribute("aria-selected", String(isSelected));
            tab.tabIndex = isSelected ? 0 : -1;

            if (panel) {
                panel.classList.toggle("is_hidden", !isSelected);
            }
        });

        if (shouldFocus) {
            targetTab.focus();
        }
    }

    function handleTabClick(event) {
        var tab = event.target.closest('[role="tab"]');

        if (!tab) {
            return;
        }

        selectTab(tab, false);
    }

    function handleTabKeydown(event) {
        var currentIndex = tabs.indexOf(document.activeElement);

        if (currentIndex === -1) {
            return;
        }

        var nextIndex = null;

        if (event.key === "ArrowRight") {
            nextIndex = (currentIndex + 1) % tabs.length;
        } else if (event.key === "ArrowLeft") {
            nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex = tabs.length - 1;
        }

        if (nextIndex === null) {
            return;
        }

        event.preventDefault();
        selectTab(tabs[nextIndex], true);
    }

    function initYearTabs() {
        if (tabs.length === 0) {
            return;
        }

        tabs.forEach(function (tab) {
            fillEmptyPanel(panelOf(tab));
        });

        // 가장 최신 연도가 먼저 오도록 마크업이 정렬되어 있어 첫 탭을 연다.
        selectTab(tabs[0], false);

        tabList.addEventListener("click", handleTabClick);
        tabList.addEventListener("keydown", handleTabKeydown);
    }

    initYearTabs();
})();
