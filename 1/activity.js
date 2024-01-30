
const imagesContainer = document.getElementById("images-container");

async function createImage(src) {

    const waitResult = await new Promise((resolve, reject)=> {
        fetch(src, {method:"HEAD"}).then(response=>{
            resolve(true);
        }).catch(err=>{
            resolve(false);
        })
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
        } else {
            continue;
        }
        
    }
}

main();