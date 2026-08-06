/*
 * 데모용 로그인 상태 저장소.
 *
 * ⚠️ 실제 인증이 아니다.
 * sessionStorage에 로그인한 이메일만 적어두는 방식이라, 개발자 도구로 값을 직접 넣으면
 * 그대로 통과한다. 진짜 회원 데이터를 다루게 되면 서버 세션이나 인증 서비스로 교체해야 한다.
 * 탭을 닫으면 상태가 사라진다(localStorage가 아닌 sessionStorage를 쓰는 이유).
 */
(function (global) {
    "use strict";

    var STORAGE_KEY = "youth_signed_in_email";

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

    global.youthSession = {
        getEmail: getEmail,
        isSignedIn: isSignedIn,
        signIn: signIn,
        signOut: signOut
    };
})(window);
