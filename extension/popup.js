window.onload = () => {
    // let but = document.createElement("input");
    // but.setAttribute("id", `addButton${i + rid}`);
    // but.setAttribute("class", "cell");
    // but.setAttribute("type", "button");
    // document.getElementById(`r${rn}`).appendChild(but);

    let images = document.getElementsByTagName('img');
    for (let i = 0, l = images.length; i < l; i++) {
        images[i].src = `http://placekitten.com/${images[i].width}/${images[i].height}`;
    };
}