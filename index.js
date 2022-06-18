var firebaseConfig = {
    apiKey: "AIzaSyAlw2wl2onHVuVg2WdxnT-8--LOSWKJ6H4",
    authDomain: "shulker-chat.firebaseapp.com",
    databaseURL: "https://shulker-chat-default-rtdb.firebaseio.com",
    projectId: "shulker-chat",
    storageBucket: "shulker-chat.appspot.com",
    messagingSenderId: "77508273534",
    appId: "1:77508273534:web:c6bf61ccd5a829dda93f2f"
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
    document.querySelector("#homepage").classList.add("hide");
};

document.querySelector("#show-login").addEventListener("click", () => {
    showLogin();
});

function showLogin() {
    document.querySelector("#registration-page").classList.add("hide");
    document.querySelector("#login-page").classList.remove("hide");
    document.querySelector("#homepage").classList.add("hide");
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
    console.log(username)
    console.log(email)
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

const showHomepage = () => {
    document.querySelector("#registration-page").classList.add("hide");
    document.querySelector("#login-page").classList.add("hide");
    document.querySelector("#homepage").classList.remove("hide");
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
        window.location.replace("chat.html");
    }
});