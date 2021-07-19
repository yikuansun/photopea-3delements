var modelViewer = document.querySelector("model-viewer");

function getURI() {
    return modelViewer.toDataURL();
}

function addToDocument() {
    Photopea.runScript(window.parent, `app.open("${getURI()}", null, true);`);
}

function newDoc() {
    function toArrayBuffer(dataURL) {
        var base64 = dataURL.split(';base64,')[1];
        var binary_string = window.atob(base64);
        var bytes = new Uint8Array(binary_string.length);
        for (var i = 0; i < binary_string.length; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
    Photopea.addBinaryAsset(window.parent, toArrayBuffer(getURI()));
}

function uploadFromDevice() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "model/gltf-binary";
    input.style.display = "none";
    document.body.appendChild(input);
    input.addEventListener("change", function() {
        var file = this.files[0];
        var fileReader = new FileReader();
        fileReader.onloadend = function(e) {
            var arrayBuffer = e.target.result;
            var fileType = input.accept;
            var blob = new Blob([arrayBuffer], { type: fileType });
            var URI = URL.createObjectURL(blob);
            console.log(URI);
            modelViewer.src = URI;
            input.remove();
        };
        fileReader.readAsArrayBuffer(file);
    });
    input.click();
}

async function fetchHTTP(url) {
    var myPromise = new Promise(function(resolve, reject) {
        var xhttp = new XMLHttpRequest();

        xhttp.onload = function() {
            resolve(this.responseText);
        };

        xhttp.open("GET", url);
        xhttp.send();
    });

    return await myPromise;
}

async function getLibraryData() {
    var csv = await fetchHTTP("https://raw.githubusercontent.com/yikuansun/photopea-3delements/master/data/formsubmission.csv");
    var table = CSVToArray(csv);
    var out = [];
    for (var i = 1; i < table.length; i++) {
        var model = table[i];
        var data = {};
        data.name = model[1];
        data.thumb = JSON.parse(model[3]).url;
        data.file = JSON.parse(model[4]).url;
        out.push(data);
    }
    return out;
}

getLibraryData().then(function(library) {
    for (var model of library) {
        var img = document.createElement("div");
        img.style.backgroundImage = `url("${model.thumb}")`;
        img.style.cursor = "pointer";
        img.alt = model.name;
        img.addEventListener("click", new Function(`
            console.log("${model.file}");
            modelViewer.src = "${model.file}";
            hideLibrary();
        `));
        img.className = "libraryThumb";
        document.querySelector("#library_content").appendChild(img);
    }
});

function showLibrary() {
    document.querySelector("#wall").style.display = "block";
    document.querySelector("#libraryselect").style.left = "0";
}

function hideLibrary() {
    document.querySelector("#wall").style.display = "none";
    document.querySelector("#libraryselect").style.left = "-100%";
}

document.querySelector("#search").addEventListener("input", function() {
    for (var x of document.querySelectorAll(".libraryThumb")) {
        if (x.alt.toLowerCase().includes(this.value.toLowerCase())) {
            x.style.display = "inline-block";
        }
        else {
            x.style.display = "none";
        }
    }
});