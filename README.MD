# Private Chat

## Features

- **SHA256 Encryption Asynchronously**
- **HMAC-SHA1 Integrity Check**
- **Fast connection**
- **Automatically deletes messages after all clients disconnected**

# Incapabilities

- Not Copying to clipboard automatically on: Mobile browsers, Opera Mini
- 1 Chat room is available at a time
- Only 2 participants

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
