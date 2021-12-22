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

function initMap() {
  const location = {lat: 43.21388382274896, lng: 76.87049531150632};

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: location,
  });

  const marker1 = new google.maps.Marker({
    position: location,
    map: map,
    title: "Our new address",
  });

  const marker2 = new google.maps.Marker({
    position: {lat: 43.20669904158396, lng: 76.90340169158281},
    map: map,
    title: "Second address",
  });

  const marker3 = new google.maps.Marker({
    position: {lat: 43.23624061639679, lng: 76.95771372064578},
    map: map,
    title: "Third address",
  });

  const marker4 = new google.maps.Marker({
    position: {lat: 43.34030844363488, lng: 76.95181454542978},
    map: map,
    title: "Fourth address",
  });

  const marker5 = new google.maps.Marker({
    position: {lat: 43.21382226762402, lng: 76.84014082671102},
    map: map,
    title: "Fifth address",
  });
}