const client = filestack.init("ABNI3B81LSv6GvcqZyIOcz");

function pickModel() {
    var picker = client.picker({
        maxFiles: 1,
        minFiles: 1,
        onUploadDone: function(e) {
            console.log(e);
            document.querySelector("input[name=model]").value = e.filesUploaded[0].url;
            document.querySelector("#modelLabel").innerText = e.filesUploaded[0].filename;
        }
    });
    picker.open();
}

function pickThumb() {
    var picker = client.picker({
        maxFiles: 1,
        minFiles: 1,
        accept: "image/*",
        onUploadDone: function(e) {
            console.log(e);
            document.querySelector("input[name=thumbnail]").value = e.filesUploaded[0].url;
            document.querySelector("#thumbLabel").innerText = e.filesUploaded[0].filename;
        }
    });
    picker.open();
}