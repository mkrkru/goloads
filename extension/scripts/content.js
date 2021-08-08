let createDoc = size => {
    let n = document.createElement("div");
    n.innerHTML = `<a href="http://192.168.239.14:3000" target="_blank">
        <img src="https://cdn.glitch.com/aefffd54-cc9e-4111-9d79-95efe81e4b99%2Fimg.png?v=1628429421554" style="${size}">
    </a>`;
    return n;
};

window.onload = () => {
    let current = window.location;
    console.log(current);

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

        let newdoc = createDoc("height: 165px; width: 145px;");
        newdoc.className = "addableBannerVk";
        document.getElementsByClassName("side_bar_nav")[0].before(newdoc);

    } else if (current.host.includes("192")) {
        
        null

    } else {
        let newdoc = createDoc("height: 80px; width: 500px");
        newdoc.className = "addableBannerFloat";
        document.body.appendChild(newdoc);
    }

    // for (let i = 0; i < images.length; i++) images[i].src = `http://placekitten.com/${images[i].width}/${images[i].height}`;
}