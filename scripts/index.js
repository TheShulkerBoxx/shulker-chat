var firebaseConfig = {
    apiKey: "AIzaSyBcEKKZgzECRBdhyLrkxYyJvllfFDqVCvM",
    authDomain: "shulker-chat-72532.firebaseapp.com",
    databaseURL: "https://shulker-chat-72532-default-rtdb.firebaseio.com",
    projectId: "shulker-chat-72532",
    storageBucket: "shulker-chat-72532.appspot.com",
    messagingSenderId: "178686806819",
    appId: "1:178686806819:web:37c52adf4c19db80f31a96"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

document.querySelector("#show-register").addEventListener("click", () => {
    showRegistration();
});

const showRegistration = () => {
    document.querySelector("#registration-page").classList.remove("hide");
    document.querySelector("#login-page").classList.add("hide");
};

document.querySelector("#show-login").addEventListener("click", () => {
    showLogin();
});

function showLogin() {
    document.querySelector("#registration-page").classList.add("hide");
    document.querySelector("#login-page").classList.remove("hide");
}

const register = () => {
    const email = document.querySelector("#registration-email").value;
    const reemail = document.querySelector("#registration-reemail").value;
    const password = document.querySelector("#registration-password").value;

    if (email.trim() == "") {
        alert("Enter Username");
    } else if (password.trim().length < 7) {
        alert("Password must be at least 7 characters!");
    } else if (email != reemail) {
        alert("Usernames do not match.");
    } else if (email.trim().length > 21){
        alert("Please enter a username with a maximum of 20 characters.")
    } else {
        output_email = email.split(" ").join("") + '@gmail.com'
        auth
        .createUserWithEmailAndPassword(output_email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        });
    }
    localStorage.setItem('name', email)
};

document.querySelector("#register").addEventListener("click", () => {
    register();
});

//register when you hit the enter key
document
    .querySelector("#registration-password")
    .addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            e.preventDefault();
            register();
        }
    });

const login = () => {
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    if (email.trim() == "") {
        alert("Enter Username");
    } else if (password.trim() == "") {
        alert("Enter Password");
    } else {
        output_email = email.split(" ").join("") + '@gmail.com'
        authenticate(output_email, password);
    }
    var username = email
    localStorage.setItem('name', username)
};

document.querySelector("#login").addEventListener("click", () => {
    login();
});

//sign in when you hit enter
document
    .querySelector("#login-password")
    .addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            e.preventDefault();
            login();
        }
    });

const authenticate = (email, password) => {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password);
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
        // Handle Errors here.
            var errorMessage = error.message;
            alert(errorMessage);
        });
};
const signOut = () => {
firebase
    .auth()
    .signOut()
    .then(function () {
        location.reload();
    })
    .catch(function () {
        alert("error signing out, check network connection");
    });
};

auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
        document.getElementById('another-container').classList.add("logged-in")
        document.getElementById('main-title').classList.add("fade-out")
        setTimeout(function(){window.location.replace("chat.html")}, 700)
    }
});

document.onkeydown = function(e) {
  if(event.keyCode == 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
}
