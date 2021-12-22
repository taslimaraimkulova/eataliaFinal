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

function makeOrder(prodname, prodprice) {
	var active = JSON.parse(localStorage.getItem("active"));

	let orders = new Array();
    orders = JSON.parse(localStorage.getItem("orders")) ? JSON.parse(localStorage.getItem("orders")) : []

    if (orders.some((user) => {return user.email == active.email})) {
    	alert("You have already made an order");
    	return;
    }
    else if (active.email == "admin@admin.com") {
        alert("You are admin");
        return;
    }
    else {
    	var userOrder = {"fname": active.fname, 
    					 "lname": active.lname, 
    					 "email": active.email, 
    					 "password": active.password, 
    					 "prodname": prodname,
    					 "prodprice": prodprice};

    	orders.push(userOrder);

    	localStorage.setItem("orders", JSON.stringify(orders));
    	alert("You have successfully placed an order");
    }
}