window.onload = () => {
    let images = document.getElementsByTagName('img');
    for (let i = 0, l = images.length; i < l; i++) {
        images[i].src = `http://placekitten.com/${images[i].width}/${images[i].height}`;
    };
}