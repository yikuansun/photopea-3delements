var modelViewer = document.querySelector("model-viewer");

function getURI() {
    return modelViewer.toDataURL();
}

function addToDocument() {
    Photopea.runScript(window.parent, `app.open("${getURI()}", null, true);`);
}

function newDoc() {
    const dimensions = [1000, 1000];
    Photopea.runScript(window.parent, `app.documents.add(${dimensions[0]}, ${dimensions[1]}, 72, "Exported");`).then(function() {
        addToDocument();
    });
}

function uploadFromDevice() {
    var input = document.createElement("input");
    input.type = "file";
    input.style.visibility = "hidden";
    document.body.appendChild(input);
    input.addEventListener("change", function() {
        var file = this.files[0];
        var fileReader = new FileReader();
        fileReader.onloadend = function(e) {
            var arrayBuffer = e.target.result;
            var fileType = "application/glb";
            var blob = new Blob([arrayBuffer], { type: fileType });
            var URI = URL.createObjectURL(blob);
            console.log(URI);
            modelViewer.src = URI;
        };
        fileReader.readAsArrayBuffer(file);
    });
    input.click();
}