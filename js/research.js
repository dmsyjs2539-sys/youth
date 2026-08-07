/*
 * 연구 자료 상세 페이지 접근 제어 + 로그아웃.
 *
 * ⚠️ 이건 화면 흐름을 맞추기 위한 장치이지 실제 접근 제어가 아니다.
 * 문서가 그려지기 전에 판단하려고 <head>에서 동기 실행한다.
 */
(function () {
    "use strict";

    var session = window.youthSession;

    if (!session || !session.isSignedIn()) {
        if (session) {
            /*
             * 주소를 직접 입력해 들어온 경우에도 로그인 뒤 이 화면으로 돌아오게
             * 현재 위치를 적어둔다. (?id= 같은 쿼리까지 함께 보관한다)
             */
            session.setRedirect(
                window.location.pathname.split("/").pop() + window.location.search
            );
        }

        // replace를 쓰면 뒤로가기로 이 페이지에 다시 들어오지 않는다.
        window.location.replace("login.html");
        return;
    }

    function handleSignOutClick() {
        session.signOut();
        window.location.replace("login.html");
    }

    function init() {
        var emailElement = document.getElementById("signed_in_email");
        var signOutButton = document.getElementById("sign_out_button");

        if (emailElement) {
            emailElement.textContent = session.getEmail();
        }

        if (signOutButton) {
            signOutButton.addEventListener("click", handleSignOutClick);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
