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

username = localStorage.getItem("username");
room_name = localStorage.getItem("room_name");

console.log(room_name);
console.log(username);

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

         console.log(firebase_message_id);
         console.log(message_data);

         name = message_data["name"];
         message = message_data["message"];
         like = message_data["like"];

         name_tag = "<h4>" + name + "<img class = 'user_tick' src = 'tick.png'></h4>";
         message_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
         button_tag = "<button class = 'btn btn-warning' id = " + firebase_message_id + "onclick = 'updateLike(this.id) value = " + like + ">";
         button_span = "<span class = 'glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button><hr>";
         
         row = name_tag + message_tag + button_tag + button_span;

         document.getElementById("output").innerHTML += row;
      } });  }); }
getData();

 function updateLike(message_id) {
      console.log("Button has been clicked, button name-" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updatedLikes = Number(likes) + 1;

      console.log(updatedLikes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updatedLikes
      });
}

function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");

      window.location = "index.html";
}

function send() {
      msg = document.getElementById("msg").value;

      firebase.database().ref(room_name).push({
            name: username,
            message: msg,
            like: 0
      });

      document.getElementById("msg").value = "";
}

