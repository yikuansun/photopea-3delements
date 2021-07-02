var modelViewer = document.querySelector("model-viewer");

function getURI() {
    return modelViewer.toDataURL();
}

function addToDocument() {
    Photopea.runScript(window.parent, `app.open("${getURI()}", null, true);`);
}

function newDoc() {
    const dimensions = [342, 342];
    Photopea.runScript(window.parent, `app.documents.add(${dimensions[0]}, ${dimensions[1]}, 72, "Exported");`).then(function() {
        addToDocument();
    });
}