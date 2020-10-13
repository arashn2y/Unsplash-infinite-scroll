const imageContainer = document.getElementById("imgContainer");
const loader = document.getElementById("loader");
let ready = false;
let photosLoaded = 0;
let totalPhotos= 0;
let photosArray = [];

function imageLoaded() {
    photosLoaded++;
    if(photosLoaded === totalPhotos){
    ready = true;
    loader.hidden = true;
    }
}
//Function to Make Elements and Attributes
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Show Images 
function showPhotos() {
    totalPhotos = photosArray.length;
    photosArray.forEach((photo) => {
      const anchor = document.createElement("a");
      setAttributes(anchor, {
          href: photo.links.html,
          target: "_blank,"
      });
      const img = document.createElement("img");
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded);
      anchor.appendChild(img);
      imageContainer.appendChild(anchor);
    });
}
// Get Photos From Unsplash API
async function getPhotos(){
    const apiKey = "iYXj-qiLO-fxN3RyPtWHi86RtW8T0Ffw7toHNjsfFdk";
    let apiUrl = ``;
    if (photosLoaded === 0) {
        let photosRequested = 5;
        apiUrl = `https://api.unsplash.com/photos/random/?&client_id=${apiKey}&count=${photosRequested}`;
    } else {
        photosLoaded = 0;
        photosRequested = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?&client_id=${apiKey}&count=${photosRequested}`;
    }
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        showPhotos();
    } catch (error) {
        console.log("Whoops, An error Ocurred!!")
    }
}

// Load More Photos
window.addEventListener("scroll", () => {
if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
}
});
// Get Photos
getPhotos();