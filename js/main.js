var slideIndex = 0;
showSlides();

function showSlides() {
 	var i;
  	var slides = document.getElementsByClassName("mySlides");
  	var dots = document.getElementsByClassName("dot");

  	for (i = 0; i < slides.length; i++) {
    	slides[i].style.display = "none";  
  	}

  	slideIndex++;

  	if (slideIndex > slides.length) {slideIndex = 1}

  	for (i = 0; i < dots.length; i++) {
    	dots[i].className = dots[i].className.replace(" active", "");
  	}

  	slides[slideIndex-1].style.display = "block";  
  	dots[slideIndex-1].className += " active";
  	setTimeout(showSlides, 5000); 
}

var active = JSON.parse(localStorage.getItem("active")) ? JSON.parse(localStorage.getItem("active")) : ""

if (active != "") {
	document.getElementById('user').style.display = "block";
	document.getElementById('user').innerHTML = "Hi!" + " " + active.lname + " " + active.fname;
	document.getElementById('register').style.display = "none";
	document.getElementById('login').style.display = "none";
}
		
var admin = {
	fname: "admin",
	lname: "admin",
	email: "admin@admin.com",
	password: "Adminadmin1!"
};

localStorage.setItem("adminInfo", JSON.stringify(admin));

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