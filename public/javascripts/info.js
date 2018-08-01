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
      if(this.responseText == 'SUCCESS') {
            window.location.href = '/further';
            console.log(this.responseText);
      }
      else {
        elms[Number(this.responseText)].style.borderColor = 'red';
        document.getElementById('error').innerHTML = messages[Number(this.responseText)];
      
       /*obj
        {
            name : 'abc',
            price : 1234
        }
        document.getElementById('qwe').innerHTML = obj.name;
        */
      }
    }
  };
  xhttp.open("POST", '/confirm?signup_info=' + JSON.stringify(signupObj) , true);
  xhttp.send();
}

let col_info = [false,false];

function changeColor(elem_num) {
    let element = document.getElementById('other-info-gender').getElementsByTagName('h6');
    let col_obj = {
        true : '#c9fbff',
        false : '#77f1f9'
    };
    element[elem_num].style.backgroundColor = col_obj[col_info[elem_num]];
    element[(elem_num+1)%2].style.backgroundColor = '#c9fbff';
    col_info[(elem_num+1)%2] = false;
    col_info[elem_num] = !col_info[elem_num];
}

let col_info_skills = [false,false,false,false];

function changeColorSkills(elem_num) {
    let element = document.getElementById('other-info-job').getElementsByTagName('h6');
    let col_obj = {
        true : '#c9fbff',
        false : '#77f1f9'
    };
    element[elem_num].style.backgroundColor = col_obj[col_info_skills[elem_num]];
    col_info_skills[elem_num] = !col_info_skills[elem_num];
}

function sendData() {
    let inputTag = document.getElementById('other-info').getElementsByTagName('input');
    let skills = ['Programmer' , 'Designer' , 'Artist' , 'Business'];
    let selected_skills = [];
    let sub_count = 0;
    for(let i = 0 ; i < 4 ; i++)
        if(col_info_skills[i] === true)
            selected_skills[sub_count++] = skills[i];
    console.log(selected_skills);
    let obj = {
        name : inputTag[0].value,
        birthday : inputTag[1].value,
        role : inputTag[2].value,
        work : inputTag[3].value,
        place : inputTag[4].value,
        website : inputTag[5].value,
        gender : col_info[0] ? 'Male' : 'Female',
        skills : selected_skills
    };
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            window.location.href = '/user?email=' + this.responseText;
            sessionObject.setItem("global_login",this.responseText);
        }
    };
    xhttp.open("POST",'/personal?obj=' + JSON.stringify(obj) , true);
    xhttp.send();
}
