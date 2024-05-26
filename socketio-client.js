// client.js

const http = require('http');
const io = require('socket.io-client');

// Replace with your Socket.IO server URL
const serverUrl = 'http://192.46.230.32:3000';

// Connect to the Socket.IO server
const socket = io(serverUrl);


// Make an HTTP GET request to the server
http.get(serverUrl, (res) => {
  let data = '';

  // A chunk of data has been received.
  res.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received.
  res.on('end', () => {
    console.log('HTTP GET Response:', data);

    
    // On connection
    socket.on('connect', () => {
      console.log('Connected to the server');

      // Send a message to the server
      socket.emit('message', 'Hello from client');

      // Listen for messages from the server
      socket.on('message', (data) => {
        console.log('Message from server:', data);
      });
    });

    // On connection error
    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    // On disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  });

}).on('error', (err) => {
  console.log('Error:', err);
});
