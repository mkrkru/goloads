window.onload = () => {
    document.getElementById("popupModalButton").addEventListener("click", testbutton);
}

function testbutton() {
    fetch("http://192.168.239.83:8080/", {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => console.log(res))
}