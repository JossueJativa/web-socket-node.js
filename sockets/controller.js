const TicketControl = require('../models/ticket.control');

const ticketControl = new TicketControl();

const socketCont = (socket) => {
    socket.emit('last-ticket', ticketControl.last);
    socket.emit('status-now', ticketControl.lastFour);

    socket.emit('follow-ticket', ticketControl.followTicket());

    socket.on('disconnect', () => {});

    socket.on('send-message', (payload, callback) => {
        const follow = ticketControl.followTicket();
        callback(follow);
    });

    socket.on('attend-ticket', ({ escritorio }, callback)=> {
        
        if(!escritorio){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.attendTicket(escritorio);
        socket.broadcast.emit('status-now', ticketControl.lastFour);
        socket.breadcast.emit('follow-ticket', ticketControl.followTicket.length);


        if(!ticket){
            callback({
                ok: false,
                msg: 'No hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }

        // socket.broadcast.emit('last-ticket', ticketControl.last);
    })
}

module.exports = {
    socketCont
}