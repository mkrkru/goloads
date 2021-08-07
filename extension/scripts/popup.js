window.onload = () => {
    document.getElementById("popupModalButtonSend").addEventListener("click", sendData);
    document.getElementById("popupModalButtonGet").addEventListener("click", getData);
}

function sendData() {
    fetch("http://192.168.239.83:8080/add", {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "image": "https://steamuserimages-a.akamaihd.net/ugc/1752432259979938956/1CABED7C89C38A6E2B9F7F798F1FC7A2380842A3/?imw=512&amp;imh=341&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true", // url-адрес картинки баннера
            "url": "yandex.ru", // url-адрес, ведущий на их сайт
            "domens": ["stackoverflow.com"] // домены, на которых показывать рекламу
        })
    })
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
        .then(res => { return res })
}