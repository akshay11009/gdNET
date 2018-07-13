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

var col = ['red' , 'red' , 'red' , 'red' , 'red'];

function change(n) {
	let elem = document.getElementById('info-container').getElementsByTagName('h3');
	let table = {
		'green' : 'red',
		'red' : 'green'
	};
	elem[n].style.backgroundColor = table[col[n]];
	col[n] = table[col[n]];
}

function sendSkills() {
	let colCode = '';
	for(let i = 0 ; i < 5 ; i++)
	colCode = colCode + (col[i] == 'red' ? '0' : '1');
	let xhttp;
	xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
	     	console.log(this.responseText);
	        window.location.href = '/user';
	    }
	}
	xhttp.open("GET" , '/skills?colCode=' + colCode);
	xhttp.send();
}