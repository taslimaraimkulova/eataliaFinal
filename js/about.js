var active = JSON.parse(localStorage.getItem("active")) ? JSON.parse(localStorage.getItem("active")) : ""

if (active != "") {
	document.getElementById('user').style.display = "block";
	document.getElementById('user').innerHTML = "Hi!" + " " + active.lname + " " + active.fname;
	document.getElementById('register').style.display = "none";
	document.getElementById('login').style.display = "none";
}

function checkAccount(user) {
	var content = document.getElementById("user").textContent;

	if (content == "Hi! admin admin") {
		window.location.href = "admin.html";
	}
	else if (content == "Hi!" + " " + active.lname + " " + active.fname){
		window.location.href = "userpage.html";
	}
	else {
		alert("You should log in first");
	}
}

function checkLogin() {
	if (active != "") {
		window.location.href = "menu.html";
	}
	else {
		alert("You should log in");
		return;
	}
}