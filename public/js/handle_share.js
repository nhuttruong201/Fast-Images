$(document).ready(() => {
    // toggle share
    $("#switch_toggle_share").click(async () => {
        let code = $("#current_code").val();
        let password = $("#current_pass").val();
        let state = false;
        if ($("#switch_toggle_share").prop("checked")) state = true;

        let { result, message } = await handleUpdateShareState(
            code,
            password,
            state
        );

        message = !result
            ? message
            : `Đã ${!state ? "tắt" : "bật"} chế độ chia sẻ!`;

        showNotiModal("share", result, message);
    });
});

// TODO method
let handleUpdateShareState = (code, password, state) => {
    return new Promise(async (resolve, reject) => {
        $.post("/api/update-share-state", {
            code,
            password,
            state,
        })
            .done((data) => {
                // console.log(data);
                if (data.status === 404) {
                    resolve({
                        result: false,
                        message: "Yêu cầu không hợp lệ!",
                    });
                    return;
                }
                resolve({
                    result: true,
                    message: "Thành công!",
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

let copyUrlPublic = async () => {
    await $("#load_content_clipboard").val(location.href);
    let copyText = document.getElementById("load_content_clipboard");
    copyText.select();
    copyText.setSelectionRange(0, 99999); //* mobile
    navigator.clipboard.writeText(copyText.value);
    showNotiMain(true, "Đã sao chép liên kết!", null);
};

let copyUrlPrivate = async () => {
    var link = location.href;
    let domain = link.replace(`/${$("#current_code").val()}`, "");
    let linkPrivate = `${domain}/share/${$("#current_code").val()}`;

    await $("#load_content_clipboard").val(linkPrivate);
    let copyText = document.getElementById("load_content_clipboard");
    copyText.select();
    copyText.setSelectionRange(0, 99999); //* mobile
    navigator.clipboard.writeText(copyText.value);

    showNotiModal("share", true, "Đã sao chép liên kết chia sẻ!", null);
};
