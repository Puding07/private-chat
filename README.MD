# Private Chat

## **[Live test](https://chat.artonwork.com)**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![MUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white) ![SocketIO](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white) ![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white) ![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)

## Features

- **SHA256 Encryption Asynchronously**
- **HMAC-SHA1 Integrity Check**
- **Fast connection**
- **Automatically deletes messages after all clients disconnected**
- **Containerized with Docker**

# Incapabilities

- Not Copying to clipboard automatically on: Mobile browsers, Opera Mini
- 1 Chat room is available at a time
- Only 2 participants
- I use nginx to redirect every HTTP requests to TLS so the **socket.io URL needs to be changed in production**

# Dependencies used

- Socket.io - Establishes Live connection
- CryptoJS - Provides Hash functions
- React - State management library
- React-Router-Dom - Used to create SPA
- Material UI - Prepared Components to speed up development
- Emotion - Writing css styles with JavaScript

# Development Dependencies

- babel - Browser support
- webpack - Compiler minifies and compresses code
- webpack dev server - Hot loader when developing
- zlib - Compression plugin outputs gzip and brotli to speed up loading production files for end users
- clean - Clears dist directory before bundling project again
- copy - Copies static files to dist folder
- sass - Core dependency to load and bundle sass
- sass-,css-,style-, loader - Loads different styles for webpack
- cypress - E2E testing
