/*
 * 로그인(login.html) / 회원가입(signup.html) 폼 처리.
 *
 * 로그인은 아래 데모 계정과 대조해 일치할 때만 다음 화면으로 넘긴다.
 * 신청하기처럼 로그인이 필요한 링크에서 넘어온 경우에는
 * session.js가 적어둔 원래 주소로 되돌려 보내고, 없으면 연구 자료 페이지로 간다.
 * 회원가입은 입력값만 확인하고 안내 문구를 보여준다
 * (문구는 각 폼의 data-pending-message 속성에서 읽는다).
 */
(function () {
    "use strict";

    /*
     * ⚠️ 데모용 고정 계정 — 실제 보안이 아니다.
     *
     * 이 파일은 브라우저가 그대로 내려받으므로 누구나 소스 보기로 값을 읽을 수 있고,
     * 로그인을 건너뛰고 research.html을 주소창에 직접 입력하는 것도 완전히 막지 못한다.
     * 실제로 쓰는 비밀번호를 절대 넣지 말 것.
     * 계정을 바꾸려면 아래 두 값만 수정하면 된다.
     */
    var DEMO_EMAIL = "futureyouth@gmail.com";
    var DEMO_PASSWORD = "youth1234";

    var SIGNED_IN_REDIRECT = "research.html";
    var DEFAULT_PENDING_MESSAGE = "입력하신 내용이 확인되었습니다.";
    var SIGN_IN_FAILED_MESSAGE = "이메일 또는 비밀번호가 올바르지 않습니다.";

    function showMessage(messageElement, text, hasError) {
        messageElement.textContent = text;
        messageElement.classList.toggle("has_error", Boolean(hasError));
        messageElement.hidden = false;
    }

    function findInvalidField(form) {
        var fields = form.querySelectorAll("input[required]");
        var invalid = null;

        Array.prototype.forEach.call(fields, function (field) {
            if (invalid) {
                return;
            }
            if (!field.checkValidity()) {
                invalid = field;
            }
        });

        return invalid;
    }

    function handleSubmit(event) {
        event.preventDefault();

        var form = event.currentTarget;
        var messageElement = document.getElementById(form.id.replace("_form", "_message"));

        if (!messageElement) {
            return;
        }

        var invalidField = findInvalidField(form);

        if (invalidField) {
            var label = form.querySelector('label[for="' + invalidField.id + '"]');
            var name = label ? label.textContent.trim() : "입력값";
            var suffix = invalidField.type === "checkbox" ? " 항목에 체크해 주세요." : " 항목을 확인해 주세요.";
            showMessage(messageElement, name + suffix, true);
            invalidField.focus();
            return;
        }

        if (form.id === "login_form") {
            handleSignIn(form, messageElement);
            return;
        }

        showMessage(messageElement, form.dataset.pendingMessage || DEFAULT_PENDING_MESSAGE, false);
    }

    function handleSignIn(form, messageElement) {
        var email = form.elements.email.value.trim().toLowerCase();
        var password = form.elements.password.value;

        if (email !== DEMO_EMAIL.toLowerCase() || password !== DEMO_PASSWORD) {
            showMessage(messageElement, SIGN_IN_FAILED_MESSAGE, true);
            form.elements.password.focus();
            form.elements.password.select();
            return;
        }

        if (window.youthSession) {
            window.youthSession.signIn(email);
        }

        var redirect = window.youthSession ? window.youthSession.takeRedirect() : "";

        showMessage(messageElement, "로그인되었습니다. 이어서 진행합니다.", false);
        window.location.href = redirect || SIGNED_IN_REDIRECT;
    }

    /* 이미 로그인한 사람이 로그인 화면을 다시 열면 곧장 목적지로 보낸다. */
    function skipWhenSignedIn() {
        if (!document.getElementById("login_form") || !window.youthSession) {
            return false;
        }

        if (!window.youthSession.isSignedIn()) {
            return false;
        }

        var redirect = window.youthSession.takeRedirect();

        if (!redirect) {
            return false;
        }

        window.location.replace(redirect);

        return true;
    }

    /* 로그인이 필요해서 넘어온 경우임을 알린다. */
    function noticeGuardedEntry() {
        var messageElement = document.getElementById("login_message");
        var store = null;

        try {
            store = window.sessionStorage;
        } catch (error) {
            return;
        }

        if (!messageElement || !store || !store.getItem("youth_redirect_after_login")) {
            return;
        }

        showMessage(messageElement, "신청을 이어가려면 먼저 로그인해 주세요.", false);
    }

    if (!skipWhenSignedIn()) {
        noticeGuardedEntry();

        Array.prototype.forEach.call(document.querySelectorAll(".auth_form"), function (form) {
            form.addEventListener("submit", handleSubmit);
        });
    }
})();
