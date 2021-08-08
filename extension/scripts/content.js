window.onload = () => {
    let current = window.location.hostname;
    if (current.includes("://yandex")) {

    } else if (current.includes("://stackoverflow")) {

    } else if (current.includes("://vk")) {
        let doc = document.getElementById("side_bar");
        let astyle = "width: 145px; height: 165px;";
        doc.innerHTML += `<div class="addableBanner">
            <a href="https://yandex.ru" target="_blank">
                <img src="https://im0-tub-ru.yandex.net/i?id=a38fb382660e886fc95b56a9970089ff-l&n=27&h=384&w=480" style=${astyle}>
            </a>
        </div>`;
    };

    // fetch("http://192.168.239.83:8080", {
    //     method: 'GET',
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     }
    // })
    //     .then(res => res.json())
    //     .then(res => {
    //         let nc1 = document.createElement("a");
    //         nc1.href = res.url;
    //         document.body.appendChild(nc1);

    //         let nc2 = document.createElement("img");
    //         nc2.src = res.image;
    //         nc1.appendChild(nc2);
    //     });

    // let mdivs = document.getElementsByClassName('ads_ad_photo');

    // let nc1 = document.createElement("a");
    // nc1.href = "https://ya.ru";
    // nc1.innerHTML = `<img src="https://im0-tub-ru.yandex.net/i?id=a38fb382660e886fc95b56a9970089ff-l&n=27&h=384&w=480">`; // document.createElement("img").src = res.image;
    // nc1.style.cssText = 'height: 384px; width: 480px';
    // document.body.appendChild(nc);
    // for (let i = 0; i < mdivs.length; i++) mdivs[i].replaceWith(nc);

    // let nc2 = document.createElement("img");
    // nc2.src = res.image;
    // nc1.appendChild(nc2);

    // var div = document.createElement('div');
    // div.className = 'tooltip';
    // div.id = 'op';
    // div.style.cssText = 'position: absolute; z-index: 999; height: 16px; width: 16px; top:70px';
    // div.innerHTML = '<span>Test</span>';

    // document.body.appendChild(div);

    // let images = document.getElementsByClassName('ads_ad_box_border');
    // for (let i = 0; i < images.length; i++) images[i]
    // for (let i = 0; i < images.length; i++) images[i].src = `http://placekitten.com/${images[i].width}/${images[i].height}`;
}