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

function signup() {
  let elms = document.getElementById('signup-container').getElementsByTagName('input');
  let messages = [
    '<li>E-mail exists</li>' ,
    '<li>Username exists</li>'
  ];
  let signupObj = {
    email : elms[0].value,
    username : elms[1].value,
    password : elms[2].value
  };
  var xhttp;
  if(elms[2].value != elms[3].value) {
    elms[2].style.borderColor = elms[3].style.borderColor = 'red';
    document.getElementById('error').innerHTML = '<li>Passwords do not match</li>';
    return ;
  }
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      if(this.responseText === 'SUCCESS')
         window.location.href = '/user';
      else {
        elms[Number(this.responseText)].style.borderColor = 'red';
        document.getElementById('error').innerHTML = messages[Number(this.responseText)];
      }
    }
  };
  xhttp.open("POST", '/confirm?signup_info=' + JSON.stringify(signupObj) , true);
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
      if(this.responseText === 'SUCCESS')
        window.location.href = '/user';
      else {
        elms[0].style.borderColor = elms[1].style.borderColor = 'red';
      }
    }
  };
  xhttp.open("GET",'/login?cred=' + JSON.stringify(jsonObj), true);
  xhttp.send();

}