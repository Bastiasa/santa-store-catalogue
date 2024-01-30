
const imagesContainer = document.getElementById("images-container");

const overlayImageContainer = document.getElementById("overlay-img-container");
const overlayImage = document.getElementById("overlay-img");

const closeOverlayButton = document.getElementById("close-overlay-button");
const nextImageButton = document.getElementById("next-image-button");
const prevImageButton = document.getElementById("prev-image-button");

async function createImage(src) {

    const waitResult = await new Promise((resolve, reject)=> {
        fetch(src, {method:"HEAD"}).then(response=>{
            resolve(response.ok);
        }).catch(err=>{
            resolve(false);
        });
    });

    if(!waitResult) {
        return null;
    }

    const newImageContainer = document.createElement("div");
    const newImage = new Image();

    newImage.src = src;
    newImage.alt = "_new"

    newImageContainer.classList.add("image-container");
    newImageContainer.appendChild(newImage);
    
    return newImageContainer;
}

function formatNumber(num) {
    if(num < 10) {
        return "00"+num.toString();
    } else if (num < 100) {
        return "0"+num.toString();
    } else {
        return num.toString();
    }
}

async function main() {
    var imagesInfo = await (fetch("images-num.txt", {cache:"no-cache"})).then(response=>response.text())
    imagesInfo = imagesInfo.split(",");

    imagesInfo[0] = imagesInfo[0].trim();
    imagesInfo[1] = imagesInfo[1].trim();

    const imagesNum = parseInt(imagesInfo[0]);
    const imagesStartName = imagesInfo[1];

    for (let imageNumber = parseInt(imagesStartName); imageNumber < imagesNum; imageNumber++) {

        const image = await createImage("images_folder/"+formatNumber(imageNumber)+".png");

        if(image) {
            imagesContainer.appendChild(image);
            image.onclick = (e)=>setCurrentImage(image.children[0]);
        } else {
            continue;
        }
        
    }
}

main();


function setCurrentImage(imgElement) {
    if(imgElement instanceof Image) {
        overlayImageContainer.classList.remove("hidden");
        overlayImage.src = imgElement.getAttribute("src");
    } else {
        console.log(imgElement, "is not an Image.");
    }
}


closeOverlayButton.addEventListener("click", ()=>{
    overlayImageContainer.classList.add("hidden");
});

nextImageButton.addEventListener("click", ()=>{
    const currentImageContainer = imagesContainer.querySelector("img[src=\""+overlayImage.getAttribute("src")+"\"]").parentElement;
    const currentImageIndex =  Array.from(imagesContainer.children).lastIndexOf(currentImageContainer);
    let nextImageIndex = (currentImageIndex+1 > imagesContainer.children.length) ? 0 : currentImageIndex+1;

    setCurrentImage(imagesContainer.children[nextImageIndex].children[0]);
});

prevImageButton.addEventListener("click", ()=>{
    const currentImageContainer = imagesContainer.querySelector("img[src=\""+overlayImage.getAttribute("src")+"\"]").parentElement;
    const currentImageIndex =  Array.from(imagesContainer.children).lastIndexOf(currentImageContainer);
    let prevImageIndex = (currentImageIndex-1 < 0) ? imagesContainer.children.length-1 : currentImageIndex-1;

    setCurrentImage(imagesContainer.children[prevImageIndex].children[0]);
});