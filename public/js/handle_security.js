$(document).ready(() => {
    // init modal security

    $("#btn_call_security").click(() => {
        $("#btn_toggle_security").click();
    });

    $("#btn_toggle_security").click(() => {
        let passCurrent = $("#current_pass").val().trim();
        $("#password").val(passCurrent);
        if (passCurrent !== "") {
            console.log("True");
            $("#switch_toggle_pass").prop("checked", true);
            $("#password").show();
        } else {
            console.log("False");
            $("#switch_toggle_pass").prop("checked", false);
            $("#password").hide();
        }
    });

    $("#switch_toggle_pass").click(() => {
        if ($("#switch_toggle_pass").prop("checked")) {
            $("#password").show(200);
            $("#password").focus();
            $("#box_noti_modal_security").hide();
        } else {
            $("#password").hide(200);
            $("#box_noti_modal_security").hide();
        }
    });

    $("#btn_update_pass").click(() => {
        handleUpdatePass();
    });

    $("#password").keypress((e) => {
        if (e.which === 13) {
            handleUpdatePass();
        }
    });
});

// TODO Method
let handleUpdatePass = async () => {
    if ($("#switch_toggle_pass").prop("checked")) {
        let newPassword = $("#password").val();
        if (newPassword.length < 4 || newPassword.length > 20) {
            showNotiModal("security", false, "Mật khẩu từ 4 - 20 kí tự!");
            $("#password").focus();
        } else {
            let { result, message } = await updatePass(newPassword);
            showNotiModal("security", result, message);

            $("#current_pass").val(
                !result ? $("#current_pass").val() : newPassword
            );
        }
    } else {
        let { result, message } = await updatePass("");
        message = !result ? message : "Đã tắt mật khẩu!";
        showNotiModal("security", result, message);

        $("#current_pass").val(!result ? $("#current_pass").val() : "");
    }
};

let updatePass = (newPassword) => {
    return new Promise(async (resolve, reject) => {
        let code = $("#current_code").val();
        let currentPassword = $("#current_pass").val();
        $.post("/api/update-pass", {
            code,
            currentPassword,
            newPassword,
        })
            .done((data) => {
                console.log(data);
                if (data.status === 404) {
                    resolve({
                        result: false,
                        message: "Yêu cầu không hợp lệ!",
                    });
                    return;
                }
                resolve({
                    result: true,
                    message: "Đã cập nhật mật khẩu!",
                });
            })
            .fail((err) => {
                console.log(err);
                resolve({
                    result: false,
                    message: "Máy chủ gặp sự cố!",
                });
            });
    });
};
