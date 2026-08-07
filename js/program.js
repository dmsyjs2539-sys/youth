/*
 * 강의 및 컨설팅 절차 페이지.
 * - 세부 메뉴(강의 절차 / 컨설팅 절차 / 컨설팅 신청) 탭 전환
 * - 컨설팅 신청서 입력값 확인
 *
 * JS가 없으면 세 패널이 그대로 이어서 보이도록, 숨김은 JS가 붙인다.
 */
(function () {
    "use strict";

    var DEFAULT_PENDING_MESSAGE = "접수 서버가 아직 연결되지 않아 실제로는 전송되지 않습니다.";

    var tabList = document.getElementById("program_tabs");
    var tabs = tabList
        ? Array.prototype.slice.call(tabList.querySelectorAll('[role="tab"]'))
        : [];

    /* ---------- 탭 ---------- */

    function panelOf(tab) {
        return document.getElementById(tab.getAttribute("aria-controls"));
    }

    function selectTab(targetTab, shouldFocus) {
        tabs.forEach(function (tab) {
            var isSelected = tab === targetTab;
            var panel = panelOf(tab);

            tab.setAttribute("aria-selected", String(isSelected));
            // 선택되지 않은 탭은 Tab 키 순서에서 빼고 좌우 화살표로만 이동한다.
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
        // 새로고침하거나 링크를 공유해도 같은 탭이 열리도록 주소에 남긴다.
        window.history.replaceState(null, "", "#" + tab.id);
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

    function initTabs() {
        if (tabs.length === 0) {
            return;
        }

        // program.html#tab_apply 처럼 주소로 들어온 경우 해당 탭을 연다.
        var requested = tabs.filter(function (tab) {
            return "#" + tab.id === window.location.hash;
        })[0];

        selectTab(requested || tabs[0], false);

        tabList.addEventListener("click", handleTabClick);
        tabList.addEventListener("keydown", handleTabKeydown);
    }

    /* ---------- 신청서 ---------- */

    function showMessage(messageElement, text, hasError) {
        messageElement.textContent = text;
        messageElement.classList.toggle("has_error", Boolean(hasError));
        messageElement.hidden = false;
    }

    function findInvalidField(form) {
        var fields = form.querySelectorAll("[required]");
        var invalid = null;

        Array.prototype.forEach.call(fields, function (field) {
            if (invalid) {
                return;
            }
            if (typeof field.checkValidity === "function" && !field.checkValidity()) {
                invalid = field;
            }
        });

        return invalid;
    }

    function describe(form, field) {
        var label = form.querySelector('label[for="' + field.id + '"]');
        var name = label ? label.textContent.trim() : "입력값";

        if (field.type === "checkbox") {
            return name + " 항목에 체크해 주세요.";
        }

        if (field.tagName === "SELECT") {
            return name + " 항목을 선택해 주세요.";
        }

        return name + " 항목을 확인해 주세요.";
    }

    function handleApplySubmit(event) {
        event.preventDefault();

        var form = event.currentTarget;
        var messageElement = document.getElementById("apply_message_status");

        if (!messageElement) {
            return;
        }

        var invalidField = findInvalidField(form);

        if (invalidField) {
            showMessage(messageElement, describe(form, invalidField), true);
            invalidField.focus();
            return;
        }

        showMessage(messageElement, form.dataset.pendingMessage || DEFAULT_PENDING_MESSAGE, false);
    }

    function initApplyForm() {
        var form = document.getElementById("apply_form");

        if (form) {
            form.addEventListener("submit", handleApplySubmit);
        }
    }

    initTabs();
    initApplyForm();
})();
