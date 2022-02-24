$(document).ready(() => {
    $(".btn-search").click(() => {
        $(".input-search").css({
            width: "300px",
            "border-radius": "0px",
            "background-color": "transparent",
            "border-bottom": "1px solid rgba(255, 255, 255, 0.5)",
            transition: "all 500ms cubic-bezier(0, 0.11, 0.35, 2)",
            "-webkit-transition": "all 500ms cubic-bezier(0, 0.11, 0.35, 2)",
        });
    });

    $("#code").keypress((e) => {
        if (e.which === 13) {
            window.location.href = `/${$("#code").val()}`;
        }
    });

    $("#btn_call_upload").click(() => {
        $("#btn_show_modal_upload").click();
    });

    $("#btn_show_modal_upload").click(() => {
        // alert("btn_show_modal_upload");
        resetBoxUpload();
        ekUpload();
    });
});
let resetBoxUpload = () => {
    // $("#uploading").hide();
    document.getElementById("file-image").classList.add("hidden");
    document.getElementById("notimage").classList.remove("hidden");
    document.getElementById("start").classList.remove("hidden");
    document.getElementById("response").classList.add("hidden");
    document.getElementById("file-upload-form").reset();
};
// File Upload
//
function ekUpload() {
    function Init() {
        console.log("Upload Initialised");

        var fileSelect = document.getElementById("file-upload"),
            fileDrag = document.getElementById("file-drag"),
            submitButton = document.getElementById("submit-button");

        fileSelect.addEventListener("change", fileSelectHandler, false);

        // Is XHR2 available?
        var xhr = new XMLHttpRequest();
        if (xhr.upload) {
            // File Drop
            fileDrag.addEventListener("dragover", fileDragHover, false);
            fileDrag.addEventListener("dragleave", fileDragHover, false);
            fileDrag.addEventListener("drop", fileSelectHandler, false);
        }
    }

    function fileDragHover(e) {
        var fileDrag = document.getElementById("file-drag");

        e.stopPropagation();
        e.preventDefault();

        fileDrag.className =
            e.type === "dragover" ? "hover" : "modal-body file-upload";
    }

    function fileSelectHandler(e) {
        // Fetch FileList object
        var files = e.target.files || e.dataTransfer.files;

        // Cancel event and hover styling
        fileDragHover(e);
        let limit = 4 * 1024 * 1024;
        // Process all File objects
        for (var i = 0, f; (f = files[i]); i++) {
            if (f.size > limit) {
                bootbox.alert("Kích cỡ ảnh quá lớn! Tối đa 4mb!");
                // console.log("Kích cỡ ảnh quá lớn! Tối đa 4mb!");
                continue;
            }
            parseFile(f);
            uploadFile(f);
        }
    }

    // Output
    function output(msg) {
        // Response
        var m = document.getElementById("messages");
        m.innerHTML = msg;
    }

    function parseFile(file) {
        console.log(file.name);
        output("<strong>" + encodeURI(file.name) + "</strong>");

        // var fileType = file.type;
        // console.log(fileType);
        var imageName = file.name;

        var isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(imageName);
        if (isGood) {
            document.getElementById("start").classList.add("hidden");
            document.getElementById("response").classList.remove("hidden");
            document.getElementById("notimage").classList.add("hidden");
            // Thumbnail Preview
            document.getElementById("file-image").classList.remove("hidden");
            document.getElementById("file-image").src =
                URL.createObjectURL(file);
        } else {
            document.getElementById("file-image").classList.add("hidden");
            document.getElementById("notimage").classList.remove("hidden");
            document.getElementById("start").classList.remove("hidden");
            document.getElementById("response").classList.add("hidden");
            document.getElementById("file-upload-form").reset();
        }
    }

    function setProgressMaxValue(e) {
        var pBar = document.getElementById("file-progress");

        if (e.lengthComputable) {
            pBar.max = e.total;
            // console.log("setProgressMaxValue: ", e);
            return;
        }

        pBar.max = 100;
    }

    function updateFileProgress(e) {
        // console.log("updateFileProgress: ", e);
        var pBar = document.getElementById("file-progress");
        if (e.lengthComputable) {
            pBar.value = e.loaded;
            // console.log(pBar.value, e.loaded);
            return;
        }

        pBar.value = 100;
    }

    function uploadFile(file) {
        var xhr = new XMLHttpRequest(),
            fileInput = document.getElementById("class-roster-file"),
            pBar = document.getElementById("file-progress"),
            fileSizeLimit = 1024; // In MB
        if (xhr.upload) {
            // Check if file is less than x MB
            if (file.size <= fileSizeLimit * 1024 * 1024) {
                // Progress bar
                pBar.style.display = "inline";
                xhr.upload.addEventListener(
                    "loadstart",
                    setProgressMaxValue,
                    false
                );
                xhr.upload.addEventListener(
                    "loadstart",
                    updateFileProgress,
                    false
                );

                xhr.upload.addEventListener(
                    "progress",
                    setProgressMaxValue,
                    false
                );
                xhr.upload.addEventListener(
                    "progress",
                    updateFileProgress,
                    false
                );

                // File received / failed
                xhr.onreadystatechange = function (e) {
                    if (xhr.readyState === 4) {
                        // Everything is good!
                        // progress.className =
                        //     xhr.status == 200 ? "success" : "failure";
                        // document.location.reload(true);
                    }
                };

                xhr.onload = function (e) {
                    // console.log("DONE: ", xhr.status);
                    if (xhr.status === 200) {
                        // console.log(xhr.response);
                        setProgressMaxValue(e);
                        updateFileProgress(e);
                        var obj = JSON.parse(xhr.response);

                        let code = $("#current_code").val();
                        let title = obj.data.id;
                        let url = obj.data.link;
                        // console.log("\n\n", code, title, url);
                        uploadToFastImage(code, title, url);
                    }
                };

                // Start upload
                xhr.open("POST", "https://api.imgur.com/3/image");
                // xhr.setRequestHeader("X-File-Name", file.name);
                // xhr.setRequestHeader("X-File-Size", file.size);
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "multipart/form-data");
                xhr.setRequestHeader(
                    "Authorization",
                    "Client-ID 58f2ebf29687a0b"
                );
                xhr.send(file);
            } else {
                output(
                    "Please upload a smaller file (< " + fileSizeLimit + " MB)."
                );
            }
        }
    }

    // Check for the various File API support.
    if (window.File && window.FileList && window.FileReader) {
        Init();
    } else {
        document.getElementById("file-drag").style.display = "none";
    }

    let uploadToFastImage = (code, title, url) => {
        $.post("/api/upload-image", {
            code,
            title,
            url,
        })
            .done((data) => {
                // console.log(data);
                if (data.status === 200) {
                    // output("Hoàn tất!<br/>Tải lại trang để cập nhật nội dung!");
                    location.reload();
                }
            })
            .fail((err) => {
                console.log(err);
                output("Đã xảy ra lỗi!");
            });

        // clear input file
        $("#file-upload").val("");
    };
}
// ekUpload();
