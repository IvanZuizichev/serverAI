let descriptions = [
    "A beautiful painting of the gold world very huge transparent burning" +
    " a lonely oak on a hill, dark fantasy, elden ring, hyper detailed, " +
    "sharp focus, soft light. unreal engine 5 lumen. ray tracing. trending " +
    "on artstation",
    "A beautiful painting of the waterfall and rainbow, dark fantasy," +
    " elden ring, hyper detailed, sh    arp focus, soft light. unreal engine 5 lumen." +
    " ray tracing. trending on artstation",
    "a lonely bottle with a galaxy inside stands on a table by the window behind" +
    " which is a forest, cinematic shot, intricate, ornate, photorealistic, ultra " +
    "detailed, realistic, 1 0 0 mm, photography, octane, high definition, depth of" +
    " field, bokeh, 8 k, artstation",
    "gothic temple, candles, gold jewelry, twilight, cinematic shot, intricate, ornate," +
    " photorealistic, ultra detailed, realistic, 1 0 0 mm, photography, octane," +
    " high definition, depth of field, bokeh, 8 k"];


$(window).on("load", () => {
    //    $("#slider").carousel({interval: false});
    //    $("#slider").on("slid.bs.carousel", () => {
    //        clearTimeout(window.nt);
    //        window.nt = setTimeout(next, 10000)
    //    })
    $(".carousel").carousel({
        onCycleTo: () => {
            clearTimeout(window.nt);
            window.nt = setTimeout(next, 10000)
            $("#background-image").css("background-image", `url('/static/img/gallery/examples/blurred/back_${$(".active").data("index")}.jpeg')`)
        }
    });
    window.nt = setTimeout(next, 10000);
});
next = () => {
    clearTimeout(window.nt);
    $(".carousel").carousel("next");
    // index = $('.carousel-item.active').data("index");
    // $("#slider").carousel("next");
    // $("#background-image").toggleClass("anim");
    // setTimeout(()=>{$("#background-image").toggleClass("anim");}, 1000)
};
prev = () => {
    clearTimeout(window.nt);
    $(".carousel").carousel("prev")
};
