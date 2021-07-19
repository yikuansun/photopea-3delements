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
                thumbnail: document.querySelector("input[name=thumbnail]").value,
                model: document.querySelector("input[name=model]").value
            })
        }),
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(response) {
        status.innerHTML = "Thanks for your submission!";
        form.reset();
        document.body.style.cursor = "";
    }).catch(function(error) {
        status.innerHTML = "Oops! There was a problem submitting your form";
        document.body.style.cursor = "";
    });
    document.body.style.cursor = "wait";
}

form.addEventListener("submit", handleSubmit);