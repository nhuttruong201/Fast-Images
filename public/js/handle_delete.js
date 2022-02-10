$(document).ready(() => {
    $(".btn-delete").click((e) => {
        e.preventDefault();
        let button = $(e.target);

        let imageId = button.attr("data-id");
        let imageTitle = button.attr("data-title");

        console.log(imageId, imageTitle);

        bootbox.confirm({
            title: "Bạn có chắc xoá?",
            message: `<strong>${imageTitle}</strong> sẽ bị xoá vĩnh viễn, cân nhắc kĩ trước khi thực hiện.`,
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Huỷ',
                    className: "btn btn-sm btn-secondary",
                },
                confirm: {
                    label: '<i class="fas fa-trash"></i> Chấp nhận xoá',
                    className: "btn btn-sm btn-danger",
                },
            },
            callback: function (result) {
                console.log("This was logged in the callback: " + result);
            },
        });
    });
});

let handleDeleteImage = (_id) => {
    $.post("/api/delete-image", {
        _id,
    })
        .done((data) => {
            if (data.status === 200) {
                location.reload();
                return;
            }
            bootbox.alert("Đã xảy ra lỗi! Vui lòng thử lại sau!");
        })
        .fail((err) => {
            console.log(err);
            bootbox.alert("Đã xảy ra lỗi! Vui lòng thử lại sau!");
        });
};
