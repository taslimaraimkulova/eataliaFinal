var active = JSON.parse(localStorage.getItem("active")) ? JSON.parse(localStorage.getItem("active")) : ""

if (active != "") {
	document.getElementById('user').style.display = "block";
	document.getElementById('user').innerHTML = "Hi!" + " " + active.lname + " " + active.fname;
}

let orders = new Array();
orders = JSON.parse(localStorage.getItem("orders")) ? JSON.parse(localStorage.getItem("orders")) : []

var thisUser = orders.filter((user) => {return user.email == active.email});

$("#fname").text(active.fname);
$("#lname").text(active.lname);
$("#email").text(active.email);
$("#password").text(active.password);

if (orders != "") {
	$("#prodname").text(thisUser[0].prodname);
	$("#prodprice").text(thisUser[0].prodprice);
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

function cancel() {
	if (document.getElementById("prodname").textContent != "Empty") { 
		var removeOrder = orders.filter((user) => {return user.email != active.email});
		localStorage.setItem("orders", JSON.stringify(removeOrder));
		alert("Your order have been removed");
		window.location.reload(true);
	}
	else {
		alert("You haven't ordered anything yet");
	}
}

function logout() {
    localStorage.removeItem("active");
    window.location.href = "main.html";
}