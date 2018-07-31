function render_event_page(arr) {
    console.log('Here in event');
    let elem = document.getElementById('landing-container');
    let inner;
    for(let i = 0 ; i < arr.length ; i++) {
        let func = "onclick=landing_event(" + i + ")>";
        inner = '<div class="landing-event" ' + func +  '<div></div><h3>' + arr[i].ev_name + '</h3><h5>Participants</h5></div>';
        elem.innerHTML += inner;
        document.getElementsByClassName('landing-event')[i].style.top = String((i * 140)) + 'px';
        let elemDiv = document.getElementsByClassName('landing-event')[i].getElementsByTagName('div')[0].style;
        let endsOn
        elemDiv.backgroundImage = "url('../images/cover1.jpeg')";
        elemDiv.backgroundRepeat = "no-repeat";
        elemDiv.backgroundPosition = "center";
        elemDiv.backgroundSize = "cover";
        elemDiv = document.getElementsByClassName('landing-event')[i].getElementsByTagName('h5')[0];
        elemDiv.innerHTML = 'Ends On : ' + arr[i].ev_ends;
    }
}

function load_page() {
    console.log('Here');
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) 
            render_event_page(JSON.parse(this.responseText).result);
    }

    xhttp.open("POST",'/request_events',true);
    xhttp.send();
}

function make_event() {
    document.getElementById('container-event').style.display = "block";
    document.getElementById('container-add-event').style.display = "block";
}

function reset_event() {
    document.getElementById('container-event').style.display = "none";
    document.getElementById('container-add-event').style.display = "none";
}

function submit_event() {
    let elem = document.getElementById('container-add-event').getElementsByTagName('input');
    let obj = {
        ev_name : elem[0].value,
        ev_website : elem[1].value,
        ev_img : elem[2].value,
        ev_ends : elem[3].value
    };
    console.log(elem[3].value);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log('Here')
        if(this.readyState == 4 && this.status == 200)
            console.log('Here Here');
    }

    xhttp.open("POST" , "/submit_event?ev_obj=" + JSON.stringify(obj) , true);
    xhttp.send();
}

function landing_event(index) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let website = JSON.parse(this.responseText).result[index].ev_website; 
            window.location.href = 'https://www.' + website;
        }
    }
    xhttp.open("POST" , "/request_events",true);
    xhttp.send();
}
