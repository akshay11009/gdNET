function render_request_page(arr) {
    let elem = document.getElementById('container-request');
    let inner;
    for(let i = 0 ; i < arr.length ; i++) {
        elem.innerHTML += '<div class="request-content"><div></div><h1></h1><h5></h5><div class="accept">Accept</div><div class="reject">Reject</div></div>';
        inner = elem.getElementsByClassName('request-content')[i];
        inner.setAttribute("onclick" , "go_to_user(" + i + ");")
        inner.getElementsByTagName('h5')[0].innerHTML = arr[i].name;
        inner.getElementsByTagName('h1')[0].innerHTML = arr[i].email;
        inner.style.top = String(140 * i) + 'px';
        inner.getElementsByTagName('div')[0].style.background = "url(../images/default.png) no-repeat center";
        inner.getElementsByTagName('h1')[0].style.display = "none";
        inner.getElementsByClassName('accept')[0].setAttribute("onclick" , "net_update(" + i + ",1);");
        inner.getElementsByClassName('reject')[0].setAttribute("onclick" , "net_update(" + i + ",0);");
    }
}

function load_requests() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            if(sessionStorage.getItem("global_login"))
                render_request_page(JSON.parse(this.responseText).result);
            else
                window.location.href = '/';
        }
    }
    document.getElementById('logo').style.top = "-49px";
    document.getElementById('header-right-prof').innerHTML = 'Profile';
    document.getElementById('header-right').style.display = "block";
    xhttp.open("POST" , "/pull_request?user=" + sessionStorage.getItem("global_login") , true);
    xhttp.send();
}

function net_update(index , _flag) {
    let elem = document.getElementById('container-request').getElementsByClassName('request-content')[index];
    let obj = {
        sender : elem.getElementsByTagName('h1')[0].innerHTML,
        receiver : sessionStorage.getItem("global_login"),
        flag : _flag
    };
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.renderState == 4 && this.status == 200) {

        }

    }

    xhttp.open("POST" , "/add_to_connection?obj=" + JSON.stringify(obj) , true);
    xhttp.send();
}

function go_to_user(index) {
    let elem = document.getElementById('container-request').getElementsByClassName('request-content')[index];
    window.location.href = "/user?email=" + elem.getElementsByTagName('h1')[0].innerHTML;
}

function navigate_to_connections() {
    let link = window.location.href;
    if(link.indexOf("user") != -1) {
        window.location.href = "/network" + window.location.search;
    }
    else
        window.location.href = '/network?email=' + sessionStorage.getItem("global_login");
}

function navigate_to_home() {
    window.location.href = '/landing';
}

function navigate_to_requests() {
    if((window.location.href).indexOf("requests") != -1)
        window.location.href = '/user?email=' + sessionStorage.getItem("global_login");
    else
        window.location.href = "/requests";
}
