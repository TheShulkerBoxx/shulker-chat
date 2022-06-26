if(localStorage.getItem('name') == null){
  window.location.replace('index.html')
  localStorage.setItem('first-time', 'true')
}

var again = false

window.onload = function() {
  // Your web app's Firebase configuration
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

  const usersRef = firestoreDb.collection('users'); // Get a reference to the Users collection;
  const onlineRef = db.ref('.info/connected'); // Get a reference to the list of connections
  // We're going to use oBjEcT OrIeNtEd PrOgRaMmInG. Lol
  class MEME_CHAT{
    // Home() is used to create the home page
    home(){
      // First clear the body before adding in
      // a title and the join form
      document.body.innerHTML = ''
      this.create_title()
      this.create_join_form()
    }
    // chat() is used to create the chat page
    chat(){
      if (localStorage.getItem('first-time') == 'true'){
        localStorage.setItem('first-time', 'false')
        document.location.reload(true)
        again = true
      }
      this.create_title()
      if (again){
        document.location.reload(true)
      }
      this.user_connection()
      this.create_chat()
      setInterval(this.refresh_chat(), 3000);
    }
    // create_title() is used to create the title
    create_title(){
      // This is the title creator. 🎉
      var title_container = document.createElement('div')
      title_container.setAttribute('id', 'title_container')
      var title_inner_container = document.createElement('div')
      title_inner_container.setAttribute('id', 'title_inner_container')

      var title = document.createElement('h1')
      title.setAttribute('id', 'title')
      title.textContent = 'Shulker Chat'

      title_inner_container.append(title)
      title_container.append(title_inner_container)
      document.body.append(title_container)

      var settings = document.createElement('button')
      settings.setAttribute("data-modal-target", "#modal")
      settings.setAttribute('id', 'settings')
      document.body.append(settings)
      var gear = document.createElement('img')
      gear.setAttribute('src', 'images/gear.ico')
      gear.setAttribute('id', 'gear')
      settings.append(gear)

      var modal_div = document.createElement('div')
      modal_div.setAttribute('class', 'modal')
      modal_div.setAttribute('id', 'modal')
      document.body.append(modal_div)

      var modal_header_div = document.createElement('div')
      modal_header_div.setAttribute('class', 'modal-header')
      modal_header_div.setAttribute('id', 'not-title')
      modal_div.append(modal_header_div)

      var title_head_div = document.createElement('div')
      title_head_div.setAttribute('class', 'modal-header')
      title_head_div.innerHTML = "Settings"
      modal_header_div.append(title_head_div)

      var close_button = document.createElement('button')
      close_button.setAttribute('data-close-button', '')
      close_button.innerHTML = '&times;'
      close_button.setAttribute('class', 'close-button')
      title_head_div.append(close_button)

      var modal_body_div = document.createElement('div')
      modal_body_div.setAttribute('class', 'modal-header')
      modal_div.append(modal_body_div)

      var settings_text = document.createElement('p')
      settings_text.setAttribute('id', 'settings-text')
      modal_body_div.append(settings_text)

      var notification_button = document.createElement('button')
      notification_button.setAttribute('id', 'notifications-toggle')
      notification_button.onclick = function() {
        if (notifyAllowed){
          notifyAllowed = false
          document.getElementById('notifications-toggle').classList.remove('allowed')
          document.getElementById('notifications-toggle').classList.add('disabled')
          document.getElementById('notifications-toggle').innerHTML = "Notifications Disabled"
        } else {
          notifyAllowed = true
          document.getElementById('notifications-toggle').classList.remove('disabled')
          document.getElementById('notifications-toggle').classList.add('allowed')
          document.getElementById('notifications-toggle').innerHTML = "Notifications Allowed"
        }
      }
      modal_body_div.append(notification_button)

      var overlay_div = document.createElement('div')
      overlay_div.setAttribute('id', 'overlay')
      document.body.append(overlay_div)

      document.getElementById("settings-text").textContent = "Chat Username: " + localStorage.getItem('name')

      if (notifyAllowed) {
        document.getElementById('notifications-toggle').innerHTML = "Notifications Allowed"
        document.getElementById('notifications-toggle').classList.add('allowed')
      } else {
        document.getElementById('notifications-toggle').classList.add('disabled')
        document.getElementById('notifications-toggle').innerHTML = "Notifications Disabled"
      }

      const openModalButtons = document.querySelectorAll('[data-modal-target]')
      const closeModalButtons = document.querySelectorAll('[data-close-button]')
      const overlay = document.getElementById('overlay')

      openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
          document.getElementById("settings-text").textContent = "Chat Username: " + localStorage.getItem('name')

          if (notifyAllowed) {
            document.getElementById('notifications-toggle').innerHTML = "Notifications Allowed"
            document.getElementById('notifications-toggle').classList.add('allowed')
          } else {
            document.getElementById('notifications-toggle').classList.add('disabled')
            document.getElementById('notifications-toggle').innerHTML = "Notifications Disabled"
          }
          const modal = document.querySelector(button.dataset.modalTarget)
          openModal(modal)
        })
      })

      overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
          closeModal(modal)
        })
      })

      closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
          const modal = button.closest('.modal')
          closeModal(modal)
        })
      })

      function openModal(modal) {
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
      }

      function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
      }
    }

    // create_join_form() creates the join form
    create_join_form(){
      // YOU MUST HAVE (PARENT = THIS). OR NOT. I'M NOT YOUR BOSS!😂
      var parent = this;

      var join_container = document.createElement('div')
      join_container.setAttribute('id', 'join_container')
      var join_inner_container = document.createElement('div')
      join_inner_container.setAttribute('id', 'join_inner_container')

      var join_button_container = document.createElement('div')
      join_button_container.setAttribute('id', 'join_button_container')

      var join_button = document.createElement('button')
      join_button.setAttribute('id', 'join_button')
      join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>'

      var join_input_container = document.createElement('div')
      join_input_container.setAttribute('id', 'join_input_container')

      var join_input = document.createElement('input')
      join_input.setAttribute('id', 'join_input')
      join_input.setAttribute('maxlength', 15)
      join_input.placeholder = "The name you enter here cannot EVER be changed..."
      // Every time we type into the join_input
      join_input.onkeyup  = function(){
        // If the input we have is longer that 0 letters
        if(join_input.value.length > 0 && join_input.value.trim() != '' && join_input.value != '⠀'){
          // Make the button light up
          join_button.classList.add('enabled')
          // Allow the user to click the button
          join_button.onclick = function(){
            // Save the name to local storage. Passing in
            // the join_input.value
            parent.save_name(join_input.value)
            // Remove the join_container. So the site doesn't look weird.
            join_container.remove()
            document.location.reload(true)
            // parent = this. But it is not the join_button
            // It is (MEME_CHAT = this).
            parent.create_chat()
          }
        }else{
          // If the join_input is empty then turn off the
          // join button
          join_button.classList.remove('enabled')
        }
      }

      // Append everything to the body
      join_button_container.append(join_button)
      join_input_container.append(join_input)
      join_inner_container.append(join_input_container, join_button_container)
      join_container.append(join_inner_container)
      document.body.append(join_container)
    }
    // create_load() creates a loading circle that is used in the chat container
    create_load(container_id){
      // YOU ALSO MUST HAVE (PARENT = THIS). BUT IT'S WHATEVER THO.
      var parent = this;

      // This is a loading function. Something cool to have.
      var container = document.getElementById(container_id)
      container.innerHTML = ''

      var loader_container = document.createElement('div')
      loader_container.setAttribute('class', 'loader_container')

      var loader = document.createElement('div')
      loader.setAttribute('class', 'loader')

      loader_container.append(loader)
      container.append(loader_container)

    }

    typingChange(boolean_val){
      var parent = this;
      var userId = localStorage.getItem('name');
      if (boolean_val == true){
        db.ref(`/status/usernames/${userId}`).update({
          typing: "true"
        })
      }else if (boolean_val == false){
        db.ref(`/status/usernames/${userId}`).update({
          typing: "false"
        })
      }
    }

    // create_chat() creates the chat container and stuff
    create_chat(){
      // Again! You need to have (parent = this)
      var parent = this;
      // GET THAT MEMECHAT HEADER OUTTA HERE
      var title_container = document.getElementById('title_container')
      var title = document.getElementById('title')
      title_container.classList.add('chat_title_container')
      // Make the title smaller by making it 'chat_title'
      title.classList.add('chat_title')

      var chat_container = document.createElement('div')
      chat_container.setAttribute('id', 'chat_container')

      var chat_inner_container = document.createElement('div')
      chat_inner_container.setAttribute('id', 'chat_inner_container')

      var chat_content_container = document.createElement('div')
      chat_content_container.setAttribute('id', 'chat_content_container')

      var chat_input_container = document.createElement('div')
      chat_input_container.setAttribute('id', 'chat_input_container')

      var user_main_container = document.createElement('div')
      user_main_container.setAttribute('id', 'user_main_container')

      var user_title = document.createElement('h3')
      user_title.setAttribute('id', 'user_title')
      user_title.textContent = "Online Users:"
      user_main_container.append(user_title)

      var user_container = document.createElement('div')
      user_container.setAttribute('id', 'user_container')
      user_main_container.append(user_container)

      var chat_input_send = document.createElement('button')
      chat_input_send.setAttribute('id', 'chat_input_send')
      chat_input_send.setAttribute('disabled', true)
      chat_input_send.innerHTML = `<i class="far fa-paper-plane"></i>`

      var chat_input = document.createElement('input')
      chat_input.setAttribute('id', 'chat_input')
      // Only a max message length of 1000
      chat_input.setAttribute('maxlength', 1000)
      // Get the name of the user
      chat_input.placeholder = `Type a message...`
      chat_input.onkeyup  = function(){
        if(chat_input.value.length > 0 && chat_input.value.trim() != '' && chat_input.value != '⠀'){
          parent.typingChange(true)
          chat_input_send.removeAttribute('disabled')
          chat_input_send.classList.add('enabled')
          document.querySelector("#chat_input").addEventListener("keyup", (e) => {
            if (event.keyCode === 13) {
              if(chat_input.value.length > 0){
                const myTimeout = setTimeout(parent.typingChange, 2000, false);
                e.preventDefault();
              // Enable the loading circle in the 'chat_content_container'
                parent.create_load('chat_content_container')
            // Send the message. Pass in the chat_input.value
                parent.send_message(chat_input.value)
            // Clear the chat input box
                chat_input.value = ''
            // Focus on the input just after
                chat_input.focus()
                chat_input_send.classList.remove('enabled')
              }
            }
          });
          chat_input_send.onclick = function(){
            chat_input_send.setAttribute('disabled', true)
            chat_input_send.classList.remove('enabled')
            if(chat_input.value.length <= 0){
              return
            }
            // Enable the loading circle in the 'chat_content_container'
            const myTimeout = setTimeout(parent.typingChange, 2000, false);
            parent.create_load('chat_content_container')
            // Send the message. Pass in the chat_input.value
            parent.send_message(chat_input.value)
            // Clear the chat input box
            chat_input.value = ''
            // Focus on the input just after
            chat_input.focus()
          }

        }else{
          chat_input_send.classList.remove('enabled')
          const myTimeout = setTimeout(parent.typingChange, 2000, false);
        }
      }

      chat_input_container.append(chat_input, chat_input_send)
      chat_inner_container.append(chat_content_container, chat_input_container)
      chat_container.append(chat_inner_container)
      chat_container.append(user_main_container)
      document.body.append(chat_container)
      // After creating the chat. We immediatly create a loading circle in the 'chat_content_container'
      parent.create_load('chat_content_container')
      // then we "refresh" and get the chat data from Firebase
      parent.refresh_chat()
    }
    // Save name. It literally saves the name to localStorage
    save_name(name){
      // Save name to localStorage
      localStorage.setItem('name', name)
    }
    // Sends message/saves the message to firebase database
    send_message(message){
      var parent = this
      if (message == "/remove-chat-instance"){
          db.ref('chats/').remove()
          const d = new Date();
          if (d.getHours() > 12){
            var hours = d.getHours() - 12
            var ampm = 'PM'
          }else{
            var hours = d.getHours()
            var ampm = 'AM'
          }
          if (d.getMinutes() < 10){
            var minutes = "0" + d.getMinutes()
          }else{
            var minutes = d.getMinutes()
          }
          var month = d.getMonth() + 1
          var date = d.getDate()
          var year = d.getYear() - 100
          var time = hours + ":" + minutes + ' ' + ampm + ' at ' + month + '/' + date + '/' + year
            // This index is mortant. It will help organize the chat in order
          db.ref('chats/' + 'message_1').set({
            name: 'TheShulkerBox',
            message: 'Server Reset',
            index: 1,
            time: time,
          })
          parent.refresh_chat()
          return (null)
  
      }
      // if the local storage name is null and there is no message
      // then return/don't send the message. The user is somehow hacking
      // to send messages. Or they just deleted the
      // localstorage themselves. But hacking sounds cooler!!
      if(parent.get_name() == null && message == null){
        return
      }

      // Get the firebase database value
      db.ref('chats/').once('value', function(message_object) {
        const d = new Date();
        if (d.getHours() > 12){
          var hours = d.getHours() - 12
          var ampm = 'PM'
        }else{
          var hours = d.getHours()
          var ampm = 'AM'
        }
        if (d.getMinutes() < 10){
          var minutes = "0" + d.getMinutes()
        }else{
          var minutes = d.getMinutes()
        }
        var month = d.getMonth() + 1
        var date = d.getDate()
        var year = d.getYear() - 100
        var time = hours + ":" + minutes + ' ' + ampm + ' at ' + month + '/' + date + '/' + year
        // This index is mortant. It will help organize the chat in order
        var index = parseFloat(message_object.numChildren()) + 1
        db.ref('chats/' + `message_${index}`).set({
          name: parent.get_name(),
          message: message,
          index: index,
          time: time,
        })
        .then(function(){
          // After we send the chat refresh to get the new messages
          parent.refresh_chat()
        })
      })
    }
    // Get name. Gets the username from localStorage
    get_name(){
      // Get the name from localstorage
      if(localStorage.getItem('name') != null){
        return localStorage.getItem('name')
      }else{
        this.home()
        return null
      }
    }
    // Refresh chat gets the message/chat data from firebase
    refresh_chat(){
      var chat_content_container = document.getElementById('chat_content_container')
      var parent = this

      // Get the chats from firebase
      db.ref('chats/').on('value', function(messages_object) {
        // When we get the data clear chat_content_container
        chat_content_container.innerHTML = ''
        // if there are no messages in the chat. Retrun . Don't load anything
        if(messages_object.numChildren() == 0){
          return
        }

        // OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE
        // SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!

        // convert the message object values to an array.
        var messages = Object.values(messages_object.val());
        var msgnumber = 0
        for (let i = 0; i < messages.length; i++){
          if (messages[i]['index'] > largestIndex){
            largestIndex = messages[i]['index']
            msgnumber = i
          }

        }
        if (largestIndex > absoluteLargestIndex){
            absoluteLargestIndex = largestIndex
            if (messages[msgnumber]['name'] != parent.get_name()){
              if (document.hidden){
                if (notifyAllowed){
                  var notification = new Notification("Educational Workshop", {
                    body: "There is a new message!",
                    icon: 'images/book.png'
                  });
                }
              }
            }
        }

        if (document.hidden){
          db.ref(`/status/usernames/${userId}`).update({
            onPage: 'false'
          })
        } else {
          db.ref(`/status/usernames/${userId}`).update({
            onPage: 'true'
          })
        }

        var guide = [] // this will be our guide to organizing the messages
        var unordered = [] // unordered messages
        var ordered = [] // we're going to order these messages

        for (var i, i = 0; i < messages.length; i++) {
          // The guide is simply an array from 0 to the messages.length
          guide.push(i+1)
          // unordered is the [message, index_of_the_message]
          unordered.push([messages[i], messages[i].index]);
        }

        // Now this is straight up from stack overflow 🤣
        // Sort the unordered messages by the guide
        guide.forEach(function(key) {
          var found = false
          unordered = unordered.filter(function(item) {
            if(!found && item[1] == key) {
              // Now push the ordered messages to ordered array
              ordered.push(item[0])
              found = true
              return false
            }else{
              return true
            }
          })
        })

        // Now we're done. Simply display the ordered messages
        ordered.forEach(function(data) {
          var name = data.name
          var message = data.message
          var time = data.time

          var message_container = document.createElement('div')
          message_container.setAttribute('class', 'message_container')

          var message_inner_container = document.createElement('div')
          message_inner_container.setAttribute('class', 'message_inner_container')

          var message_user_container = document.createElement('div')
          message_user_container.setAttribute('class', 'message_user_container')

          var message_user = document.createElement('p')
          message_user.setAttribute('class', 'message_user')
          message_user.textContent = `${name}`

          var message_time_container = document.createElement('div')
          message_time_container.setAttribute('class', 'message_time_container')

          var message_time = document.createElement('p')
          message_time.setAttribute('class', 'message_time')
          message_time.textContent = `${time}`

          var message_content_container = document.createElement('div')
          message_content_container.setAttribute('class', 'message_content_container')

          var message_content = document.createElement('p')
          message_content.setAttribute('class', 'message_content')
          message_content.textContent = `${message}`

          message_user_container.append(message_user)
          message_content_container.append(message_content)
          message_time_container.append(message_time)
          message_inner_container.append(message_user_container, message_time_container, message_content_container)
          message_container.append(message_inner_container)

          chat_content_container.append(message_container)
        });
        // Go to the recent message at the bottom of the container
        chat_content_container.scrollTop = chat_content_container.scrollHeight;
      })

      var user_container = document.getElementById('user_container')

      db.ref('status/usernames').on('value', function(messages_object) {
        // When we get the data clear chat_content_container
        user_container.innerHTML = ''
        // if there are no messages in the chat. Retrun . Don't load anything
        if(messages_object.numChildren() == 0){
          return
        }

        // OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE
        // SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!

        // convert the message object values to an array.
        var messages = Object.values(messages_object.val());

        var ordered = []; // we're going to order these messages

        for (var i, i = 0; i < messages.length; i++) {
          // The guide is simply an array from 0 to the messages.length
          // unordered is the [message, index_of_the_message]
          ordered.push(messages[i]);
        }

        var obj;

        // Now we're done. Simply display the ordered messages
        ordered.forEach(function(data, index) {
          if (data.status == "online"){
            var name = data.name
            var typingStatus = data.typing
            var OnPage = data.onPage

            var user_inner_container = document.createElement('div')
            user_inner_container.setAttribute('class', 'user_inner_container')

            var user_user = document.createElement('p')
            user_user.setAttribute('class', 'online_user')
            if (OnPage == 'false'){
              user_user.setAttribute('class', 'not_on_page')
            }

            if (data.typing == "true"){
              user_user.innerHTML = `${name} <i>is typing...</i>`
            } else if (data.typing == "false"){
              user_user.textContent = `${name}`
            }
            user_container.append(user_inner_container)
            user_inner_container.append(user_user)
          }
        });
        // Go to the recent message at the bottom of the container
        chat_content_container.scrollTop = chat_content_container.scrollHeight;
      })
      var userId = parent.get_name()
      db.ref(`/status/usernames/${userId}`).update({status: "online"})
    }

    user_connection(){
      var parent = this;
      var userId = parent.get_name();

      onlineRef.on('value', snapshot => {
  
        db
          .ref(`/status/usernames/${userId}`)
          .onDisconnect() // Set up the disconnect hook
          .update({status: 'offline', name: userId, typing: 'false', onPage: 'true'}) // The value to be set for this key when the client disconnects
          .then(() => {
        // Set the Firestore User's online status to true
              usersRef
                .doc(userId)
                .set({
                  online: true,
                }, { merge: true});  

        // Let's also create a key in our real-time database
        // The value is set to 'online'
              db.ref(`/status/usernames/${userId}`).update({status: 'online', name: userId});
          });
  
      });
    }

  }

  const channel = new BroadcastChannel('tab');

  channel.postMessage('another-tab');
      // note that listener is added after posting the message

  channel.addEventListener('message', (msg) => {
    if (msg.data === 'another-tab') {
          // message received from 2nd tab
      document.location.replace('https://www.google.com')
      channel.postMessage('reload-tab');
    } else if (msg.data === 'reload-tab') {
      document.location.reload(true)
    }
  });


  var largestIndex = 0
  var absoluteLargestIndex = 0
  var notifyAllowed = false
  if (localStorage.getItem('first-time') == null){
    localStorage.setItem('first-time', 'true')
  }
  // We enclose this in window.onload.
  // So we don't have ridiculous errors.


  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notifications.");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    notifyAllowed = true
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        notifyAllowed = true
      }
    });
  }
    // So we've "built" our app. Let's make it work!!
  var app = new MEME_CHAT()
    // If we have a name stored in localStorage.
    // Then use that name. Otherwise , if not.
    // Go to home.

  app.chat()

}
