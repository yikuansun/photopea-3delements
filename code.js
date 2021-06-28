var clara = claraplayer(document.querySelector("#clara-embed"));

clara.on("loaded", function() {
    console.log("Clara player is loaded and ready");
});

// Fetch and initialize the sceneId
clara.sceneIO.fetchAndUse("790976e3-f99c-4f34-b475-f83fa14693b8");