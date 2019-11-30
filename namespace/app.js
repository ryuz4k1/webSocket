const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    res.end('Hey!');
});

server.listen(3000);

const io = socketio.listen(server);
const nps = io.of('/myNameSpace');

nps.on('connection', (socket) => {
    console.log('Kullanıcı Bağlandı');

    socket.on('isim', () => {
        nps.emit('gönder', {name: 'Murat Özer'});
    });



    socket.on('disconnect', () => {
        console.log('Kullanıcı Ayrıldı.');
    });

});
