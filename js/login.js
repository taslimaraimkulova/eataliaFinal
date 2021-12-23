var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

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

function showPass() {
	var x = document.getElementById("password");
  	if (x.type === "password") {
    	x.type = "text";
  	} else {
    	x.type = "password";
  	}
}

function checkEmail(email) {
	if (email.length === 0) {
		$(".b-email__text")
			.text("Email address should not be empty")
			.css("color", "#ff3300")
			.css("fontStyle", "italic")
			.css("fontSize", "18px")
			.css("textShadow", "none");

		return false;
	}
	else if (!email.match(emailPattern)) {
		$(".b-email__text")
			.text("Email address must be in the format of name@domain.com")
			.css("color", "#ff3300")
			.css("fontStyle", "italic")
			.css("fontSize", "18px")
			.css("textShadow", "none");

		return false;
	} else {
		$(".b-email__text")
			.text("Email address")
			.css("color", "#00cc00")
			.css("fontStyle", "normal")
			.css("fontSize", "18px")
			.css("textShadow", "2px 2px 4px #000000");
	}
	return true;
};

function checkPassword(password) {
	if (password.length === 0) {
		$(".password__text")
			.text("Password should not be empty")
			.css("color", "#ff3300")
			.css("fontStyle", "italic")
			.css("fontSize", "18px")
			.css("textShadow", "none");

		return false;
	}
	else if (!password.match(passwordPattern)) {
		$(".password__text")
			.text("Your password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character between 8 to 15 characters")
			.css("color", "#ff3300")
			.css("fontStyle", "italic")
			.css("fontSize", "18px")
			.css("textShadow", "none");

		return false;
	} else {
		$(".password__text")
			.text("Password")
			.css("color", "#00cc00")
			.css("fontStyle", "normal")
			.css("fontSize", "18px")
			.css("textShadow", "2px 2px 4px #000000");
	}
	return true;
};

$(".form").on("submit", function(event) {
	event.preventDefault();
		
	var email = $(".b-email__input").val();
	var password = $(".password__input").val();
        
    if (checkEmail(email) && checkPassword(password)) {
    	let userData = new Array();
    	userData = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")) : []

    	var admin = JSON.parse(localStorage.getItem("adminInfo")) ? JSON.parse(localStorage.getItem("adminInfo")) : []

    	var blockedUserData = JSON.parse(localStorage.getItem("disabled")) ? JSON.parse(localStorage.getItem("disabled")) : []

    	if (email == admin.email && password == admin.password) {
    		alert("You successfully logged into the admin account!");
    		localStorage.setItem("active", JSON.stringify(admin));
    		window.location.href = "admin.html";
    	}
	else if (!userData.some((user)=>{return user.email == email})) {
    		alert("This user does not exist");
    		return;
    	}
    	else if (blockedUserData.some((user)=>{return user.email == email})) {
    		alert("This user is disabled. You cannot log in");
    		return;
    	}
    	else if (userData.some((user)=>{return user.email == email && user.password == password})) {
  			alert("You successfully logged in!");
  			var activeUser = userData.filter((user)=>{return user.email == email && user.password == password})[0]
  			localStorage.setItem("active", JSON.stringify(activeUser));
  			window.location.href = "main.html";
		}
		else {
  			alert("Please try again with another email or password");
		}
    }
});
