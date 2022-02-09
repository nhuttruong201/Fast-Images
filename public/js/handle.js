var $files = null;
$(document).ready(() => {
    $("#btn_submit_code").click(() => {
        window.location.href = `/${$("#code").val()}`;
    });

    $("#code").keypress((e) => {
        if (e.which === 13) {
            window.location.href = `/${$("#code").val()}`;
        }
    });

    $("#img_upload").on("change", function () {
        $files = $(this).get(0).files;
    });

    $("#btn_upload").click(() => {
        if (!$files) {
            alert("Vui long chon file!");
            return;
        }
        uploadToImgurApi($files);
    });
});

let uploadToImgurApi = ($files) => {
    if ($files.length) {
        if ($files[0].size > $(this).data("max-size") * 1024) {
            console.log("Vui lòng chọn file có dung lượng nhỏ hơn!");
            return false;
        }
        console.log($files);
        console.log("Đang upload hình ảnh lên imgur...");
        var apiUrl = "https://api.imgur.com/3/image";
        var apiKey = "58f2ebf29687a0b";
        var settings = {
            async: false,
            crossDomain: true,
            processData: false,
            contentType: false,
            type: "POST",
            url: apiUrl,
            headers: {
                Authorization: "Client-ID " + apiKey,
                Accept: "application/json",
            },
            mimeType: "multipart/form-data",
        };
        var formData = new FormData();
        formData.append("image", $files[0]);
        settings.data = formData;

        $.ajax(settings).done(function (response) {
            console.log(response);

            var obj = JSON.parse(response);

            let code = $("#current_code").val();
            // let title = $("#title").val();
            let title = obj.data.id;
            let url = obj.data.link;

            alert(obj.data.id);

            console.log("\n\n", code, title, url);

            $.post("/api/upload-image", {
                code,
                title,
                url,
            })
                .done((data) => {
                    console.log(data);
                    if (data.status === 200) {
                        window.location.href = `/${code}`;
                    }
                })
                .fail((err) => {
                    console.log(err);
                });
        });
    }
};
