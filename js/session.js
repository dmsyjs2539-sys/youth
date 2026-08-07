/*
 * 데모용 로그인 상태 저장소.
 *
 * ⚠️ 실제 인증이 아니다.
 * sessionStorage에 로그인한 이메일만 적어두는 방식이라, 개발자 도구로 값을 직접 넣으면
 * 그대로 통과한다. 진짜 회원 데이터를 다루게 되면 서버 세션이나 인증 서비스로 교체해야 한다.
 * 탭을 닫으면 상태가 사라진다(localStorage가 아닌 sessionStorage를 쓰는 이유).
 * 새로고침에는 견디므로 로그인 후 화면을 다시 불러도 상태가 유지된다.
 *
 * 로그인이 필요한 링크에는 HTML에서 data-requires_auth를 붙인다.
 * 비로그인 상태로 누르면 원래 가려던 주소를 적어두고 로그인 페이지로 보낸다.
 */
(function (global) {
    "use strict";

    var STORAGE_KEY = "youth_signed_in_email";
    // 로그인 후 되돌아갈 주소. 비밀번호 등 민감한 값은 절대 담지 않는다.
    var REDIRECT_KEY = "youth_redirect_after_login";
    var LOGIN_URL = "login.html";

    // 프라이빗 모드나 스토리지 차단 환경에서는 접근 자체가 예외를 던진다.
    function getStore() {
        try {
            return global.sessionStorage;
        } catch (error) {
            return null;
        }
    }

    function getEmail() {
        var store = getStore();

        if (!store) {
            return "";
        }

        var value = store.getItem(STORAGE_KEY);

        return typeof value === "string" ? value.trim() : "";
    }

    function isSignedIn() {
        return getEmail().length > 0;
    }

    function signIn(email) {
        var store = getStore();

        if (store) {
            store.setItem(STORAGE_KEY, String(email));
        }
    }

    function signOut() {
        var store = getStore();

        if (store) {
            store.removeItem(STORAGE_KEY);
        }
    }

    /* ---------- 로그인 후 돌아갈 주소 ---------- */

    function setRedirect(url) {
        var store = getStore();

        if (store && typeof url === "string" && url) {
            store.setItem(REDIRECT_KEY, url);
        }
    }

    /* 한 번 쓰고 지운다. 남겨두면 다음 로그인까지 따라다닌다. */
    function takeRedirect() {
        var store = getStore();

        if (!store) {
            return "";
        }

        var value = store.getItem(REDIRECT_KEY);

        store.removeItem(REDIRECT_KEY);

        // 저장값은 사용자가 고칠 수 있으므로 같은 사이트 안의 상대 경로만 받아들인다.
        if (typeof value !== "string" || !value || /^[a-z]+:|^\/\//i.test(value)) {
            return "";
        }

        return value;
    }

    /* ---------- 로그인이 필요한 링크 ---------- */

    function handleGuardedClick(event) {
        var link = event.target.closest("[data-requires_auth]");

        if (!link || isSignedIn()) {
            return;
        }

        event.preventDefault();
        setRedirect(link.getAttribute("href"));
        global.location.href = LOGIN_URL;
    }

    document.addEventListener("click", handleGuardedClick);

    global.youthSession = {
        getEmail: getEmail,
        isSignedIn: isSignedIn,
        signIn: signIn,
        signOut: signOut,
        setRedirect: setRedirect,
        takeRedirect: takeRedirect
    };
})(window);
