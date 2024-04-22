const socketCont = (socket) => {
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    socket.on('send-message', (payload, callback) => {
        const _id = '123456';
        callback( _id );
        socket.broadcast.emit('send-message', payload);
    });
}

module.exports = {
    socketCont
}