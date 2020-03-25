const net = require('net');

const port = 3330;
const server = net.createServer();

server.on('close', () => {
    console.log('Server is closed!');
});

server.on('connection', (socket) => {
  server.getConnections((error,count) => {
      console.log('Number of concurrent connections to the server : ' + count);
    });
  socket.setEncoding('utf8');
  socket.setTimeout(800000, () => {
      console.log('Socket timed out!');
  });

socket.on('data', (chunk) => {
    console.log(chunk.toString());
    if (chunk.guid && chunk.datetime) {
        socket.write(createResponse());
    }
});

  setTimeout(() => {
    let isdestroyed = socket.destroyed;
    console.log('Socket destroyed:' + isdestroyed);
    socket.destroy();
  },1200000);
});

server.maxConnections = 10;
server.listen(port);

server.on('listening',() => {
  console.log('Server is listening on ' + port);
});

server.on('error', (error) => {
  console.log('Error: ' + error);
});

setTimeout(() => {
  server.close();
  console.log('Server is closed after timeout!');
},5000000);

const createResponse = () => {
  return {
    'status': 'ok',
    'error': null
  }
};