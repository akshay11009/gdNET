function render_connection(arr) {
    console.log(arr.length);
    let elem = document.getElementById('connections');
    let inner;
    for(let i = 0 ; i < arr.length ; i++) {
        elem.innerHTML += '<div class="connection-div"><h1></h1><div></div><h4></h4><h5></h5>';
        inner = elem.getElementsByClassName('connection-div')[i];
        inner.style.top = String(140 * i) + 'px';
        inner.getElementsByTagName('h1')[0].innerHTML = arr[i].email;
        inner.getElementsByTagName('h1')[0].style.display = "none";
        inner.getElementsByTagName('h4')[0].innerHTML = arr[i].name;
        inner.getElementsByTagName('h5')[0].innerHTML = arr[i].role;
        inner.setAttribute("onclick" , "user_go(" + i + ");");
    }
}


function load_connections() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
            render_connection(JSON.parse(this.responseText).network);
    }
    xhttp.open("POST" , "/request_info?email=" + window.location.search.substring(7) , true);
    xhttp.send();
}

function user_go(index) {
    let elem = document.getElementById('connections').getElementsByClassName('connection-div')[index];
    window.location.href = "/user?email=" + elem.getElementsByTagName('h1')[0].innerHTML;
}
