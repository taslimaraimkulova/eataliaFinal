var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

var active = JSON.parse(localStorage.getItem("active")) ? JSON.parse(localStorage.getItem("active")) : ""

if (active != "") {
    document.getElementById('user').style.display = "block";
    document.getElementById('user').innerHTML = "Hi!" + " " + active.lname + " " + active.fname;
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

function showUsers(event) {
	let userData = new Array();
    userData = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")) : []
    var row = document.getElementById('table').getElementsByTagName('tbody')[0].getElementsByTagName("tr");

    let blockedUserData = new Array();
    blockedUserData = JSON.parse(localStorage.getItem("disabled")) ? JSON.parse(localStorage.getItem("disabled")) : []

    let orders = new Array();
    orders = JSON.parse(localStorage.getItem("orders")) ? JSON.parse(localStorage.getItem("orders")) : []

    for (let i = row.length; i < userData.length; i++) {
        var table = document.getElementById('table').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length);

        var cell0 = newRow.insertCell(0);
        cell0.innerHTML = i;

        var cell1 = newRow.insertCell(1);
        cell1.innerHTML = userData[i].fname;

        var cell2 = newRow.insertCell(2);
        cell2.innerHTML = userData[i].lname;

        var cell3 = newRow.insertCell(3);
        cell3.innerHTML = userData[i].email;

        var cell4 = newRow.insertCell(4);
        cell4.innerHTML = userData[i].password;

        var cell5 = newRow.insertCell(5);
        var cell6 = newRow.insertCell(6);

        var thisUser = orders.filter((user) => {return user.email == userData[i].email});

        if (thisUser != "") {
            cell5.innerHTML = thisUser[0].prodname;
            cell6.innerHTML = thisUser[0].prodprice;
        }
        else {
            cell5.innerHTML = "Empty";
            cell6.innerHTML = "Empty";
        }

        var cell7 = newRow.insertCell(7);
        cell7.innerHTML = `<button class="btn edit" onclick="edit(this)">Edit</button> 
                           <button class="btn delete" onclick="onDelete(this)">Delete</button>`;

        var cell8 = newRow.insertCell(8);
        cell8.innerHTML = `<button class="btn" onclick="enable(this)">Enable</button> 
                           <button class="btn" onclick="disable(this)">Disable</button>`;

        var cell9 = newRow.insertCell(9);

        if (blockedUserData.some((user)=>{return user.email == userData[i].email})) {
            cell9.innerHTML = "Disabled";
        }
        else {
            cell9.innerHTML = "Enabled";
        }
    }
    $("#table-body").fadeOut().fadeIn();
}

$("#toggle-add").click(function(){
    $(".add-user-form").slideToggle("slow").css("display", "grid");
});

function refresh(button) {
    $("#table-body").empty();
    showUsers();
}

function logout(button) {
    localStorage.removeItem("active");
    window.location.href = "main.html";
}

function edit(button) {
    for (let i = 1; i < 6; i++) {
        button.parentElement.parentElement.cells[i].setAttribute("contenteditable", "true");
    }
    button.innerText = "Save";
    button.setAttribute("onclick", "save(this)");
}

function save(button) {
    var td = button.parentElement.parentElement;

    let userData = new Array();
    userData = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")) : []

    let orders = new Array();
    orders = JSON.parse(localStorage.getItem("orders")) ? JSON.parse(localStorage.getItem("orders")) : []

    var userToChange = userData[td.cells[0].textContent].email;

    console.log("userToChange", userToChange);

    if (td.cells[1].textContent == 0) {
        alert("Fisrt Name should not be empty");
        return;
    }

    if (td.cells[2].textContent == 0) {
        alert("Last Name should not be empty");
        return;
    }

    if (td.cells[3].textContent == 0) {
        alert("Email should not be empty");
        return;
    }
    else if (!td.cells[3].textContent.match(emailPattern)) {
        alert("Email address must be in the format of name@domain.com");
        return;
    }

    if (td.cells[4].textContent == 0) {
        alert("Password should not be empty");
        return;
    }
    else if (!td.cells[4].textContent.match(passwordPattern)) {
        alert("Your password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character between 8 to 15 characters");
        return;
    }

    if (td.cells[5].textContent != 'Italian Burger' && td.cells[5].textContent != 'Delicious Burger' &&
        td.cells[5].textContent != 'Cheeseburger' && td.cells[5].textContent != 'Pepperoni fresh' &&
        td.cells[5].textContent != 'Pesto Pizza' && td.cells[5].textContent != 'Vegetables and mushrooms' &&
        td.cells[5].textContent != 'Cheese chicken Pizza' && td.cells[5].textContent != 'BBQ Burger' &&
        td.cells[5].textContent != 'Fishburger' && td.cells[5].textContent != 'Empty') 
    {
        alert("Enter an existing product name");
        return;
    }

    if (td.cells[5].textContent == 'Italian Burger') {
        td.cells[6].innerHTML = "10$";
    }
    else if (td.cells[5].textContent == 'Delicious Burger') {
        td.cells[6].innerHTML = "15$";
    }
    else if (td.cells[5].textContent == 'Cheeseburger') {
        td.cells[6].innerHTML = "25$";
    }
    else if (td.cells[5].textContent == 'Pepperoni fresh') {
        td.cells[6].innerHTML = "30$";
    }
    else if (td.cells[5].textContent == 'Pesto Pizza') {
        td.cells[6].innerHTML = "20$";
    }
    else if (td.cells[5].textContent == 'Vegetables and mushrooms') {
        td.cells[6].innerHTML = "25$";
    }
    else if (td.cells[5].textContent == 'Cheese chicken Pizza') {
        td.cells[6].innerHTML = "35$";
    }
    else if (td.cells[5].textContent == 'BBQ Burger') {
        td.cells[6].innerHTML = "25$";
    }
    else if (td.cells[5].textContent == 'Fishburger') {
        td.cells[6].innerHTML = "15$";
    }
    else if (td.cells[5].textContent == 'Empty') {
        td.cells[6].innerHTML = "Empty";
    }

    var newUserData = new Array();

    newUserData = userData.filter(function(user) {
        return (user.email != userToChange);
    });

    //localStorage.setItem("new", JSON.stringify(newUserData));

    var filteredArray = new Array();
    filteredArray = newUserData.filter(function(user) {
        //console.log("inside filteredArray", user.email, td.cells[3].textContent, user.email == td.cells[3].textContent);
        return (user.email == td.cells[3].textContent);
    });

    //localStorage.setItem("filtered", JSON.stringify(filteredArray));

    //console.log("array where if there is 2 similar email after changes", filteredArray);

    if(filteredArray.length == 1) {
        alert("This account is already exist");
        return;
    }

    newUserData.push({"fname":td.cells[1].textContent,
                    "lname":td.cells[2].textContent, 
                    "email":td.cells[3].textContent, 
                    "password":td.cells[4].textContent});

    localStorage.setItem("userData",JSON.stringify(newUserData));

    var newOrders = orders.filter((user) => {return user.email != td.cells[3].textContent});

    newOrders.push({"fname":td.cells[1].textContent,
                    "lname":td.cells[2].textContent, 
                    "email":td.cells[3].textContent, 
                    "password":td.cells[4].textContent,
                    "prodname":td.cells[5].textContent,
                    "prodprice":td.cells[6].textContent});

    localStorage.setItem("orders", JSON.stringify(newOrders));
    
    for (let i = 1; i < 5; i++) {
        td.cells[i].setAttribute("contenteditable", "false");
    }

    button.innerText = "Edit";
    button.setAttribute("onclick", "edit(this)");
    document.location.reload(true);
}

