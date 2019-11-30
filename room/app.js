const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    res.end('Hey!');
});

server.listen(3000);

const io = socketio.listen(server);


io.on('connection', (socket) => {

    socket.on('joinRoom', (data) => {
        socket.join(data.name, () => {
            console.log('Birisi odaya girdi');
            //socket.to(data.name).emit('new'); //Ben haric bu odadaki herkese yollar herkese yollar
            io.to(data.name).emit('new', {count: getOnlineCount(io, data)}); //Benimle beraber bu odadaki herkese yollar.
            socket.emit('joinLog', {message: 'Odaya girdiniz'});
        });
    });


    socket.on('leaveRoom', (data) => {
        socket.leave(data.name, () => {
            console.log('Birisi odadan çıkış yaptı.')
            io.to(data.name).emit('old', {count: getOnlineCount(io, data)});
            socket.emit('exitLog', {message: 'Odadan ayrıldınız.'});
        });
    });


});


const getOnlineCount = (io, data) => {
    const room = io.sockets.adapter.rooms[data.name];
    return room ? room.length : 0;
};

