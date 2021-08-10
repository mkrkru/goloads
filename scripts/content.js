const current = window.location;
const goServer = "https://doats.ml:8080";
// const global = require("./global.js");

window.onload = () => {
    document.cookie = `tid=447509790; secure`;

    if (current.host.includes("192") || current.host.includes("magazik") || current.host.includes("goloads-site")) return;

    fetch(goServer, { method: 'GET' })
        .then(res => res.json())
        .then(res => choose(res));

    // for (let i = 0; i < images.length; i++) images[i].src = `http://placekitten.com/${images[i].width}/${images[i].height}`;
}

function createDoc(size, res) {
    let n = document.createElement("div");
    n.innerHTML = `<a href="http://${res.url}" target="_blank"><img src="${res.image}" style="${size}"></a>`;

    n.addEventListener("click", () => {
        fetch(`${goServer}/clicked`, {
            method: 'POST',
            body: JSON.stringify({
                "banner_id": res.id,
                "user_id": getId()
            })
        });
    });

    return n;
};

function getId() {
    let obj = {};
    let allCookies = document.cookie.split(/;/);
    for (let i = 0; i < allCookies.length; i++) {
        let cookie = allCookies[i].split(/=/);
        obj[cookie[0].trim()] = cookie[1];
    };
    return obj.tid;
}

function choose(res) {
    // yandex
    // stackoverflow
    // vk
    // youtube
    // github

    if (current.hostname.includes("yandex")) {

        if (current.pathname.includes("search")) {
            let newdoc = createDoc("height: 80px; width: 500px;", res);
            newdoc.className = "addableBannerYandexSearch";
            document.getElementsByClassName("main__center")[0].before(newdoc);
        } else {
            let newdoc = createDoc("height: 110px; width: 900px;", res);
            newdoc.className = "addableBannerYandex";
            document.getElementsByClassName("container__search")[0].after(newdoc);
        }

    } else if (current.hostname.includes("stackoverflow")) {

        let newdoc = createDoc("height: 80px; width: 700px;", res);
        newdoc.className = "addableBannerStack";
        document.getElementsByClassName("js-report-ad-button-container")[0].after(newdoc);

    } else if (current.hostname.includes("vk")) {

        // document.getElementsByClassName("ads_ad_box").forEach(x => x.remove());

        let newdoc = createDoc("height: 165px; width: 145px;", res);
        newdoc.className = "addableBannerVk";
        document.getElementsByClassName("side_bar_nav")[0].after(newdoc);

        document.getElementById("ads_left").remove();

    } else if (current.host.includes("youtube")) {

        if (current.pathname.includes("watch")) {
            let newdoc = createDoc("height: 94px; width: 374px;", res);
            // newdoc.className = "addableBannerYtWatch";
            document.getElementsByClassName("ytd-item-section-renderer")[0].before(newdoc);
        } else {
            let newdoc = createDoc("width: 1504px; height: 120px;", res);
            newdoc.className = "addableBannerYt";
            document.getElementsByClassName("ytd-rich-grid-renderer")[0].before(newdoc);
        }

    } else if (current.host.includes("github")) {

        let newdoc = createDoc("width: 720px; height: 80px;", res);
        document.getElementsByClassName("news")[0].before(newdoc);

    } else {
        // if (!global.showFloating) return;
        // let newdoc = createDoc("height: 80px; width: 500px", res);
        // newdoc.className = "addableBannerFloat";
        // document.body.appendChild(newdoc);
    };

    fetch(`${goServer}/watched`, {
        method: 'POST',
        body: JSON.stringify({ "id": res.id })
    });
};