function adduser() {
    username = document.getElementById("username_input").value;
    localStorage.setItem("username", username);

    window.location.replace("kwitter_room.html");
}