function fetch_query() {
    if(document.getElementById('search').getElementsByTagName('button')[0].innerHTML == "Close") {
        document.getElementById('search-results').style.display = "none";
        document.getElementById('search').getElementsByTagName('button')[0].innerHTML = "Go";
        return ;
    }
    let query = document.getElementById('search') .getElementsByTagName('input')[0].value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            render_search(JSON.parse(this.responseText).result);
            if((window.location.href).length > 22) {
                document.getElementById('search-results').style.display = "block";
                document.getElementById('search').getElementsByTagName('button')[0].innerHTML = "Close";
            }
        }
    }

    xhttp.open("POST" , "/search_user?query=" + query , true);
    xhttp.send();
}

function render_search(arr) {
    let elem = document.getElementById('search-results');
    for(let i = 0 ; i < arr.length ; i++) {
        elem.innerHTML += '<div class="fetched-results"><div></div><span></span><h1></h1></div>';
        let inner = elem.getElementsByClassName('fetched-results')[i];
        inner.style.top = String(48 * i) + "px";
        inner.setAttribute("onclick" , "to_user_search(" + i + ");");
        inner.getElementsByTagName('span')[0].innerHTML = arr[i].name;
        inner.getElementsByTagName('h1')[0].innerHTML = arr[i].email;
        inner.getElementsByTagName('div')[0].style.background = "url(../images/default.png) no-repeat center";
    }
}

function to_user_search(index) {
    window.location.href = '/user?email=' + document.getElementsByClassName('fetched-results')[index].getElementsByTagName('h1')[0].innerHTML;
}

