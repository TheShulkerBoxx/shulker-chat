# Shulker Chat

A chatting application run using Google Firebase Storage and Google Firestone Database/Authentication.

When you first log in, you will be required to sign up (or sign in if you already have an account).
The login information is stores on Google's Firebase Authentication (so no one can see the password).

The chat messages are stored using Google's Firebase Storage and Firestone Database.
The database collects the name of the user sendine each message, the time it was sent at, the index of the message relative to others, and the message content.

When the user logs in, their name, if they are online, and if they are typing are also stored on the database.

[![Netlify Status](https://api.netlify.com/api/v1/badges/aa11da4d-d428-4f1e-b033-a4aec5ed5785/deploy-status)](https://app.netlify.com/sites/eduworkshop/deploys)