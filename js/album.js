const gallery = document.querySelector(".gallery");

let slide = 0;
const maxSlides = 3; // adjust based on image count

document.querySelector(".next").onclick = () => {
  slide = Math.min(slide + 1, maxSlides);
  gallery.style.transform = `translateX(-${slide * 100}%)`;
};

document.querySelector(".prev").onclick = () => {
  slide = Math.max(slide - 1, 0);
  gallery.style.transform = `translateX(-${slide * 100}%)`;
};

// Viewer
function openViewer(img) {
  document.getElementById("viewer").style.display = "flex";
  document.getElementById("viewerImg").src = img.src;
}

function closeViewer() {
  document.getElementById("viewer").style.display = "none";
}
