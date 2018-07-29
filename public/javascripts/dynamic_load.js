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
            render_user(JSON.parse(this.responseText));
        }
    };
    xhttp.open("POST",'/request_info?email=' + email , true);
    xhttp.send();
}
