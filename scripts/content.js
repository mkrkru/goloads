const ip = "192.168.239.18";
let showFloating = false;

const createDoc = size => {
    let n = document.createElement("div");
    n.innerHTML = `<a href="http://goloads-site.herokuapp.com" target="_blank">
        <img src="https://cdn.glitch.com/aefffd54-cc9e-4111-9d79-95efe81e4b99%2Fimg.png?v=1628429421554" style="${size}">
    </a>`;
    n.addEventListener("click", () => {
        fetch(`http://${ip}:8080/clicked`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "id": "banner_clicked" })
        });
    });
    return n;
};

// yandex
// stackoverflow
// vk
// youtube
// github

window.onload = () => {
    let current = window.location;
    if (current.host.includes("192") || current.host.includes("magazik")) return;

    if (current.hostname.includes("yandex")) {

        if (current.pathname.includes("search")) {
            let newdoc = createDoc("height: 80px; width: 500px;");
            newdoc.className = "addableBannerYandexSearch";
            document.getElementsByClassName("main__center")[0].before(newdoc);
        } else {
            let newdoc = createDoc("height: 110px; width: 900px;");
            newdoc.className = "addableBannerYandex";
            document.getElementsByClassName("container__search")[0].after(newdoc);
        }

    } else if (current.hostname.includes("stackoverflow")) {

        let newdoc = createDoc("height: 80px; width: 700px;");
        newdoc.className = "addableBannerStack";
        document.getElementsByClassName("js-report-ad-button-container")[0].after(newdoc);

    } else if (current.hostname.includes("vk")) {

        // document.getElementsByClassName("ads_ad_box").forEach(x => x.remove());

        let newdoc = createDoc("height: 165px; width: 145px;");
        newdoc.className = "addableBannerVk";
        document.getElementsByClassName("side_bar_nav")[0].after(newdoc);

        document.getElementById("ads_left").remove();

    } else if (current.host.includes("youtube")) {

        if (current.pathname.includes("watch")) {
            let newdoc = createDoc("height: 94px; width: 374px;");
            // newdoc.className = "addableBannerYtWatch";
            document.getElementsByClassName("ytd-item-section-renderer")[0].before(newdoc);
        } else {
            let newdoc = createDoc("width: 1504px; height: 120px;");
            newdoc.className = "addableBannerYt";
            document.getElementsByClassName("ytd-rich-grid-renderer")[0].before(newdoc);
        }

    } else if (current.host.includes("github")) {

        let newdoc = createDoc("width: 720px; height: 80px;");
        document.getElementsByClassName("news")[0].before(newdoc);

    } else {
        // if (!showFloating) return;
        // let newdoc = createDoc("height: 80px; width: 500px");
        // newdoc.className = "addableBannerFloat";
        // document.body.appendChild(newdoc);
    };

    // for (let i = 0; i < images.length; i++) images[i].src = `http://placekitten.com/${images[i].width}/${images[i].height}`;
}