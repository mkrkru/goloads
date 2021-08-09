const ip = "192.168.239.18";

function log(what) {
    let rr = document.createElement("p");
    rr.innerHTML = what;
    rr.className = "logs";
    document.body.appendChild(rr);
    setTimeout(() => { rr.remove() }, 5000);
};

function idGen(len) {
    let text = "";
    let charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < len; i++) text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}

window.onload = () => {
    log(document.domain);

    document.getElementById("popupModalButtonSend").addEventListener("click", sendData);
    document.getElementById("popupModalButtonGet").addEventListener("click", getData);
    document.getElementById("popupModalButtonDelete").addEventListener("click", deleteData);
    document.getElementById("switchFloating").addEventListener("click", switchFloating);
}

function switchFloating() {
    if (showFloating) {
        showFloating = false;
        document.getElementById("switchFloating").innerHTML = "выкл";
    } else {
        showFloating = true;
        document.getElementById("switchFloating").innerHTML = "вкл";
    }
}

function sendData() {
    let newBannerData = {
        "id": idGen(20),
        "image": document.getElementById("newBannerImage").value,
        "url": document.getElementById("newBannerUrl").value,
        "domains": document.getElementById("newBannerDomains").value.split(" ")
    };

    if ([newBannerData.image, newBannerData.url, newBannerData.domains].includes("")) return;

    fetch(`http://${ip}:8080/add`, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBannerData)
    })
        .then(res => res.json())
        .then(res => log(res.body));

    document.getElementById("newBannerImage").value = "";
    document.getElementById("newBannerUrl").value = "";
    document.getElementById("newBannerDomains").value = "";
}

function getData() {
    fetch(`http://${ip}:8080`, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => res.forEach(x => x.id.length === 20 ? log(JSON.stringify(x)) : null))
}

function deleteData() {
    let oldid = document.getElementById("oldBannerId").value;
    if (oldid.length !== 20) return;

    fetch(`http://${ip}:8080/delete`, {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id": oldid })
    })
        .then(res => res.json())
        .then(res => log(res.body));

    document.getElementById("oldBannerId").value = "";
}