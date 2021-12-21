var firebaseConfig = {
      apiKey: "AIzaSyAZDJMytb8MFMsNDhLIyePdgHyIEEI4Ry0",
      authDomain: "kwitter-e465a.firebaseapp.com",
      databaseURL: "https://kwitter-e465a-default-rtdb.firebaseio.com",
      projectId: "kwitter-e465a",
      storageBucket: "kwitter-e465a.appspot.com",
      messagingSenderId: "1022040306722",
      appId: "1:1022040306722:web:fbe0720eeeab202c0cc67b"
};
    
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE

user_name = localStorage.getItem("username");
document.getElementById("user").innerHTML = "Welcome " + user_name + "!"


function addRoom() {
      roomName = document.getElementById('roomName').value;

      firebase.database().ref("/").child(roomName).update({
            purpose: "adding room name"
      });

      localStorage.setItem("roomName", roomName);

      window.location = "kwitter_page.html";
}



function getData() {
            firebase.database().ref("/").on('value', function(snapshot) {
                  document.getElementById("output").innerHTML = "";
                  snapshot.forEach(function(childSnapshot) {
                        childKey  = childSnapshot.key;
                        Room_names = childKey;

                        console.log("roomname = " + Room_names);
                        row = "<div class = 'room_name' id = '" + Room_names + "' onclick = 'redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
                        document.getElementById("output").innerHTML += row;
      });
      
});
}
getData();

function redirectToRoomName(name) {
      console.log(name);

      localStorage.setItem("room_name", name);

      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");

      window.location = "index.html";
}