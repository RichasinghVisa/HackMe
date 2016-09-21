/*
Copyright (C) 2016 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information
*/

// Registry of attribute name used to define the URL to template (e.g. documentURL or menuBarDocumentURL)
// to controller type (e.g. DocumentController or MenuBarController)
const attributeToController = {};
const attributeKeys = [];

function registerAttributeName(type, func) {
    attributeToController[type] = func;
    attributeKeys.push(type);
}

function resolveControllerFromElement(elem) {
    for (var i = 0, key; i < attributeKeys.length; i++) {
        key = attributeKeys[i];
        if (elem.hasAttribute(key)) {
            return {
                type: attributeToController[key],
                url: elem.getAttribute(key)
            };
        }
    }
}

function DocumentController(documentLoader, documentURL, loadingDocument) {
    this.handleEvent = this.handleEvent.bind(this);
    this._documentLoader = documentLoader;
    documentLoader.fetch({
        url: documentURL,
        success: function(document) {
            // Add the event listener for document
            this.setupDocument(document);
            // Allow subclass to do custom handling for this document
            this.handleDocument(document, loadingDocument);
        }.bind(this),
        error: function(xhr) {
            const alertDocument = createLoadErrorAlertDocument(documentURL, xhr, false);
            this.handleDocument(alertDocument, loadingDocument);
        }.bind(this)
    });
}

registerAttributeName('documentURL', DocumentController);

DocumentController.prototype.setupDocument = function(document) {
    document.addEventListener("select", this.handleEvent);
    document.addEventListener("play", this.handleEvent);
    document.addEventListener("upArrow", this.handleMenu);
};

DocumentController.prototype.handleDocument = function(document, loadingDocument) {
    if (loadingDocument) {
        navigationDocument.replaceDocument(document, loadingDocument);
    } else {
        navigationDocument.pushDocument(document);
    }
};
function launchPlayer() {  
   var player = new Player();  
   var playlist = new Playlist();  
   var mediaItem = new MediaItem("video", "http://trailers.apple.com/movies/focus_features/9/9-clip_480p.mov");  
   player.playlist = playlist;  
   player.playlist.push(mediaItem);  
   player.present();
   //player.play() 
}

DocumentController.prototype.handleMenu = function (event) {
    const alertDocument = createAlertDocument("Shobhit", "here", false);
            this.handleDocument(alertDocument, false);
}
    

DocumentController.prototype.handleEvent = function(event) {
    const target = event.target;
    var loadingDocument;
    launchPlayer();
    //const alertDocument = createAlertDocument('shobhit', 'Play video file here', false);
           // this.handleDocument(alertDocument, loadingDocument);

    /*const controllerOptions = resolveControllerFromElement(target);
    if (controllerOptions) {
        const controllerClass = controllerOptions.type;
        const documentURL = controllerOptions.url;
        var loadingDocument;
        if (!controllerClass.preventLoadingDocument) {
            loadingDocument = createLoadingDocument();
            navigationDocument.pushDocument(loadingDocument);
        }
        // Create the subsequent controller based on the atribute and its value. Controller would handle its presentation.
        new controllerClass(this._documentLoader, documentURL, loadingDocument);
    }
    else if (target.tagName === 'description') {
        // Handle description tag, if no URL was specified
        const body = target.textContent;
        const alertDocument = createDescriptiveAlertDocument('', body);
        navigationDocument.presentModal(alertDocument);
    }*/
};
