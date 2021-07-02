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
    input.accept = "model/gltf-binary";
    input.style.visibility = "hidden";
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
    var library = JSON.parse(await fetchHTTP("https://clara.io/api/scenes?page=1&perPage=100&type=library")).models;
    var out = [];
    for (var model of library) {
        var data = {};
        data.name = model.name;
        data.thumb = `https://clara.io/api/scenes/${model._id}/thumbnail.jpg`;

        var url = `https://clara.io/api/scenes/${model._id}/export/glb?zip=false&centerScene=false`;
        var options = {
            method: "GET",
            headers: {
                Authorization: "Bearer eWlrdWFuczo4YTEwYzNkNi0zNDdjLTQ2NDMtYTEwMi1lODQyYjgxMzUxMjQ=",
            },
            mode: "cors"
        };
        fetch(url, options).then(response => response.blob()).then(function(blob) {
            data.file = URL.createObjectURL(blob);
        });

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
        document.querySelector("#libraryselect").appendChild(img);
    }
});

function showLibrary() {
    document.querySelector("#wall").style.display = "block";
    document.querySelector("#libraryselect").style.display = "block";
}

function hideLibrary() {
    document.querySelector("#wall").style.display = "none";
    document.querySelector("#libraryselect").style.display = "none";
}