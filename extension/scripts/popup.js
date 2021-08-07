function log(what) {
    let rr = document.createElement("p");
    rr.innerHTML = what;
    document.body.appendChild(rr);
    setTimeout(() => { rr.remove() }, 5000);
};

window.onload = () => {
    document.getElementById("popupModalButtonSend").addEventListener("click", sendData);
    document.getElementById("popupModalButtonGet").addEventListener("click", getData);
}

function sendData() {
    let newBannerData = {
        "image": document.getElementById("newBannerImage")?.value,
        "url": document.getElementById("newBannerUrl")?.value,
        "domains": document.getElementById("newBannerDomains")?.value
    };

    if ([newBannerData.image, newBannerData.url, newBannerData.domains].includes("")) return;

    fetch("http://192.168.239.83:8080/add", {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBannerData)
    });

    document.getElementById("popupModalButtonSend").innerHTML = "OK";
    setTimeout(() => { document.getElementById("popupModalButtonSend").innerHTML = "send" }, 1500);
}

function getData() {
    fetch("http://192.168.239.83:8080", {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => log(res.body))
}