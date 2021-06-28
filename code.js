var clara = claraplayer(document.querySelector("#clara-embed"));

clara.on("loaded", function() {
    console.log("Clara player is loaded and ready");
});

// Fetch and initialize the sceneId
clara.sceneIO.fetchAndUse("36f47863-c0b9-467f-a64f-78e34e2d894e");