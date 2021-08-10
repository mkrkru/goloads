const goServer = "https://doats.ml:8080";
// const global = require("./global.js");

window.onload = () => {
    document.getElementById("popupModalButtonSend").addEventListener("click", sendData);
    document.getElementById("popupModalButtonGet").addEventListener("click", getData);
    document.getElementById("popupModalButtonDelete").addEventListener("click", deleteData);
    // document.getElementById("switchFloating").addEventListener("click", switchFloating);

    document.getElementById("withdrawMoney").addEventListener("click", withdrawMoney);

    log(document.cookie)
    let allCookies = document.cookie.split(";");
    log(allCookies)
    
    fetch(`${goServer}/info/get`, {
        method: 'POST',
        body: JSON.stringify({ "id": 447509790 })
    })
        .then(res => res.json())
        .then(res => {
            if (res.money) {
                // document.getElementById("nickname").innerHTML = res.nickname;
                document.getElementById("money").innerHTML = `${res.money} GT`;
            } else {
                // document.getElementById("nickname").innerHTML = `<p class="loginLink">Войти</p>`;
                // document.getElementsByClassName("loginLink")[0].addEventListener("click", () => { window.open("http://goloads-site.herokuapp.com") });
            }
        });
}

function withdrawMoney() {
    fetch(`${goServer}/info/withdraw`, {
        method: 'POST',
        body: JSON.stringify({
            "nickname": document.getElementById("nickname").innerHTML,
            "money": parseInt(document.getElementById("money").innerHTML)
        })
    })
        .then(res => res.json())
        .then(res => log(JSON.stringify(res)));
}

function log(what) {
    let rr = document.createElement("p");
    rr.innerHTML = what;
    rr.className = "logs";
    document.body.appendChild(rr);
    setTimeout(() => { rr.remove() }, 5000);
}

function idGen(len) {
    let text = "";
    let charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < len; i++) text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}

function switchFloating() {
    if (global.showFloating) {
        global.showFloating = false;
        document.getElementById("switchFloating").innerHTML = "выкл";
    } else {
        global.showFloating = true;
        document.getElementById("switchFloating").innerHTML = "вкл";
    }
}

function getData() {
    fetch(goServer, { method: 'GET' })
        .then(res => res.json())
        .then(res => log(JSON.stringify(res)))
}

function sendData() {
    let newBannerData = {
        "id": idGen(20),
        "image": document.getElementById("newBannerImage").value,
        "url": document.getElementById("newBannerUrl").value,
        "domains": document.getElementById("newBannerDomains").value.split(" ")
    };

    if ([newBannerData.image, newBannerData.url, newBannerData.domains].includes("")) return;

    fetch(`${goServer}/add`, {
        method: 'POST',
        body: JSON.stringify(newBannerData)
    })
        .then(res => res.json())
        .then(res => log(res.body));

    document.getElementById("newBannerImage").value = "";
    document.getElementById("newBannerUrl").value = "";
    document.getElementById("newBannerDomains").value = "";
}

function deleteData() {
    let oldid = document.getElementById("oldBannerId").value;
    if (oldid.length !== 20) return;

    fetch(`${goServer}/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ "id": oldid })
    })
        .then(res => res.json())
        .then(res => log(res.body));

    document.getElementById("oldBannerId").value = "";
}