const galleryItem = document.getElementsByClassName("gallery-item");
const lightBoxContainer = document.createElement("div");
const lightBoxContent = document.createElement("div");
const lightBoxImg = document.createElement("img");
const lightBoxPrev = document.createElement("div");
const lightBoxNext = document.createElement("div");
const below = document.createElement("div");

const description = document.createElement("p");
const descriptions = ["A beautiful painting of the gold world very huge transparent burning a lonely oak on a hill, dark fantasy, elden ring, hyper detailed, sharp focus, soft light. unreal engine 5 lumen. ray tracing. trending on artstation",
"A beautiful painting of the waterfall and rainbow, dark fantasy, elden ring, hyper detailed, sharp focus, soft light. unreal engine 5 lumen. ray tracing. trending on artstation",
"a lonely bottle with a galaxy inside stands on a table by the window behind which is a forest, cinematic shot, intricate, ornate, photorealistic, ultra detailed, realistic, 1 0 0 mm, photography, octane, high definition, depth of field, bokeh, 8 k, artstation",
"a lonely bottle with a galaxy inside stands on the table of the magic laboratory by the window behind which the forest, cinematic shot, intricate, ornate, photorealistic, ultra detailed, realistic, 1 0 0 mm, photography, octane, high definition, depth of field, bokeh, 8 k, artstation",
"gothic temple, candles, gold jewelry, twilight, cinematic shot, intricate, ornate, photorealistic, ultra detailed, realistic, 1 0 0 mm, photography, octane, high definition, depth of field, bokeh, 8 k",
"Post apocalyptic district hospital, by simon stålenhag, by thomas kinkade, trending on artstation, vivid colors, polychromatic, polished, beautiful, hdr unreal engine 64 megapixels imax terragen 4.0, 8k resolution",
"Floating island in the sky, waterfall, low poly, few clouds, isometric art, 3d art, high detail, artstation, concept art, behance, ray tracing, smooth, sharp focus, ethereal lighting",
"a small cute blue dragon perched on a footstool, photography, Canon EOS, color, cinematic postprocessing"]
const copy = document.createElement("button");



lightBoxContainer.classList.add("lightbox");
lightBoxContent.classList.add("lightbox-content");
lightBoxPrev.classList.add("fa", "fa-angle-left", "lightbox-prev");
lightBoxNext.classList.add("fa", "fa-angle-right", "lightbox-next");
description.classList.add("description");
below.classList.add("below");
copy.classList.add("copy");

lightBoxContainer.appendChild(lightBoxContent);
lightBoxContent.appendChild(lightBoxImg);
lightBoxContent.appendChild(lightBoxPrev);
lightBoxContent.appendChild(lightBoxNext);
lightBoxContent.appendChild(below);
below.appendChild(description);
below.appendChild(copy);

copy.innerHTML = '⎘ copy text';





document.body.appendChild(lightBoxContainer);

let index = 1;

function showLightBox(n) {
    if (n > galleryItem.length - 1) {
        index = 1;
    } else if (n < 1) {
        index = galleryItem.length - 1;
    }
    let imageLocation = galleryItem[index-1].children[0].getAttribute("src");
    lightBoxImg.setAttribute("src", imageLocation);
    description.innerHTML = descriptions[index - 1];

}

function currentImage() {
    lightBoxContainer.style.display = "block";

    let imageIndex = parseInt(this.getAttribute("data-index"));
    showLightBox(index = imageIndex);
}
for (let i = 0; i < galleryItem.length; i++) {
    galleryItem[i].addEventListener("click", currentImage);
}

function slideImage(n) {
    showLightBox(index += n);
}
function prevImage() {
    slideImage(-1);
}
function nextImage() {
    slideImage(1);
}
lightBoxPrev.addEventListener("click", prevImage);
lightBoxNext.addEventListener("click", nextImage);

function closeLightBox() {
    if (this === event.target) {
        lightBoxContainer.style.display = "none";
    }
}
lightBoxContainer.addEventListener("click", closeLightBox);


function copied() {
  let text = description.innerHTML;

  try {
    navigator.clipboard.writeText(description.innerHTML);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
  
}

copy.addEventListener("click", copied);
