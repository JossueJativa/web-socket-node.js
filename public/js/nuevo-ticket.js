const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

// socket
const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled = false;
});

socket.on('last-ticket', ( last ) => {
    lblNuevoTicket.innerText = `Ticket ${ last }`;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true;
});


btnCrear.addEventListener( 'click', () => {
    socket.emit( 'send-message', null, ( ticket ) => {
        lblNuevoTicket.innerText = `${ ticket }`;
    });
});

console.log('Nuevo Ticket HTML');