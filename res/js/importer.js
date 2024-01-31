class ImageContainer {

    containerElement;
    imageElement;
    loadingSpinElement;

    constructor(imageSrc, parentElement = null, onLoad = null, onError = null, ) {
        this.containerElement = document.createElement("div");
        this.imageElement = new Image();
        this.loadingSpinElement = document.createElement("div");


        if(typeof onLoad == "function") {
            this.imageElement.addEventListener("load", (e)=>onLoad(this));
        }

        if(typeof onError == "function") {
            this.imageElement.addEventListener("error", (e)=>onError(this));
        }

        
        this.containerElement.classList.add("image-container");
        this.containerElement.appendChild(this.imageElement);
        this.containerElement.appendChild(this.loadingSpinElement);

        this.containerElement.addEventListener("click", ()=>{
            window.overlay.setImage(this.imageElement);
            window.overlay.show();
        });

        if(parentElement instanceof Element) {
            parentElement.appendChild(this.containerElement);
        }

        this.loadingSpinElement.classList.add("loading-spin");

        this.showLoadingSpin();
        this.imageElement.src = imageSrc;
        
    }

    showLoadingSpin() {
        this.containerElement.classList.add("loading");
        this.loadingSpinElement.classList.remove("hidden");
    }

    hideLoadingSpin() {
        this.containerElement.classList.remove("loading");
        this.loadingSpinElement.classList.add("hidden");
    }

    destroy() {
        this.containerElement.remove();
    }
}

class ImagesImporter {

    parentElement;

    constructor(parentElement) {
        this.parentElement = parentElement;
    }

    async createImageContainer(imageSrc, onLoad = null, onError = null) {
        const newImageContainer = new ImageContainer(imageSrc, this.parentElement, onLoad, onError);
        return newImageContainer;
    }
    

    exists(path) {
        return new Promise((resolve)=>{
            fetch(path, {method:"HEAD", cache:"no-cache"})
            .then(response=>{
                resolve(response.ok);
            })
            .catch(err=>{
                resolve(false);
            });
        });
    }
    
    getText(path, cache = false) {
        return new Promise((resolve)=>{
    
            fetch(path, {method:"GET", cache:(cache) ? "default" : "no-cache"})
            .then(res=>res.text())
            .then(text=>resolve(text))
            .catch(err=>{
                resolve(null);
            });
    
        })
    }
    
    formatNumber(num) {
        if(num < 10) {
            return "00"+num.toString();
        } else if (num < 100) {
            return "0"+num.toString();
        } else {
            return num.toString();
        }
    }
    
    main(imagesInfo, imagesFolderPath) {

        if(!imagesFolderPath || !imagesInfo) {
            console.error("ScriptException: no data for import the images.");
            return;
        }

        let imagesCount;
        let imagesType;

        try {
            imagesCount = parseInt(imagesInfo.split(",")[0].trim());
            imagesType = imagesInfo.split(",")[1].trim();    
        } catch (err) {
            console.error("ScriptException: invalid data for the images: ", err);
            return;
        }
    

        if(isNaN(imagesCount) || !imagesType) {
            console.error("ScriptException: \""+imagesInfo+"\" is incorrect info for the images.");
            return;
        }
    
        for (let imageNumber = 1; imageNumber < imagesCount + 1; imageNumber++) {
    
            const targetSrc = imagesFolderPath+this.formatNumber(imageNumber)+"."+imagesType;
    
            const onImageLoaded = (container)=>{
                container.hideLoadingSpin();
            }
    
            const onImageError = (container)=>{
                container.destroy();
            }
    
           const waitable = this.createImageContainer(targetSrc, onImageLoaded, onImageError); 
           waitable.then(container=>{
                if(container instanceof ImageContainer) {
                    container.imageElement.setAttribute("data-index", imageNumber.toString());
                }
           })
        }
    }
}

var tmp01 = document.currentScript;

window.addEventListener("load", ()=>{
    window.importer = new ImagesImporter(document.getElementById("images-container"));

    var imagesFolder = tmp01.getAttribute("data-images-folder");

    if(!imagesFolder) {
        imagesFolder = "images_folder/"
    } else if (!imagesFolder.endsWith("/")) {
        imagesFolder += "/";
        imagesFolder = imagesFolder.replace("\\", "/");
    }

    window.importer.main(
        tmp01.getAttribute("data-images-info"),
        imagesFolder
    );
});



