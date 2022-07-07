# Shulker Chat

A chatting application run using Google Firebase Storage and Google Firestone Database/Authentication.

When you first log in, you will be required to sign up (or sign in if you already have an account).
The login information is stores on Google's Firebase Authentication (so no one can see the password).

## Database

The chat messages are stored using Google's Firebase Storage and Firestone Database.
The database collects the name of the user sendine each message, the time it was sent at, the index of the message relative to others, and the message content.

When the user logs in, their name, if they are online, and if they are typing are also stored on the database.
The channel they are currently viewing and if they are on the page or not are also stored.

## Specifics

A few different chat rooms (channels) are on the website. They can be changed by the server owner.

A list of online users is on the right side, while the chats are on the left.

If a user is not in the same channel as another user, their username will appear greyed out.

## Credits

SweetAlerts for the alerts

Google Firebase for Authentication and Storage

[![Netlify Status](https://api.netlify.com/api/v1/badges/aa11da4d-d428-4f1e-b033-a4aec5ed5785/deploy-status)](https://app.netlify.com/sites/eduworkshop/deploys)