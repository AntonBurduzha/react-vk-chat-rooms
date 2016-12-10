const app = require('../app');
const debug = require('debug')('app:server');
const http = require('http').Server(app);
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
http.listen(port);

let io = require('socket.io')(http);

io.on('connection', socket =>{
  socket.on('room', (chatName, userId) => {
    console.log(userId + ' joined to ' + chatName);
    socket.join(chatName);
  });

  socket.on('joined.members', (chatName, chatMembers) => {
    setTimeout(() => {
      io.sockets.in(chatName).emit('joined.members', chatMembers)
    }, 250);
  });

  socket.on('send.message', msgData => {
    setTimeout(() => {
      io.sockets.in(msgData.chatName).emit('send.message', msgData)
    }, 250);
  });

  socket.on('leave.room', (chatName, userId) =>{
    console.log(userId + ' leave ' + chatName);
    socket.leave(chatName);
  });

  socket.on('disconnect', () =>{
    console.log('user disconnected');
  });
});

http.on('error', onError);
http.on('listening', onListening);

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = http.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
