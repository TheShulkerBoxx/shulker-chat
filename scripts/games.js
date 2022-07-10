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
// This is very IMPORTANT!! We're going to use "db" a lot.
const firestoreDb = firebase.firestore();
const db = firebase.database();
const auth = firebase.auth();

auth.onAuthStateChanged((firebaseUser) => {
 if (!firebaseUser) {
     window.location.replace("index.html")
 }
});

function thirdPartyNotice(){
   swal("Third-Party Notice", "None of these websites are owned by Educational Workshop, this we cannot guarantee anything that happens on these websites. Enter at your own risk. We are not responsible for anything that happens there. If you have a website that does not work, please contact the owner.", "info")
}

function home(){
   location.replace("chat.html")
}

setTimeout(thirdPartyNotice, 500)