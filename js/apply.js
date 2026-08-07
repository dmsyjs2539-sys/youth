/*
 * 컨설팅 신청 단계 페이지 공통 스크립트.
 * - 신청자 정보 입력 확인 + 생년월일 연/월/일 드롭다운 (apply_step1.html)
 * - 희망 일정 달력 다중 선택 (apply_step2.html)
 * - 약관 동의 상태 연동 (apply_step3.html, apply_terms_*.html)
 *
 * ⚠️ 접수 서버가 없으므로 입력값은 sessionStorage에만 남는다.
 * 탭을 닫으면 사라지며, 실제 신청 데이터로 쓰려면 서버 전송으로 바꿔야 한다.
 */
(function () {
    "use strict";

    var STORAGE_KEY = "youth_apply_draft";
    var WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];
    // 신청자로 받을 수 있는 출생 연도 범위(현재 연도 기준).
    var BIRTH_YEAR_SPAN = 100;

    /* ========== 임시 저장소 ========== */

    function getStore() {
        try {
            return window.sessionStorage;
        } catch (error) {
            return null;
        }
    }

    function readDraft() {
        var store = getStore();

        if (!store) {
            return {};
        }

        try {
            var raw = store.getItem(STORAGE_KEY);
            var parsed = raw ? JSON.parse(raw) : null;

            // 저장값은 사용자가 직접 고칠 수 있으므로 형태를 확인하고 쓴다.
            return parsed && typeof parsed === "object" ? parsed : {};
        } catch (error) {
            return {};
        }
    }

    function writeDraft(draft) {
        var store = getStore();

        if (!store) {
            return;
        }

        try {
            store.setItem(STORAGE_KEY, JSON.stringify(draft));
        } catch (error) {
            // 저장이 막힌 환경에서는 화면 동작만 유지한다.
        }
    }

    function updateDraft(patch) {
        var draft = readDraft();

        Object.keys(patch).forEach(function (key) {
            draft[key] = patch[key];
        });

        writeDraft(draft);
    }

    /* ========== 안내 메시지 ========== */

    function showMessage(text, hasError) {
        var messageElement = document.getElementById("apply_message");

        if (!messageElement) {
            return;
        }

        messageElement.textContent = text;
        messageElement.classList.toggle("has_error", Boolean(hasError));
        messageElement.hidden = false;
    }

    function clearMessage() {
        var messageElement = document.getElementById("apply_message");

        if (messageElement) {
            messageElement.hidden = true;
        }
    }


    /* ========== 생년월일 드롭다운 ========== */

    /*
     * 그레고리력 윤년 규칙: 4로 나뉘면 윤년, 100으로 나뉘면 평년, 400으로 나뉘면 다시 윤년.
     * Date로 계산해도 되지만 규칙을 그대로 드러내는 편이 읽기 쉬워 직접 쓴다.
     */
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function daysInMonth(year, month) {
        if (month === 2) {
            return isLeapYear(year) ? 29 : 28;
        }

        return [4, 6, 9, 11].indexOf(month) !== -1 ? 30 : 31;
    }

    function fillOptions(select, values, format) {
        // 첫 옵션(연도/월/일 안내)은 남기고 나머지만 다시 채운다.
        while (select.options.length > 1) {
            select.remove(1);
        }

        values.forEach(function (value) {
            var option = document.createElement("option");

            option.value = String(value);
            option.textContent = format(value);
            select.appendChild(option);
        });
    }

    function range(from, to, step) {
        var list = [];
        var value = from;

        while (step > 0 ? value <= to : value >= to) {
            list.push(value);
            value += step;
        }

        return list;
    }

    function initBirthSelects(draft) {
        var yearSelect = document.getElementById("apply_birth_year");
        var monthSelect = document.getElementById("apply_birth_month");
        var daySelect = document.getElementById("apply_birth_day");

        if (!yearSelect || !monthSelect || !daySelect) {
            return null;
        }

        var thisYear = new Date().getFullYear();

        fillOptions(yearSelect, range(thisYear, thisYear - BIRTH_YEAR_SPAN, -1), function (y) {
            return y + "년";
        });
        fillOptions(monthSelect, range(1, 12, 1), function (m) {
            return String(m).padStart(2, "0") + "월";
        });

        function syncDays() {
            var year = Number(yearSelect.value);
            var month = Number(monthSelect.value);

            if (!year || !month) {
                // 연/월이 정해지기 전에는 31일까지 열어두되 선택값은 건드리지 않는다.
                fillOptions(daySelect, range(1, 31, 1), function (d) {
                    return String(d).padStart(2, "0") + "일";
                });
                return;
            }

            var last = daysInMonth(year, month);
            var previous = daySelect.value;

            fillOptions(daySelect, range(1, last, 1), function (d) {
                return String(d).padStart(2, "0") + "일";
            });

            // 2월 30일처럼 사라진 날짜를 고른 상태였다면 비워 다시 고르게 한다.
            daySelect.value = previous && Number(previous) <= last ? previous : "";
        }

        yearSelect.addEventListener("change", function () {
            syncDays();
            clearMessage();
        });
        monthSelect.addEventListener("change", function () {
            syncDays();
            clearMessage();
        });
        daySelect.addEventListener("change", clearMessage);

        // 이전 단계에서 돌아온 경우 저장해 둔 값을 되살린다.
        var saved = typeof draft.birth === "string" ? draft.birth.split("-") : [];

        if (saved.length === 3) {
            yearSelect.value = String(Number(saved[0]));
            monthSelect.value = String(Number(saved[1]));
            syncDays();
            daySelect.value = String(Number(saved[2]));
        } else {
            syncDays();
        }

        return {
            year: yearSelect,
            month: monthSelect,
            day: daySelect,
            getValue: function () {
                if (!yearSelect.value || !monthSelect.value || !daySelect.value) {
                    return "";
                }

                return [
                    yearSelect.value,
                    monthSelect.value.padStart(2, "0"),
                    daySelect.value.padStart(2, "0")
                ].join("-");
            }
        };
    }

    /* ========== 1단계: 신청자 정보 ========== */

    function initStepOne() {
        var form = document.getElementById("apply_form_profile");

        if (!form) {
            return;
        }

        var draft = readDraft();
        var birth = initBirthSelects(draft);
        var genderInput = document.getElementById("apply_gender");
        var genderButtons = Array.prototype.slice.call(
            form.querySelectorAll(".apply_choice_button")
        );

        function selectGender(value) {
            genderInput.value = value;

            genderButtons.forEach(function (button) {
                var isSelected = button.dataset.value === value;

                button.classList.toggle("is_selected", isSelected);
                button.setAttribute("aria-pressed", String(isSelected));
            });
        }

        // 이전 단계에서 돌아온 경우 입력값을 되살린다. (생년월일은 initBirthSelects가 처리)
        ["name", "phone"].forEach(function (key) {
            var field = form.elements[key];

            if (field && typeof draft[key] === "string") {
                field.value = draft[key];
            }
        });

        if (typeof draft.gender === "string" && draft.gender) {
            selectGender(draft.gender);
        }

        genderButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                selectGender(button.dataset.value);
                clearMessage();
            });
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var name = form.elements.name.value.trim();
            var phone = form.elements.phone.value.trim();
            var birthValue = birth ? birth.getValue() : "";

            if (!name) {
                showMessage("성명을 입력해 주세요.", true);
                form.elements.name.focus();
                return;
            }

            // 숫자만 남겨 10~11자리인지 본다. 하이픈과 공백은 자유롭게 받는다.
            if (phone.replace(/[^0-9]/g, "").length < 10) {
                showMessage("연락처를 정확히 입력해 주세요.", true);
                form.elements.phone.focus();
                return;
            }

            if (!birthValue) {
                showMessage("생년월일을 모두 선택해 주세요.", true);

                if (!birth.year.value) {
                    birth.year.focus();
                } else if (!birth.month.value) {
                    birth.month.focus();
                } else {
                    birth.day.focus();
                }

                return;
            }

            if (!genderInput.value) {
                showMessage("성별을 선택해 주세요.", true);
                genderButtons[0].focus();
                return;
            }

            updateDraft({
                name: name,
                phone: phone,
                birth: birthValue,
                gender: genderInput.value
            });

            window.location.href = "apply_step2.html";
        });
    }

    /* ========== 2단계: 희망 일정 ========== */

    function toDateKey(year, month, day) {
        return [
            year,
            String(month + 1).padStart(2, "0"),
            String(day).padStart(2, "0")
        ].join("-");
    }

    function initStepTwo() {
        var calendar = document.getElementById("apply_calendar");

        if (!calendar) {
            return;
        }

        var monthLabel = document.getElementById("apply_calendar_month");
        var grid = document.getElementById("apply_calendar_grid");
        var summary = document.getElementById("apply_calendar_summary");
        var draft = readDraft();
        var today = new Date();
        var viewYear = today.getFullYear();
        var viewMonth = today.getMonth();

        var selected = Array.isArray(draft.dates)
            ? draft.dates.filter(function (value) {
                  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
              })
            : [];

        function updateSummary() {
            if (!summary) {
                return;
            }

            summary.textContent = selected.length
                ? "선택한 일자 " + selected.length + "일"
                : "선택한 일자가 없습니다";
        }

        function toggleDate(key) {
            var index = selected.indexOf(key);

            if (index === -1) {
                selected.push(key);
            } else {
                selected.splice(index, 1);
            }

            updateDraft({ dates: selected.slice().sort() });
            updateSummary();
            clearMessage();
        }

        function render() {
            monthLabel.textContent = viewYear + "년 " + (viewMonth + 1) + "월";
            grid.textContent = "";

            var firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
            var lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();

            // 1일이 시작하는 요일까지 빈 칸을 채운다.
            for (var blank = 0; blank < firstWeekday; blank += 1) {
                var placeholder = document.createElement("span");

                placeholder.className = "apply_date";
                placeholder.setAttribute("aria-hidden", "true");
                placeholder.style.visibility = "hidden";
                grid.appendChild(placeholder);
            }

            for (var day = 1; day <= lastDay; day += 1) {
                var key = toDateKey(viewYear, viewMonth, day);
                var weekday = new Date(viewYear, viewMonth, day).getDay();
                var button = document.createElement("button");

                button.type = "button";
                button.className = "apply_date";
                button.dataset.date = key;
                button.textContent = String(day);
                button.setAttribute(
                    "aria-label",
                    viewYear + "년 " + (viewMonth + 1) + "월 " + day + "일 " + WEEKDAY_LABELS[weekday] + "요일"
                );

                if (weekday === 0 || weekday === 6) {
                    button.classList.add("apply_date_weekend");
                }

                var isSelected = selected.indexOf(key) !== -1;

                button.classList.toggle("is_selected", isSelected);
                button.setAttribute("aria-pressed", String(isSelected));
                grid.appendChild(button);
            }
        }

        grid.addEventListener("click", function (event) {
            var button = event.target.closest("button[data-date]");

            if (!button) {
                return;
            }

            toggleDate(button.dataset.date);

            var isSelected = selected.indexOf(button.dataset.date) !== -1;

            button.classList.toggle("is_selected", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });

        document.getElementById("apply_calendar_prev").addEventListener("click", function () {
            viewMonth -= 1;

            if (viewMonth < 0) {
                viewMonth = 11;
                viewYear -= 1;
            }

            render();
        });

        document.getElementById("apply_calendar_next").addEventListener("click", function () {
            viewMonth += 1;

            if (viewMonth > 11) {
                viewMonth = 0;
                viewYear += 1;
            }

            render();
        });

        document.getElementById("apply_calendar_reset").addEventListener("click", function () {
            selected = [];
            updateDraft({ dates: [] });
            updateSummary();
            clearMessage();
            render();
        });

        document.getElementById("apply_step2_next").addEventListener("click", function () {
            if (selected.length === 0) {
                showMessage("가능한 일자를 한 개 이상 선택해 주세요.", true);
                return;
            }

            window.location.href = "apply_step3.html";
        });

        updateSummary();
        render();
    }

    /* ========== 3단계: 약관 동의 ========== */

    var AGREE_KEYS = {
        agree_privacy: "agreePrivacy",
        agree_third_party: "agreeThirdParty"
    };

    function initStepThree() {
        var form = document.getElementById("apply_form_agree");

        if (!form) {
            return;
        }

        var draft = readDraft();
        var allCheck = document.getElementById("agree_all");
        var itemChecks = Array.prototype.slice.call(
            form.querySelectorAll(".apply_agree_item .apply_check")
        );

        function syncAllCheck() {
            allCheck.checked = itemChecks.every(function (check) {
                return check.checked;
            });
        }

        function persist() {
            var patch = {};

            itemChecks.forEach(function (check) {
                patch[AGREE_KEYS[check.id]] = check.checked;
            });

            updateDraft(patch);
        }

        // 약관 상세 페이지에서 동의하고 돌아온 상태를 반영한다.
        itemChecks.forEach(function (check) {
            check.checked = draft[AGREE_KEYS[check.id]] === true;
        });

        syncAllCheck();

        allCheck.addEventListener("change", function () {
            itemChecks.forEach(function (check) {
                check.checked = allCheck.checked;
            });

            persist();
            clearMessage();
        });

        itemChecks.forEach(function (check) {
            check.addEventListener("change", function () {
                syncAllCheck();
                persist();
                clearMessage();
            });
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var missing = itemChecks.filter(function (check) {
                return !check.checked;
            });

            if (missing.length > 0) {
                showMessage("필수 약관에 모두 동의해 주세요.", true);
                missing[0].focus();
                return;
            }

            window.location.href = "apply_done.html";
        });
    }

    /* ========== 약관 상세 ========== */

    function initTermsDetail() {
        var form = document.getElementById("apply_form_terms");

        if (!form) {
            return;
        }

        var check = document.getElementById("terms_agree");
        var draftKey = form.dataset.agreeKey;

        if (draftKey) {
            check.checked = readDraft()[draftKey] === true;
        }

        check.addEventListener("change", clearMessage);

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!check.checked) {
                showMessage("안내사항을 확인한 뒤 동의에 체크해 주세요.", true);
                check.focus();
                return;
            }

            if (draftKey) {
                var patch = {};

                patch[draftKey] = true;
                updateDraft(patch);
            }

            window.location.href = "apply_step3.html";
        });
    }

    /* ========== 완료 ========== */

    function initDone() {
        if (!document.getElementById("apply_done")) {
            return;
        }

        // 완료 화면에 도달하면 임시 저장값을 비워 다음 신청과 섞이지 않게 한다.
        var store = getStore();

        if (store) {
            try {
                store.removeItem(STORAGE_KEY);
            } catch (error) {
                // 저장소 접근이 막힌 경우 무시한다.
            }
        }
    }

    initStepOne();
    initStepTwo();
    initStepThree();
    initTermsDetail();
    initDone();
})();