function onDelete(button) {
    if (confirm('Are you sure you want to delete this user?')) {
        var td = button.parentElement.parentElement;

        let userData = new Array();
        userData = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")) : []

        userData = userData.filter(function(user) {
            return (user.email != td.cells[3].textContent);
        });

        localStorage.setItem("userData",JSON.stringify(userData));
        document.getElementById("table").deleteRow(td.rowIndex);
    }
}

function enable(button) {
    var td = button.parentElement.parentElement;

    if (td.cells[9].textContent == "Disabled") {
        let blockedUserData = new Array();
        blockedUserData = JSON.parse(localStorage.getItem("disabled")) ? JSON.parse(localStorage.getItem("disabled")) : []

        blockedUserData = blockedUserData.filter(function(user) {
            return (user.email != td.cells[3].textContent);
        });

        localStorage.setItem("disabled", JSON.stringify(blockedUserData));
        td.cells[9].innerHTML = "Enabled";
    }
    else if (td.cells[9].textContent == "Enabled"){
        alert("This user is already enabled");
        return;
    }
}

function disable(button) {
    var td = button.parentElement.parentElement;

    if (td.cells[9].textContent == "Enabled") {
        let blockedUserData = new Array();
        blockedUserData = JSON.parse(localStorage.getItem("disabled")) ? JSON.parse(localStorage.getItem("disabled")) : []

        blockedUserData.push({"fname":td.cells[1].textContent,
                              "lname":td.cells[2].textContent, 
                              "email":td.cells[3].textContent, 
                              "password":td.cells[4].textContent});

        localStorage.setItem("disabled", JSON.stringify(blockedUserData));
        td.cells[9].innerHTML = "Disabled";
    }
    else if (td.cells[9].textContent == "Disabled"){
        alert("This user is already disabled");
        return;
    }
}

function checkFname(fname) {
    if (fname.length === 0) {
        $(".b-fname__text")
            .text("Fisrt Name should not be empty")
            .css("color", "#ff3300")
            .css("fontStyle", "italic")
            .css("fontSize", "18px")
            .css("textShadow", "none");

        return false;
    } else {
        $(".b-fname__text")
            .text("Fisrt Name")
            .css("color", "#00cc00")
            .css("fontStyle", "normal")
            .css("fontSize", "18px")
            .css("textShadow", "2px 2px 4px #000000");
    }
    return true;
};

function checkLname(lname) {
    if (lname.length === 0) {
        $(".b-lname__text")
            .text("Last Name should not be empty")
            .css("color", "#ff3300")
            .css("fontStyle", "italic")
            .css("fontSize", "18px")
            .css("textShadow", "none");

        return false;
    } else {
        $(".b-lname__text")
            .text("Last Name")
            .css("color", "#00cc00")
            .css("fontStyle", "normal")
            .css("fontSize", "18px")
            .css("textShadow", "2px 2px 4px #000000");
    }
    return true;
};

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
        
    var fname = $(".b-fname__input").val();
    var lname = $(".b-lname__input").val();
    var email = $(".b-email__input").val();
    var password = $(".password__input").val();
        
    if (checkFname(fname) && checkLname(lname) && checkEmail(email) && checkPassword(password)) {
        let userData = new Array();
        userData = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")) : []

        if(userData.some((user)=>{return user.email == email})) {
            alert("This account is already exist.");
        }
        else {
            userData.push({"fname":fname, "lname":lname, "email":email, "password":password})
            localStorage.setItem("userData",JSON.stringify(userData));
        }
    }
});