class OverlayImporter {
    baseNode;
    importPath;

    constructor(baseNode, importPath) {
        this.baseNode = baseNode;
        this.importPath = importPath;
        this.import();
    }

    async import() {
        const overlayHTML = await (fetch(this.importPath, {cache:"no-store", headers:{"Accept":"text/html"}}).then(res=>res.text()));

        if(overlayHTML){ 
            
            const container = document.createElement("div");
            container.innerHTML = overlayHTML;

            this.baseNode.parentElement.insertBefore(container.children[0], this.baseNode);

        } else {
            console.error("OverlayImporterException: the fetch had an error.");
        }
    }
}

window.temp01 = new OverlayImporter(document.currentScript, document.currentScript.getAttribute("data-import-path"));