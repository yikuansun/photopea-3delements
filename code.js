var clara = claraplayer(document.querySelector("#clara-embed"));

clara.on("loaded", function() {
    console.log("Clara player is loaded and ready");
});

// Fetch and initialize the sceneId
clara.sceneIO.fetchAndUse("790976e3-f99c-4f34-b475-f83fa14693b8");

function getURI() {
    var canvas = clara.player.getCanvasElement();
    return canvas.toDataURL();
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