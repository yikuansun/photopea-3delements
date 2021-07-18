var thumbURL;
document.querySelector("input[name=thumbnail]").addEventListener("change", function() {
    var file = this.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function(e) {
        thumbURL = e.target.result;
    };
    fileReader.readAsDataURL(file);
});

var fileURL;
document.querySelector("input[name=model]").addEventListener("change", function() {
    var file = this.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function(e) {
        fileURL = e.target.result;
    };
    fileReader.readAsDataURL(file);
});

var form = document.getElementById("my-form");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    fetch(event.target.action, {
        method: form.method,
        body: JSON.stringify({
            _replyto: document.querySelector("input[name=email]").value,
            data: JSON.stringify({
                name: document.querySelector("input[name=modelname]").value,
                author: document.querySelector("input[name=authorname]").value,
                model: fileURL
            })
        }),
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(response) {
        status.innerHTML = "Thanks for your submission!";
        form.reset();
    }).catch(function(error) {
        status.innerHTML = "Oops! There was a problem submitting your form"
    });
}

form.addEventListener("submit", handleSubmit);