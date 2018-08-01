function response() {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      if(this.responseText === 'SUCCESS')
        document.getElementById("changethis").innerHTML = 'EMAIL SENT';
    }
  };
  xhttp.open("GET",'/forgot?email=' + document.getElementById("email").value, true);
  xhttp.send();
}


function login() {
  let elms = document.getElementById('form-login').getElementsByTagName('input');
  let jsonObj = {
    username : elms[0].value,
    password : elms[1].value
  };
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      if(this.responseText != 'FAIL' ) {
            window.location.href = '/user?email=' + this.responseText;
            sessionStorage.setItem("global_login" , this.responseText);
      }
      else {
        elms[0].style.borderColor = elms[1].style.borderColor = 'red';
      }
    }
  };
  xhttp.open("GET",'/login?cred=' + JSON.stringify(jsonObj), true);
  xhttp.send();
}

