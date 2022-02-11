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

    $("#btn_show_modal_upload").click(() => {
        // alert("btn_show_modal_upload");
        resetBoxUpload();
        ekUpload();
    });
});

let resetBoxUpload = () => {
    $("#uploading").hide();

    document.getElementById("file-image").classList.add("hidden");
    document.getElementById("notimage").classList.remove("hidden");
    document.getElementById("start").classList.remove("hidden");
    document.getElementById("response").classList.add("hidden");
    document.getElementById("file-upload-form").reset();
};

let uploading = (percent) => {
    $("#uploading").show();
    $("#uploading").css("width", `${percent}%`);
    $("#uploading").html(`${percent}%`);
};

// File Upload
function fileDragHover(e) {
    var fileDrag = document.getElementById("file-drag");

    e.stopPropagation();
    e.preventDefault();

    fileDrag.className =
        e.type === "dragover" ? "hover" : "modal-body file-upload";
}

async function fileSelectHandler(e) {
    // Fetch FileList object
    var files = e.target.files || e.dataTransfer.files;

    // Cancel event and hover styling
    fileDragHover(e);

    // Process all File objects

    for (var i = 0, f; (f = files[i]); i++) {
        parseFile(f);
        await uploadFile(f);
    }
    uploading(100);

    setTimeout(() => {
        window.location.href = `/${$("#current_code").val()}`;
    }, 500);
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
        document.getElementById("file-image").src = URL.createObjectURL(file);
    } else {
        document.getElementById("file-image").classList.add("hidden");
        document.getElementById("notimage").classList.remove("hidden");
        document.getElementById("start").classList.remove("hidden");
        document.getElementById("response").classList.add("hidden");
        document.getElementById("file-upload-form").reset();
    }
}

// function setProgressMaxValue(e) {
//     var pBar = document.getElementById("file-progress");

//     if (e.lengthComputable) {
//         pBar.max = e.total;
//     }
// }

// function updateFileProgress(e) {
//     var pBar = document.getElementById("file-progress");

//     if (e.lengthComputable) {
//         pBar.value = e.loaded;
//     }
// }

function ekUpload() {
    function Init() {
        console.log("Upload Initialised");

        var fileSelect = document.getElementById("file-upload"),
            fileDrag = document.getElementById("file-drag"),
            submitButton = document.getElementById("submit-button");

        fileSelect.addEventListener("change", fileSelectHandler, false);

        fileDrag.addEventListener("dragover", fileDragHover, false);
        fileDrag.addEventListener("dragleave", fileDragHover, false);
        fileDrag.addEventListener("drop", fileSelectHandler, false);
    }

    // // Check for the various File API support.
    if (window.File && window.FileList && window.FileReader) {
        Init();
    } else {
        document.getElementById("file-drag").style.display = "none";
    }
}

let uploadFile = async (file) => {
    // output("Vui lòng đợi...");
    console.log(file);
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
    formData.append("image", file);
    settings.data = formData;

    $.ajax(settings).done(async (response) => {
        console.log(response);
        var obj = JSON.parse(response);

        let code = $("#current_code").val();
        let title = obj.data.id;
        let url = obj.data.link;
        console.log("\n\n", code, title, url);

        await $.post("/api/upload-image", {
            code,
            title,
            url,
        })
            .done((data) => {
                console.log(data);
                if (data.status === 200) {
                }
            })
            .fail((err) => {
                console.log(err);
                output("Đã xảy ra lỗi!");
            });
    });
};

// ekUpload();
