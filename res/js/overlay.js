class OverlayImageView {
    overlayContainer;
    overlayImage;

    overlaySpin;

    overlayCloseButton;
    overlayNextButton;
    overlayPrevButton;

    currentIndex;

    isAnimating = false;

    constructor() {
        this.overlayContainer = document.getElementById("overlay-img-container");
        this.overlayImage = document.getElementById("overlay-img");

        this.overlaySpin = document.getElementById("overlay-spin");

        this.overlayCloseButton = document.getElementById("close-overlay-button");
        this.overlayNextButton = document.getElementById("next-image-button");
        this.overlayPrevButton = document.getElementById("prev-image-button");

        this.overlayImage.addEventListener("load", ()=>this.hideLoadingSpin());
        this.overlayImage.addEventListener("error", ()=>this.hideLoadingSpin());
        this.overlayImage.addEventListener("loadstart", ()=>this.showLoadingSpin);

        this.overlayCloseButton.addEventListener("click", ()=>this.hide());
        this.overlayPrevButton.addEventListener("click", ()=>this.prevImage());
        this.overlayNextButton.addEventListener("click", ()=>this.nextImage());
    }

    hideLoadingSpin(duration = 250) {
        this.overlaySpin.classList.add("hidden");

        const imageAnimation = this.overlayImage.animate(
            [
                {opacity:"0"},
                {opacity:"1"}
            ],

            {
                "duration":duration,
                fill:"forwards"
            }
        );

        imageAnimation.play();
        this.overlayImage.classList.remove("hidden");

        setTimeout(() => {
            imageAnimation.cancel();
        }, duration);

    }

    showLoadingSpin() {
        this.overlaySpin.classList.remove("hidden");
        this.overlayImage.classList.add("hidden");
    }

    show(duration=250) {
        if(this.isAnimating) {return}

        this.isAnimating = true;

        this.overlayContainer.animate(
            [
                {opacity:"0"},
                {opacity:"1"}
            ],
            {
                "duration":duration,
                fill:"forwards"
            }
        ).play();

        this.overlayContainer.classList.remove("hidden");

        setTimeout(() => {
            this.isAnimating = false;
        }, duration);
    }

    hide(duration=250) {
        if(this.isAnimating) {return}

        this.isAnimating = true;

        const animation = this.overlayContainer.animate(
            [
                {opacity:"1"},
                {opacity:"0"}
            ],
            {
                "duration":duration,
                fill:"forwards"
            }
        );

        animation.play();

        setTimeout(() => {
            this.overlayContainer.classList.add("hidden");
            this.overlayContainer.style.opacity = undefined;
            animation.cancel();
            this.isAnimating = false;
        }, duration);
    }

    setImage(imageElement) {
        if(imageElement instanceof Image) {
            this.overlayImage.src = imageElement.getAttribute("src");
            this.overlayImage.alt = imageElement.alt;
            this.currentIndex = parseInt(imageElement.getAttribute("data-index"));
            this.showLoadingSpin();

        } else if (typeof imageElement == "string") {
            this.overlayImage.src = imageElement;
            this.currentIndex = -1;
            this.showLoadingSpin();
        } else {
            console.error("OverlayImageViewException: invalid setImage, ", imageElement, " is not a valid argument.");
        }

        this.overlayNextButton.style.display = (this.currentIndex == -1 || isNaN(this.currentIndex)) ? "none" : "unset";
        this.overlayPrevButton.style.display = (this.currentIndex == -1 || isNaN(this.currentIndex)) ? "none" : "unset";

    }

    nextImage() {
        if(this.currentIndex === -1 || isNaN(this.currentIndex)) {
            return;
        }

        const containerElement = window.importer.parentElement;

        if(containerElement) {
            const nextIndex = (this.currentIndex + 1 >= containerElement.children.length) ? 1 : this.currentIndex + 1;
            this.setImage(containerElement.children[nextIndex].querySelector("img"));

        } else {
            console.error("OverlayImageViewException: couldn't find the images container element.");
        }

    }

    prevImage() {
        if(this.currentIndex === -1 || isNaN(this.currentIndex)) {
            return;
        }

        const containerElement = window.importer.parentElement;

        if(containerElement) {
            const nextIndex = (this.currentIndex - 1 < 2) ? containerElement.children.length-1 : this.currentIndex - 1;
            this.setImage(containerElement.children[nextIndex].querySelector("img"));

        } else {
            console.error("OverlayImageViewException: couldn't find the images container element.");
        }
    }
}

window.addEventListener("load", ()=>window.overlay = new OverlayImageView());