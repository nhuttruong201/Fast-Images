$(document).ready(() => {
    // modal share
    if ($("#share_state").val() === "true") {
        $("#switch_toggle_share").prop("checked", true);
        $("#box_readonly_state").show();
    }

    // if ($("#readonly_state").val() === "false") {
    //     $("#switch_toggle_readonly").prop("checked", true);
    // }

    // modal security
    if ($("#current_pass").val() !== "") {
        $("#switch_toggle_pass").prop("checked", true);
        $("#password").val($("#current_pass").val());
        $("#password").show();
    }
});
