function makeVisible() {
	document.getElementById("forgot-container").style.display="block";
	document.getElementById("forgot").style.display="block";
	document.getElementsByTagName("body")[0].style.overflow="hidden";
}

function reset() {
	document.getElementById("forgot-container").style.display="none";
	document.getElementById("forgot").style.display="none";
	document.getElementsByTagName("body")[0].style.overflow="auto";
}

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