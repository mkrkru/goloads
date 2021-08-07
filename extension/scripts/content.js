window.onload = () => {
    let images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        images[i].src = `http://placekitten.com/${images[i].width}/${images[i].height}`;
    };
}