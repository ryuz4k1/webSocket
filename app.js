const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req, res) => {
    return res.end('Hey!');
});

server.listen(3000);


const io = socketio.listen(server); //Socket io tarafından serveri 3000 portundan dinlemek için bunu yapiyoruz.

//Aktif tcp bağlantısını socket değişkeninde tutuyorum.
io.sockets.on('connection', (socket) => {
    console.log('Kullanıcı Bağlandı.');

    setTimeout(() => {
        socket.emit('Merhaba ', {country: 'Türkiye'});
    }, 1000);

    socket.on('Selam', (data) => {
        console.log('Selam' + ' ' + data.name + ' ' + data.surname);
    });

    socket.on('disconnect', () => {
        console.log('Kullanıcı Ayrıldı.');
    });


});




