/*
 * 로그인(login.html) / 회원가입(signup.html) 폼 처리.
 * 아직 인증 서버가 연결되지 않아 실제 제출은 하지 않고,
 * 입력값 확인 결과만 폼 아래 상태 영역에 안내한다.
 * 제출 성공 시 문구는 각 폼의 data-pending-message에서 읽는다.
 */
(function () {
    "use strict";

    var DEFAULT_PENDING_MESSAGE = "인증 서버가 아직 연결되지 않아 실제로는 처리되지 않습니다.";

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

        showMessage(messageElement, form.dataset.pendingMessage || DEFAULT_PENDING_MESSAGE, false);
    }

    Array.prototype.forEach.call(document.querySelectorAll(".auth_form"), function (form) {
        form.addEventListener("submit", handleSubmit);
    });
})();
