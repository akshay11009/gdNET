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
        inner.getElementsByTagName('h1')[0].style.display = "none";
        inner.getElementsByClassName('accept')[0].setAttribute("onclick" , "net_update(" + i + ",1);");
        inner.getElementsByClassName('reject')[0].setAttribute("onclick" , "net_update(" + i + ",0);");
    }
}

function load_requests() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            render_request_page(JSON.parse(this.responseText).result);
        }
    }

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
