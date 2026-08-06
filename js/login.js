/*
 * 로그인 / 회원가입 폼 처리.
 * 아직 인증 서버가 연결되지 않아 실제 제출은 하지 않고,
 * 입력값 확인 결과만 폼 아래 상태 영역에 안내한다.
 */
(function () {
    "use strict";

    var PENDING_MESSAGE = "인증 서버가 아직 연결되지 않아 실제 로그인은 처리되지 않습니다.";

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
            showMessage(messageElement, name + " 항목을 확인해 주세요.", true);
            invalidField.focus();
            return;
        }

        showMessage(messageElement, PENDING_MESSAGE, false);
    }

    Array.prototype.forEach.call(document.querySelectorAll(".auth_form"), function (form) {
        form.addEventListener("submit", handleSubmit);
    });
})();
