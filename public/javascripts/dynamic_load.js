function render_user(obj) {

    let elem;
    if(obj.work != '') {
        elem = document.getElementById('body-profile-left').getElementsByTagName('div')[0];
        elem.innerHTML = '<h2><span>WORK</span></h2><ul><li class="job">' + obj.work + '</li><li class="cur"><span>CURRENT</span></li></ul>';
    }
    elem = document.getElementById('skills');
    elem.innerHTML = '<li>None</li>';
    if(obj.skills.length > 0) {
        let inner = '';
        for(let i = 0 ; i < obj.skills.length ; i++)
            inner = inner + '<li>' + obj.skills[i] + '</li>';
        elem.innerHTML = inner;
    }
    elem = document.getElementById('info-name');
    let innerName = '<li><h1>' + obj.name + '</h1></li>';
    let innerPlace = '<li id="marker"><span class = "fa fa-map-marker"></span></li><li id="place">' + obj.place + '</span></li>';
    elem.innerHTML = innerName + innerPlace;
    elem = document.getElementById('body-profile-mid').getElementsByTagName('h6')[0];
    elem.innerHTML = obj.role;
    elem = document.getElementById('body-profile-mid').getElementsByTagName('h3');
    elem.innerHTML = 'Score : ' + obj.score;
    elem = document.getElementById('about-basic').getElementsByTagName('ul')[0];
    elem.innerHTML = '<li>Email : ' + obj.email + '<li>';
    elem = document.getElementById('about-basic').getElementsByTagName('ul')[1];
    elem.innerHTML = '';
    if(obj.birthday != '')
        elem.innerHTML = '<li>Birthday :' + obj.birthday + '</li>';
    elem = document.getElementById('collaborate-button').getElementsByTagName('span')[0];
    if(obj.email == sessionStorage.getItem("global_login"))
        elem.innerHTML = "Organize";
    else
        elem.innerHTML = "Collaborate";
}


function dynamic() {
    let queryString = window.location.search.replace(/%27/g , "'");
    let email = '';
    for(let i = 7 ; i < queryString.length ; i++)
        email = email + queryString[i];
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(sessionStorage.getItem("global_login"))
                render_user(JSON.parse(this.responseText));
            else
                window.location.href = '/';
        }
    };
    document.getElementById("header-right").style.display = "block";
    document.getElementById("logo").style.top = "-49px";
    if((window.location.search).substring(7) == sessionStorage.getItem("global_login"))
        document.getElementById('header-right-prof').innerHTML = 'Requests';
    else
        document.getElementById('header-right-prof').innerHTML = 'Profile';
    xhttp.open("POST",'/request_info?email=' + email , true);
    xhttp.send();
}

function navigate_to_connections() {
    console.log(window.location.search);
    window.location.href = '/network' + window.location.search; 
}

function navigate_to_home() {
    window.location.href = "/landing";
}

function navigate_to_requests() {
    let string = document.getElementById("header-right-prof").innerHTML;
    console.log(string);
    if(string == "Profile") {
        window.location.href = '/user' + window.location.search;
    }
    else {
        window.location.href = '/requests';
    }
}
