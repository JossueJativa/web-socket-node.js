// ref HTML: public/escritorio.html
const lblEscritorio = document.querySelector('h1');
const btnCrear = document.querySelector('button');
const lblNuevoTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParam = new URLSearchParams( window.location.search );

if( !searchParam.has('escritorio') ){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

const escritorio = searchParam.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true;
});

socket.on('last-ticket', ( last ) => {
    // lblNuevoTicket.innerText = `Ticket ${ last }`;
});

socket.on('follow-ticket', ( { number } ) => {
    console.log( number );
    lblPendientes.innerText = `Ticket ${ number }`;
});


btnCrear.addEventListener( 'click', () => {
    socket.emit( 'attend-ticket', { escritorio }, ( { ok, ticket, msg } ) => {
        if( !ok ){
            lblNuevoTicket.innerText = 'Nadie';
            return divAlerta.style.display = '';
        }
        lblNuevoTicket.innerText = `Ticket ${ ticket.number }`;
    });
});

console.log('Nuevo Ticket HTML');