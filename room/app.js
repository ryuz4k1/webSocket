const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    res.end('Hey!');
});

server.listen(3000);

const io = socketio.listen(server);


io.on('connection', (socket) => {

    //console.log(socket.id);

    socket.join("room1");
    socket.join("room2");
    socket.join("room3", () => {
        const rooms = Object.keys(socket.rooms);
        //console.log(rooms); //[ 'OExN0UI_oxI1A6kmAAAA', 'room1', 'room2', 'room3' ] Bu idnin bulunduğu odalar
    });

    socket.on('joinRoom', (data) => {
        socket.join(data.name, () => {
            console.log('Birisi odaya girdi');
            //socket.to(data.name).emit('new'); //Ben haric bu odadaki herkese yollar herkese yollar
            io.to(data.name).emit('new', {count: getOnlineCount(io, data)}); //Benimle beraber bu odadaki herkese yollar.
            socket.emit('joinLog', {message: 'Odaya girdiniz'});
            const rooms = Object.keys(socket.rooms);
            console.log(rooms);
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

