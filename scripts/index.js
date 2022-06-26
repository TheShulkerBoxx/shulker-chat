var firebaseConfig = {
    apiKey: "AIzaSyCUtfC5VDRoLMtLxE-s_yrv4coGUi0lSUU",
    authDomain: "shulker-chat-92c89.firebaseapp.com",
    databaseURL: "https://shulker-chat-92c89-default-rtdb.firebaseio.com",
    projectId: "shulker-chat-92c89",
    storageBucket: "shulker-chat-92c89.appspot.com",
    messagingSenderId: "736268758426",
    appId: "1:736268758426:web:9019c18cf05b8790401e23"
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
        document.getElementById('login-container').classList.add("logged-in")
        setTimeout(function(){window.location.replace("chat.html")}, 700)
    }
});