$("#request_slider").slider({
    min: 5,
    max: 15,
    value: 10,
    range: "min",
    animate: "fast",
    slide: function(event, ui) {
        $("#request_slider span").html("<b>&lt;</b>" + ui.value + "<b>&gt;</b>");
    }
});
$("#request_slider span").html("<b>&lt;</b>" + $("#request_slider").slider("value") + "<b>&gt;</b>");
$("#scale").val($("#request_slider").slider("value"));
$(".submit").click(() => {
    $.ajax({
        url: "/bw_check",
        data: $("form").serialize(),
        method: "post",
    }).done(resp => {
        if (resp == "EMPTY") {
            $(".alert").text("Пустой запрос");
            $(".alert").show();
        };
        if (resp == "BANWORD") {
            $(".alert").text("Напишите свой запрос по другому");
            $(".alert").show();
        };
        if (resp == "OK") {
            $("#subform")[0].click();
        };
    });
});
