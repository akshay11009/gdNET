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
        inner.getElementsByTagName('div')[0].style.background = "url(../images/default.png) no-repeat center";
        inner.setAttribute("onclick" , "user_go(" + i + ");");
    }
}


function load_connections() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
            render_connection(JSON.parse(this.responseText).network);
    }
    document.getElementById('logo').style.top = "-49px";
    document.getElementById('header-right-prof').innerHTML = 'Profile';
    document.getElementById('header-right').style.display = "block";
    xhttp.open("POST" , "/request_info?email=" + window.location.search.substring(7) , true);
    xhttp.send();
}

function user_go(index) {
    let elem = document.getElementById('connections').getElementsByClassName('connection-div')[index];
    window.location.href = "/user?email=" + elem.getElementsByTagName('h1')[0].innerHTML;
}

function navigate_to_home() {
    window.location.href = '/landing';
}

function navigate_to_connections() {
    console.log("Navigated");
}

function navigate_to_requests() {
    window.location.href = "/user?email=" + sessionStorage.getItem("global_login");
}
